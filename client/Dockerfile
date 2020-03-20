FROM php:7.4-apache

ARG APP_ENVIRONMENT
ARG HOST_UID=1000
ARG HOST_GID=1000
ARG CONTAINER_USER=docker
ARG CONTAINER_GROUP=docker

ENV APACHE_LOG_NAME=${PROJECT_NAME}_${DEPLOY_ENVIRONMENT}
ENV APP_ENVIRONMENT=${APP_ENVIRONMENT}
ENV CONTAINER_GROUP=${CONTAINER_GROUP}
ENV CONTAINER_USER=${CONTAINER_USER}
ENV HOST_UID=${HOST_UID}
ENV HOST_GID=${HOST_UID}

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

#### add sources
# PREPERATION FOR YARN & NODEJS
RUN apt-get update && apt-get install -y \
        curl \
        gnupg2 \
        apt-transport-https

# ADD YARN sources
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

# ADD NODE sources

#RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

# install nvm
# https://github.com/creationix/nvm#install-script
ENV NODE_VERSION 12.8.0
ENV NVM_DIR /usr/local/nvm
ENV NVM_VERSION 0.34.0
RUN mkdir $NVM_DIR
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v$NVM_VERSION/install.sh | bash
# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default
# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

#################
#### apt installs
#################
RUN apt-get update && apt-get upgrade -y
RUN apt-get update && apt-get install -y \
    acl \
    git-core \
    gosu \
    netcat \
    unzip \
    yarn

## create docker user on host
RUN groupadd --gid ${HOST_GID} ${CONTAINER_GROUP} && \
    useradd --uid ${HOST_UID} --gid ${HOST_GID} -ms /bin/bash ${CONTAINER_USER}

# set correct timezone
ENV TZ=Europe/Berlin
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN a2enmod rewrite
RUN a2enmod headers
RUN a2enmod ssl

# Use this self-generated certificate only in dev, IT IS NOT SECURE!
RUN openssl genrsa -des3 -passout pass:NotSecure -out cert.pass.key 2048
RUN openssl rsa -passin pass:NotSecure -in cert.pass.key -out /etc/ssl/private/cert.key
RUN rm cert.pass.key
RUN openssl req -new -passout pass:NotSecure -key /etc/ssl/private/cert.key -out /etc/ssl/private/cert.csr \
    -subj '/C=SS/ST=SS/L=Entenhausen/O=Dockini Dev/CN=localhost'
RUN openssl x509 -req -sha256 -days 365 -in /etc/ssl/private/cert.csr -signkey /etc/ssl/private/cert.key -out /etc/ssl/private/cert.crt

# copy startscript and vhost
COPY .docker /

# USE DOCKER CACHE FOR VENDORS:
# 1st: copy composer-files & run composer install
# 2nd: copy project sources => changing of project sources does'n break cache for previous step
COPY package.json yarn.lock /var/www/html/
RUN if [ "${APP_ENVIRONMENT}" != "dev" ]; then \
        chown -R ${CONTAINER_USER}:${CONTAINER_GROUP} /var/www/html; \
        cd /var/www/html; \
        gosu ${CONTAINER_USER} yarn install; \
    fi

COPY . /var/www/html
RUN cd /var/www/html && \
    if [ "${APP_ENVIRONMENT}" != "dev" ]; then \
        bin/set_acl.sh ${CONTAINER_USER}; \
        gosu ${CONTAINER_USER} yarn build; \
    fi

#### build assets and storybook
#RUN if [ "$APP_ENVIRONMENT" != "dev" ]; then \
#        node_modules/.bin/encore production && yarn build-storybook; \
#    fi

# clear apt-cache for smaller docker images
RUN apt-get clean -y

WORKDIR /var/www/html
RUN chmod 777 /start-project.sh
ENTRYPOINT /start-project.sh
