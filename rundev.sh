#!/bin/bash
docker run -dp 3000:3000 \
-v "$(pwd)":/app -w /app --network climate --name humidity_server \
climate_server \
sh -c "npm run dev"