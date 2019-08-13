# Website for Reversim Summit 2020
https://summit2020.reversim.com/

#### Authors:

* [Lidan Hifi](https://www.linkedin.com/in/lidan)
* [Amit Zur](https://github.com/amitzur)
* [Neta Kedem](https://github.com/neta-kedem)

#### Contributors:

* [Ori Harel](https://github.com/oriharel)

## Getting started

### Setup

#### Add to /etc/hosts

Add the following line to the file `/etc/hosts` (use sudo)
`127.0.0.1 local.reversim.com`

E.g.

    echo "127.0.0.1 local.reversim.com" | sudo tee -a /etc/hosts

#### NodeJS

Install NodeJS version `v8.11.1` or similar (various versions work)

Test installation by running:

    node -v

#### MongoDB

Basically, follow this link: https://docs.mongodb.com/manual/installation/

Then run `mongod` in a separate tab, e.g. open a new tab and type

    mongod

The default database name is `ReversimSummit20`, and it's defined in /server/db/constants.js

It's possible to set a custom db connection string by: `MONGODB_URI=<your_db_url> npm start`

Intial data import:

    make initial-data-import

### Running

    make run

## Working locally

#### Restarting the server
Type `rs` in the server's terminal to restart.

# License
MIT
