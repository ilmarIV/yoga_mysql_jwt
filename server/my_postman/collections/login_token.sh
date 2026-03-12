#!/bin/bash

USERNAME="adam"
PASSWORD="qwerty"

curl -s -X POST http://localhost:3020/users/login \
  -H "Content-Type: application/json" \
  -d "{\"username\":\"$USERNAME\",\"password\":\"$PASSWORD\"}" \
  | jq -r '.token' > ../token.txt

if [ -s ../token.txt ] && [ "$(cat ../token.txt)" != "null" ]; then
  echo "Login successful. Token saved to token.txt"
else
  echo "Login failed. Check credentials or controller response."
fi
