
for c in proposals users sponsors
do
    file="data/$c.json"
    echo "Importing $c from $file"
    mongoimport -d ReversimSummit20 -c $c --file $file --drop
done
