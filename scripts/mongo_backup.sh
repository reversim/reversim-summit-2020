#! /bin/bash


d=`date +%Y-%m-%d-%H-%M-%S`

for c in proposals users sponsors
do
    file=".private/backup-$d/$c.json"
    echo "Exporting $c"
    mongoexport -h $MONGODB_HOST -d $MONGODB_DB -c $c -u $MONGODB_READONLY_USER -p $MONGODB_READONLY_PASS -o $file

    if [ "$1" = "--import" ]; then
        echo "Importing $c"
        mongoimport -d ReversimSummit20 -c $c --mode upsert --file $file
    fi
done