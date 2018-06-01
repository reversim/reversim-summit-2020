# Website for Reversim Summit 2018
http://summit2018.reversim.com/

#### Authors:

* [Lidan Hifi](https://www.linkedin.com/in/lidan)
* [Amit Zur](https://github.com/amitzur)

#### Contributors:

* [Ori Harel](https://github.com/oriharel)

#### Getting started

Install:
```
$ yarn
```

Start:
This will start an API server connecting to local mongo db called `ReversimSummit` and listening on `5001`, and a webpack dev server which serves the frontend at port `3000`. 
```
$ yarn start
```

Import data:

You may import data for development. There's a shell script to do that, which takes `/data/*.json` files into your local mongo setup at the `ReversimSummit` db.
```
$ ./scripts/import_dev_db.sh
```
## Working locally
#### Restarting the server
Type `rs` in the server's terminal to restart.

#### Installing mongo
Basically, follow this link: https://docs.mongodb.com/manual/installation/  
The default database name is ReversimSummit, and it's defined in https://github.com/rantav/reversim-summit-2017/blob/master/server/db/constants.js

It's possible to set a custom db connection string by: `MONGODB_URI=<your_db_url> yarn start` 


# License
MIT
