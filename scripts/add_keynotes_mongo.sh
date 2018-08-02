#! /bin/bash

source .private/ENV_VARS

mongoimport --jsonArray -h $MONGODB_HOST -d $MONGODB_DB -u $MONGODB_ADMIN_USER -p $MONGODB_ADMIN_PASS -c proposals --file data/keynotes.json