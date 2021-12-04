#!/usr/bin/env bash


REPOSITORY=/home/ubuntu/Matching42-back
cd $REPOSITORY
cp /home/ubuntu/.env $REPOSITORY
sudo rm -rf ./node_modules
sudo npm install
sudo npm -g install forever deep-equal@1.1.1
sudo npm install -g ts-node
sudo npm install typescript -g

APP_NAME=Matching42
CURRENT_PID=$(pgrep -f $APP_NAME)

if [ -z $CURRENT_PID ]
then
  echo "> 종료할것 없음."
else
  echo "> kill -9 $CURRENT_PID"
  kill -9 $CURRENT_PID
  sleep 5
fi

echo ">Matching42 배포"
sudo forever start -v -c ts-node ./srcs/index.tsx --name Matching42