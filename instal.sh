#!/usr/bin/env bash
echo "Open backend and install dependencies!" &&

cd ./backend &&

npm install &&

echo "Open frontend and install dependencies!" &&

cd ../frontend &&

npm install &&

echo "Install packages successfully!"