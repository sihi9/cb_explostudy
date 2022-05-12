import sys,time
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from requests_html import HTMLSession
import json

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time



filename = "./scripts/data.json"

def verifyAndSelect(dataArray, url):
  index = 0
  if len(dataArray) == 0:
    print("WARNING: something not found at URL: " + url)
    return ""
  if len(dataArray) > 1: 
    print("WARNING: something ambiguous!")
    for i in range(len(dataArray)):
      print(str(i) + "..." + dataArray[i])
    print("select index of correct element: ")
    index = input()
  return dataArray[index]

def printOptions():
  print('''
  h...help
  c...crawl web page
  a...append new document ''')

def crawl():
  print("Enter URL:\n")
  url = input()
  host = urlparse(url).netloc
  host = host.split('.')[-2]
  print (host)

  session = HTMLSession()
  
  # agree to watch the site with ads
  if host == "zeit" or host == "derstandard" or host == "focus" :
    # use selenium
    # make a new Chrome-based webdriver
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    driver = webdriver.Chrome(ChromeDriverManager().install())
    # Go to home-page and click login link
    driver.get(url)
    time.sleep(2) # load iframe
    iframe=driver.find_element(By.XPATH, ("//iframe[contains(@id, 'sp_message_iframe_')]"))
    driver.switch_to.frame(iframe)
    button = driver.find_element(By.CLASS_NAME, "message-button")
    time.sleep(1)
    button.click()
    driver.switch_to.default_content
    time.sleep(2)
    responseText = driver.page_source
  
  else: 
    try:
        #use the browser to get the url. This is suspicious command that might blow up.
        response = session.get(url)                             # this might throw an exception if something goes wrong.
    
    except Exception as e:                                   # this describes what to do if an exception is thrown
        error_type, error_obj, error_info = sys.exc_info()      # get the exception information
        print ('ERROR FOR LINK:',url)                          
        print (error_type, 'Line:', error_info.tb_lineno)
        return {}

    if response.status_code != 200:
      print("Invalid response (" + response.status_code + ") from URL: " + url)
      return {}

    if "text/html" not in response.headers.get("content-type"):
      print("Response is not html. Response type: " + response.headers.get("content-type"))

    responseText = response.text
 
  soup=BeautifulSoup(responseText,'html5lib')

  if host == "orf":
    heading = soup.find_all('h1', class_="story-lead-headline")
    lead = soup.find_all('p', class_="story-lead-text")
    story = soup.find('div', class_="story-story")
    storyP = story.find_all(["p", "h2"])
    story = ""
    for element in storyP:
      story += str(element)

  elif host == "spiegel":
    for img in soup.find_all("figcaption"):
      img.decompose()
    for hidden in soup.find_all("div", {"class":"hidden"}):
      hidden.decompose()
    for talk in soup.find_all("div", {"data-component":"TalkDrawer"}):
      talk.decompose()
    heading = soup.find_all('h2')
    lead = soup.find_all("div", class_="RichText RichText--sans leading-loose lg:text-xl md:text-xl sm:text-l lg:mb-32 md:mb-32 sm:mb-24")
    storyP = soup.find_all(["p"])
    story = ""
    for element in storyP:
      story += str(element)

  elif host == "zeit":
    heading = soup.find_all("span", class_ = "article-heading__title")
    lead = soup.find_all("div", class_="summary")
    story = soup.find('div', class_="article-page")
    storyP = story.find_all("p")
    story = ""
    for element in storyP:
      story += str(element)

  elif host == "derstandard":
    for img in soup.find_all("figcaption"):
      img.decompose()
    for aside in soup.find_all("aside"):
      aside.decompose()
    for supporterdiv in soup.find_all("div", id="piano-supporter-inline-container"):
      supporterdiv.decompose()
    heading = soup.find_all('h1', class_="article-title")
    lead = soup.find_all('p', class_="article-subtitle")
    story = soup.find('div', class_="article-body")
    storyP = story.find_all(["p", "h3"])
    story = ""
    for element in storyP:
      story += str(element)
    
  elif host == "br":
    heading = soup.find_all('h1', class_="css-tksozd-styles--Title ehu6wvh0")
    lead = soup.find_all('p', class_="efblpf4 css-uf2lpb-styles--Text-styles--TeaserText-padding--verticalPaddingTopHalf e1nkajbp0")
    story = soup.find("section", id="articlebody")
    storyP = story.find_all(["p", "h2"])
    story = ""
    for element in storyP:
      story += str(element)
    
    print("WARNING: Manually remove some bottom entries")

  elif host == "swr3":
    for teasers in soup.find_all("article", class_="teaser media-article teaser-asterus"):
      teasers.decompose()
    body = soup.find("div", class_="bodytext")
    heading_element = body.find_all("h2")[0]
    heading = heading_element.get_text()
    heading_element.decompose()
    lead = ""
    storyP = body.find_all(["p", "h2"])
    story = ""
    for element in storyP:
      story += str(element)

  elif host == "focus":
    for img in soup.find_all("figcaption"):
      img.decompose()
    for aside in soup.find_all("aside"):
      aside.decompose()
    for supporterdiv in soup.find_all("div", id="piano-supporter-inline-container"):
      supporterdiv.decompose()
    heading = soup.find_all('span', class_="posMarker_he")
    lead = soup.find_all('div', class_="leadIn")
    content = soup.find("div", "articleContent")
    story = soup.find('div', class_="article-body")
    storyP = story.find_all(["p", "h3"])
    story = ""
    for element in storyP:
      story += str(element)
    

  if host != "swr3":
    heading = verifyAndSelect(heading, url).get_text()
    lead = verifyAndSelect(lead, url).get_text()

  json = {
    "source":url,
    "title":heading,
    "lead":lead,
    "story":story
  }
  return json

def addNewEntry(newEntry):
  print(newEntry["story"])
  #file = openFile()
  #allEntries = getJsonFromFile(file)
  #allEntries.append(newEntry)
  #writeToFile(file, allEntries)
  #closeFile(file)

def readEntry():
  json = {
    "title":"heading",
    "lead":"lead",
    "story":"story"
  }
  return json

def openFile():
  # Opening JSON file
  return open(filename, "r+")

def getJsonFromFile(file):
  return json.load(file)

def writeToFile(file, data):
  file.seek(0)
  file.write(json.dumps(data))
  file.truncate()

def closeFile(file):
  file.close()

def main():
  printOptions()
  while(True):
    userInput = input()
    if(userInput == "h"):
      printOptions()
    elif userInput == "c":
      newEntry = crawl()
      addNewEntry(newEntry)
      print("done adding article: " + newEntry["title"])
    elif userInput == "a":
      newEntry = readEntry()
      addNewEntry(newEntry)
    else:
      print("invalid input")
      printOptions()

if __name__ == "__main__":
  main()