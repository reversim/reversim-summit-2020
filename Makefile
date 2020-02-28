run:
	npm install
	npm run dev

clean:
	rm -rf node_modules
	rm -rf client/node_modules
	rm -rf server/node_modules

build-prod:
	npm run heroku-postbuild

initial-data-import:
	scripts/import_dev_db.sh

db-import:
	source .private/ENV_VARS; \
		scripts/mongo_backup.sh --import

db-backup:
	source .private/ENV_VARS; \
		scripts/mongo_backup.sh

stg-db-import:
	source .private/ENV_VARS; \
		scripts/stg_mongo_backup.sh --import

prepare-data-for-github:
	mv data/users.json data/_users.json
	mv data/proposals.json data/_proposals.json
	jq '.google="xxx" | .email="xxx@email.com" | .phone="xxx" | .tokens[].accessToken="xxx"' data/_users.json | less > data/users.json
	jq 'del(.attendees)|del(.notAttendees)' data/_proposals.json > data/proposals.json
