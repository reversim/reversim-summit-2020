#! /bin/bash


d=`date +%Y-%m-%d-%H-%M-%S`

for c in proposals users sponsors
do
    file=".private/backup-$d/$c.json"
    echo "Exporting $c"
    mongoexport -h $STG_MONGODB_HOST -d $STG_MONGODB_DB -c $c -u $STG_MONGODB_READONLY_USER -p $STG_MONGODB_READONLY_PASS -o $file

    if [ "$1" = "--import" ]; then
        echo "Importing $c"
        mongoimport -d ReversimSummit19 -c $c --mode upsert --file $file
    fi
done
