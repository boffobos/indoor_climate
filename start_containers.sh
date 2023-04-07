#!/bin/bash
# db params
DB_CONT_NAME=humidity_db
DB_PATH=/home/"$USER"/db/climate
DB_HOST=humidity
DB_PASSWORD=N@ut1lus
DB_USER=fobos
DB_NAME=humidity
# server params
SERV_CONT_NAME=climate_serv
NET_NAME=climate

mkdir -p $DB_PATH
docker run --rm -dp '5432:5432' --name $DB_CONT_NAME \
-e POSTGRES_PASSWORD=$DB_PASSWORD -e POSTGRES_USER=$DB_USER -e POSTGRES_DB=$DB_NAME \
--network $NET_NAME --network-alias $DB_HOST \
-v /home/"$USER"/db/climate:/var/lib/postgresql/data \
postgres:11-alpine && \
\
docker build -t "$SERV_CONT_NAME" . && \
docker run -dp '3000:3000' --name "${SERV_CONT_NAME}_container" --network "$NET_NAME" "$SERV_CONT_NAME"