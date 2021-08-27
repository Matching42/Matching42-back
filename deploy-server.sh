#!/usr/bin/env bash

REPOSITORY=/home/ubuntu/Matching42-back
cd $REPOSITORY
npm install

APP_NAME=Matching42
SERVER_PATH=/home/ubuntu/Matching42-back/srcs/index.tsx
CURRENT_PID=$(pgrep -f $APP_NAME)

if [ -z $CURRENT_PID ]
then
  echo "> 종료할것 없음."
else
  echo "> kill -15 $CURRENT_PID"
  kill -15 $CURRENT_PID
  sleep 5
fi

echo ">Matching42 배포"
forever start -v -c ts-node $SERVER_PATH --name Matching42