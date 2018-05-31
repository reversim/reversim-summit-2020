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

    proposal_title="$(echo $proposal | jq .title)"
    proposal_url="https://summit2018.reversim.com/session/${pid}"
    proposal_type=$(echo $proposal | jq '.type' -r)
    proposal_categories=$(echo $proposal | jq '.categories | join(", ")' -r)

    speaker1_id=$(echo $proposal | jq '.speaker_ids[0]' -r)
    speaker2_id=$(echo $proposal | jq '.speaker_ids[1]' -r)

    speaker1=$(speaker $speaker1_id)
    speaker2=$(speaker $speaker2_id)

    speaker1_name="$(echo $speaker1 | jq .name -r)"
    speaker2_name="$(echo $speaker2 | jq .name -r)"

    speaker1_email="$(echo $speaker1 | jq .email -r)"
    speaker2_email="$(echo $speaker2 | jq .email -r)"

    speaker1_phone="$(echo $speaker1 | jq .phone -r)"
    speaker2_phone="$(echo $speaker2 | jq .phone -r)"

    names="$speaker1_name"
    [ -n "$speaker2_name" ] && names="$names, $speaker2_name"
    email="$speaker1_email"
    [ -n "$speaker2_email" ] && email="$email, $speaker2_email"
    phone="$speaker1_phone"
    [ -n "$speaker2_phone" ] && phone="$phone, $speaker2_phone"

    speaker_video_url="$(echo $speaker1 | jq .video_url -r)"

    # [ -n "$speaker2" ] && echo "found 2 speaker"
    # printf "%s\t%s\t%s\t%s\n" $pid "$(echo $speaker1 | jq .email -r)" "$(echo $proposal | jq .title -r)" "$(echo $speaker2 | jq .email -r)"
    printf "%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n" "$pid" "$proposal_url" "$names" "$proposal_title" "$proposal_type" "$proposal_categories" "$speaker_video_url" "$email" "$phone"
    # echo $pid ' \t' $(echo $speaker1 | jq .email) ' \t' "$(echo $proposal | jq .title)" ' \t' "$(echo $speaker2 | jq .email)"
  done
}

main
