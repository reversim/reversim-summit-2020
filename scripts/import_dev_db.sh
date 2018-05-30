
for c in proposals users sponsors
do
    file="data/$c.json"
    echo "Importing $c from $file"
    mongoimport -d ReversimSummit -c $c --mode upsert --file $file
done