#!/usr/bin/env bash

# ${APP_ENVIRONMENT}
# => global env-var (introduced at build time, see Dockerfile)
# => could be overridden by runtime env-var

bin/set_acl.sh ${CONTAINER_USER}

##############################################################
# wait for es services to be available
##############################################################

if [ "${APP_ENVIRONMENT}" = "dev" ]; then
    gosu ${CONTAINER_USER} yarn install --silent --non-interactive --network-timeout 1000000
fi


# add all docker networks to RemoteIPInternalProxy (needed for REMOTE_ADDR behind reverse proxy & logging)
#ip -h -o address | grep eth | awk '{ print $4 }' > /etc/apache2/conf-available/trusted-docker-proxies.conf

apache2-foreground -DFOREGROUND
