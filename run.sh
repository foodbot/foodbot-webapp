#!/bin/bash
npm install
bower install
gulp build

export GOOGLEAPIKEY='@@@@@@@@@'
export MONGOURL='mongodb://@@@@@@@@:27017/@@@@@@@'
export PORT=8000
nodemon server.js
