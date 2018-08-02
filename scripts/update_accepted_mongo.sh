#! /bin/bash

source .private/ENV_VARS

mongo -u $MONGODB_ADMIN_USER -p $MONGODB_ADMIN_PASS $MONGODB_CONNECT < scripts/update_accepted.js
# mongo -u $MONGODB_READONLY_USER -p $MONGODB_READONLY_PASS $MONGODB_CONNECT