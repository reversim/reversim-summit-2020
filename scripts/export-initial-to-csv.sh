#!/bin/bash

initial_uri="https://summit2018.reversim.com/api/initial"
initial_json_file="${HOME}/Downloads/initial-1.json"

if [ ! -s $initial_json_file ] ; then
  curl $initial_uri > $initial_json_file
fi

proposal_ids() {
  cat $initial_json_file | jq -r '.proposals[]._id'
}

proposal() {
  local proposal_id

  proposal_id="$1"
  cat $initial_json_file | jq ".proposals[] | select(._id == \"$proposal_id\")"
}

speaker() {
  local speaker_id

  speaker_id="$1"
  cat $initial_json_file | jq ".users[] | select(._id == \"$speaker_id\")"
}


speaker_id_by_proposal() {
  local proposal_id

  proposal_id="$1"
  speaker_id=$(proposal $pid | jq '.speaker_ids[]' -r)
  echo $speaker_id
}

main() {
  proposal_ids | while read pid ; do
    proposal=$(proposal $pid)
    speaker_id_1st=$(echo $proposal | jq '.speaker_ids[0]' -r)
    speaker_id_2nd=$(echo $proposal | jq '.speaker_ids[1]' -r)
    speaker_1st=$(speaker $speaker_id_1st)
    speaker_2nd=$(speaker $speaker_id_2nd)
    # [ ! -z "$speaker_2nd" ] && echo "found 2nd speaker"
    printf "%s\t%s\t%s\t%s\n" $pid "$(echo $speaker_1st | jq .email -r)" "$(echo $proposal | jq .title -r)" "$(echo $speaker_2nd | jq .email -r)"
    # echo $pid ' \t' $(echo $speaker_1st | jq .email) ' \t' "$(echo $proposal | jq .title)" ' \t' "$(echo $speaker_2nd | jq .email)"
  done
}

main
