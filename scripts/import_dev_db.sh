
for c in proposals users sponsors
do
    file="data/$c.json"
    echo "Importing $c from $file"
    mongoimport -d ReversimSummit19 -c $c --file $file
done
