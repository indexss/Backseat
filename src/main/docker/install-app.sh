#!/bin/sh
#print commands as they run
set -x
#exit if any command fails
set -e

echo "the app deployment script has started"

echo "the app deployment script is taking down the previous version of the app - if running"
docker compose -f ~/team-project/app.yml down || true

echo "the app deployment script is loading env variables"
eval $(cat ~/team-project/.env)

echo "the app deployment script is pulling the docker image"
docker login -u $CI_REGISTRY_USER -p $CI_REGISTRY_PASSWORD $CI_REGISTRY
docker pull ${CI_REGISTRY_IMAGE}:${CI_COMMIT_TAG}latest

echo "the app deployment script is configuring the development docker compose script"
sed -i "5s|teamproject|${CI_REGISTRY_IMAGE}|" ~/team-project/app.yml
sed -i "5s|latest|${CI_COMMIT_TAG}latest|" ~/team-project/app.yml

echo "the app deployment script is configuring the production docker compose script"
if [ -n "${CI_COMMIT_TAG}" ]; then
    echo "tagged/production commit"
    echo "production docker compose script setup with the current image "
    sed -i "5s|teamproject|${CI_REGISTRY_IMAGE}|" ~/team-project/prd.yml
    sed -i "5s|latest|${CI_COMMIT_TAG}latest|" ~/team-project/prd.yml
    echo "docker compose script saved with the current tagged image name"
    cp ~/team-project/prd.yml ~/prd.current.yml
fi
if [ -e "${HOME}/prd.current.yml" ]; then
    echo "untagged/dev commit and ~/prd.current.yml exists."
    echo "copying back the last tagged image docker compose script"
    cp  ~/prd.current.yml ~/team-project/prd.yml
fi

#uncmmment these lines if you will deploy to your own public VM
#echo "the app deployment script is configuring caddy (web server)"]
#sed -i "s|DOMAIN|$URL|g" ~/team-project/Caddyfile
#sed -i "s|EMAIL|$EMAIL|g" ~/team-project/Caddyfile
#sed -i "s|ACME|$ACME|g" ~/team-project/Caddyfile
#sudo mkdir -p ~/caddy/ || true
#sudo chown -R $USER:$USER ~/caddy/ || true
#cp ~/team-project/Caddyfile ~/caddy/Caddyfile

#uncmmment these lines if you will deploy to your own public VM
#echo "re-starting the caddy web server"
#docker compose -f ~/team-project/caddy.yml down
#docker compose -f ~/team-project/caddy.yml up -d

echo "the app deployment script has finished"
