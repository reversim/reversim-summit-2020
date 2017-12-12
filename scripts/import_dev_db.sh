#! /usr/local/bin/bash

for c in proposals users
do
    file="data/$c.json"
    echo "Importing $c from $file"
    mongoimport -d ReversimSummit -c $c --mode upsert --file $file
done