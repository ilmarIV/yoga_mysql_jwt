#!/bin/bash

TOKEN=$(< ../token.txt)

# Create article
curl -X POST http://localhost:3020/article/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "My second Article",
    "slug": "my-second-article",
    "image": "ashtanga.jpg",
    "body": "This is the content of the article",
    "author_id": 2
    }'