#!/bin/bash
docker run -dp '5432:5432' --name humidity_db \
-e POSTGRES_PASSWORD=N@ut1lus -e POSTGRES_USER=fobos -e POSTGRES_DB=humidity \
--network climate --network-alias humidity \
postgres:11-alpine
#-v /home/fobos/db/climate:/var/lib/postgresql/data \