#!/bin/bash

# Exit on any error
set -e

git co master
git pull
cp -r client/build ~/tmp/rsbuild
git co gh-pages
git pull
git rm -rf *.html *.png client node_modules server session speaker static *.json *.ico *.log *.js *.svg
cp -r ~/tmp/rsbuild/* .
git add .
git push

