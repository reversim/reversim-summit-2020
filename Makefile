run:
	npm install
	node dev.js

db-import:
	source .private/ENV_VARS; \
		scripts/mongo_backup.sh --import

db-backup:
	source .private/ENV_VARS; \
		scripts/mongo_backup.sh

stg-db-import:
	source .private/ENV_VARS; \
		scripts/stg_mongo_backup.sh --import
