from multiprocessing import AuthenticationError
from newsapi import NewsApiClient

# Init
newsapi = NewsApiClient(api_key='f0f48048297c4c24b99ae21a32326bc3')

# /v2/top-headlines
# top_headlines = newsapi.get_top_headlines(q='bitcoin',
#                                           sources='bbc-news,the-verge',
#                                           category='business',
#                                           language='en',
#                                           country='us')

# /v2/everything
all_articles = newsapi.get_everything(q='cannabis',
                                      language='de',
                                      sort_by='relevancy',
                                      page_size=100)


for article in all_articles["articles"]:
  author = article["author"] if article["author"] else "Unkown"
  print("" + author + ": " + article["title"])
  print(article["url"])
  print("")

# /v2/top-headlines/sources
sources = newsapi.get_sources()