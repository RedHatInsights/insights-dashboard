#!/usr/bin/env bash

# Check if it is a pull request
if [ "${TRAVIS_PULL_REQUEST}" != "false" ]; then
    echo -e "Pull Request, not pushing a build"
    exit 0;
fi

# If current branch is master, push to ___
if [ "${TRAVIS_BRANCH}" = "master" ]; then
    .travis/release.sh
fi

# If current branch has stable, push to ___