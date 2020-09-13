# Website for Reversim Summit 2020
https://summit2020.reversim.com/

#### Authors:

* [Lidan Hifi](https://www.linkedin.com/in/lidan)
* [Amit Zur](https://github.com/amitzur)
* [Neta Kedem](https://github.com/neta-kedem)

#### Contributors:

* [Ori Harel](https://github.com/oriharel)
* [Daniel Sternlicht](https://github.com/dsternlicht)

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

It's possible to set a custom db connection string by: `MONGODB_URI=<your_db_url> yarn start`

Intial data import:

    make initial-data-import

### Running

    make run

## Working locally

#### Restarting the server
Type `rs` in the server's terminal to restart.

## Backoffice

There's a simple UI available for managing the different entities in the system. It's available under the following route:
`/internal/backoffice/`

In order to use it locally, you should change some configuration in 2 files.

1. In `backoffice/index.html` file, change the remote url to `http://local.reversim.com:5001/internal/backoffice/config.js`.
2. In `backoffice/config.js`, change the `baseUrl` variable to `http://local.reversim.com:5001`.

The backoffice is based on an open source tool named **RESTool**. You may find more info about it in the link below:
[https://github.com/dsternlicht/RESTool](https://github.com/dsternlicht/RESTool)

# License
MIT
