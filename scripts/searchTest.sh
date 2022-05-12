curl \
  -X POST 'http://127.0.0.1:7700/indexes/cb_articles/search' \
  -H 'Authorization: Bearer 1234' \
  -H 'Content-Type: application/json' \
  --data-binary '{ "q": "a" }'