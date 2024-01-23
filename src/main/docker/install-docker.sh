#!/bin/sh
#print commands as they run
set -x
#exit if any command fails
set -e

echo "the app docker install script is starting"

echo "installing docker - if needed"
which docker || (curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh)
sudo usermod -a -G docker $USER
#sudo su -l $USER

echo "the app docker install script is ending"
