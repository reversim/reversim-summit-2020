run:
	npm install
	node dev.js

db-import:
	scripts/mongo_backup.sh --import

db-backup:
	scripts/mongo_backup.sh
