#!/bin/bash
DT=`date +'%y.%m.%d-%H:%M:%S'`
for c in proposals sessions users
do
    echo "Exporting $c"; mongoexport -h=ds137441.mlab.com --port=37441 -u readonly -p Reversim4good -d=heroku_1ggtf7zq --collection=$c -o=backup-$DT/$c.json
done

for c in proposals sessions users
do
	echo "Cleaning $c"; mongo ReversimSummit --eval "db.$c.remove({})"
	echo "Importing $c"; mongoimport -c $c -d ReversimSummit --mode upsert --file backup-$DT/$c.json
done

mongo ReversimSummit < csv_aggregate.js
mongoexport -d=ReversimSummit --collection=proposal_results --type=csv --fields=email | sort | uniq | ag @
