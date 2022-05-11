import meilisearch
import json

client = meilisearch.Client('http://127.0.0.1:7700')
x = client.index('movies').search('botman')
print(x)

