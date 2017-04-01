# node-pairpicker

Pairpicker is an Angular (beta unfortunately) and nodejs application that uses CouchDB as a database.

## [CouchDB](http://couchdb.apache.org/)

You will need a CouchDB database. Once created, add db/teams.json as a normal document and db/views.json as a Design document.

:w

## config.js

In order to run the site locally, you will need to set the database name in the config.js
``` 
config.dbname = 'dev_data';
```

Make sure you have all the needed dependencies by running ``` npm install ```.

You can then run ``` slack_token=test npm start ``` to start TS compiling and nodemon watching.


---

Is this better @steveshogren?