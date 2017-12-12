#! /usr/local/bin/bash

mongo ReversimSummit < ./scripts/images.js | tail -n +5 > .private/images.json
