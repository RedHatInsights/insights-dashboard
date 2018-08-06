#!/usr/bin/env bash

MESSAGE=$(git log --format=%B -n 1 $TRAVIS_COMMIT)
git clone ${REPO}
cd ${REPO_DIR}
git checkout stable
rm -rf dist
cp ../dist .
git config --global user.name $COMMIT_AUTHOR_USERNAME
git config --global user.email $COMMIT_AUTHOR_EMAIL
git add .
git commit -m 'Build Stable by Travis'
git push --force --set-upstream travis-build stable:stable
