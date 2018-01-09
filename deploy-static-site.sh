#!/bin/bash

# Exit on any error
set -e

git co master
git pull
cp -r client/build ~/tmp/rsbuild
git co gh-pages
git pull
git rm -rf *.html *.png  session speaker static *.json *.ico *.js *.svg
cp -r ~/tmp/rsbuild/* .
rm -rf ~/tmp/rsbuild
git add .
git ci -am "deploy"
git push

