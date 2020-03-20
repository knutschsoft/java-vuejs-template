#!/usr/bin/env bash

CONTAINER_USER=$1
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ "$#" -eq 1 ]; then
    setfacl -R -m u:www-data:rwx -m u:${CONTAINER_USER}:rwx -m m:rwx  ${DIR}/../public/build
    setfacl -dR -m u:www-data:rwx -m u:${CONTAINER_USER}:rwx -m m:rwx  ${DIR}/../public/build
else
    setfacl -R -m u:www-data:rwx -m m:rwx ${DIR}/../public/build
    setfacl -dR -m u:www-data:rwx -m m:rwx ${DIR}/../public/build
fi
