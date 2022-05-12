curl \
  -X POST 'http://127.0.0.1:7700/indexes/cb_articles/documents' \
  -H 'Content-Type: application/json' \
  --data-binary @data.json