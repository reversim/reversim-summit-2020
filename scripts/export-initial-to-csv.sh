#!/bin/bash

initial_uri="https://summit2018.reversim.com/api/initial"
initial_json_file="$1"

if [ -z "$initial_json_file" ] ; then
  echo "usage: export-initial-to-csv <initial.json file>"
  echo "Grab the most up to date initial file from https://summit2018.reversim.com/api/initial while logged in."
  exit 1
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
  printf "#%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n" "proposal_id" "proposal_url" "num_speakers" "speaker_names" "proposal_title" "proposal_type" "proposal_categories" "proposal_tags" "speaker1_video_url" "speaker_emails" "speaker_phones" "speaker_urls"
  proposal_ids | while read pid ; do
    proposal=$(proposal $pid)

    proposal_title="$(echo $proposal | jq .title)"
    proposal_url="https://summit2018.reversim.com/session/${pid}"
    proposal_type=$(echo $proposal | jq '.type' -r)
    proposal_categories=$(echo $proposal | jq '.categories | join(", ")' -r)
    proposal_tags=$(echo $proposal | jq '.tags | join(", ")' -r)

    speaker1_id=$(echo $proposal | jq '.speaker_ids[0]' -r)
    speaker2_id=$(echo $proposal | jq '.speaker_ids[1]' -r)
    [ "$speaker2_id" == "null" ] && speaker2_id=""

    num_speakers=$(echo $proposal | jq '.speaker_ids | length' -r)

    speaker1=$(speaker $speaker1_id)
    speaker2=$(speaker $speaker2_id)

    speaker1_name="$(echo $speaker1 | jq .name -r)"
    speaker2_name="$(echo $speaker2 | jq .name -r)"

    speaker1_email="$(echo $speaker1 | jq .email -r)"
    speaker2_email="$(echo $speaker2 | jq .email -r)"

    speaker1_phone="$(echo $speaker1 | jq .phone -r)"
    speaker2_phone="$(echo $speaker2 | jq .phone -r)"

    speaker1_url="https://summit2018.reversim.com/speaker/${speaker1_id}"
    speaker2_url="https://summit2018.reversim.com/speaker/${speaker2_id}"

    speaker_names="$speaker1_name"
    [ -n "$speaker2_id" ] && speaker_names="$speaker_names, $speaker2_name"
    speaker_emails="$speaker1_email"
    [ -n "$speaker2_id" ] && speaker_emails="$speaker_emails, $speaker2_email"
    speaker_phones="$speaker1_phone"
    [ -n "$speaker2_id" ] && speaker_phones="$speaker_phones, $speaker2_phone"
    speaker_urls="$speaker1_url"
    [ -n "$speaker2_id" ] && speaker_urls="$speaker_urls, $speaker2_url"

    speaker1_video_url="$(echo $speaker1 | jq .video_url -r)"

    printf "%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\t%s\n" "$pid" "$proposal_url" "$num_speakers" "$speaker_names" "$proposal_title" "$proposal_type" "$proposal_categories" "$proposal_tags" "$speaker1_video_url" "$speaker_emails" "$speaker_phones" "$speaker_urls"
  done
}

main
