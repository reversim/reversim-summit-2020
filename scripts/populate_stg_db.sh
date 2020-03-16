#! /bin/bash

d=`date +%Y-%m-%d-%H-%M-%S`

for c in proposals users sponsors
do
    file=".private/backup-$d/$c.json"
    echo "Exporting $c"
    mongoexport -h $MONGODB_HOST -d $MONGODB_DB -c $c -u $MONGODB_READONLY_USER -p $MONGODB_READONLY_PASS -o $file

    echo "Importing $c"
    mongoimport -h $STG_MONGODB_HOST -d $STG_MONGODB_DB -c $c -u $STG_MONGODB_USER -p $STG_MONGODB_PASS -c $c --file $file --drop
done
