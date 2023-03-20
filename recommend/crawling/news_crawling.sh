#!/bin/bash

echo "$(/usr/bin/date "+%Y-%m-%d %H:%M:%S %a") INFO start crawling"

/usr/bin/python3 /var/jenkins/workspace/A503/recommend/crawling/naver_news_crawling.py
/usr/bin/python3 /var/jenkins/workspace/A503/recommend/crawling/naver_enter_news_crawling.py

echo "$(/usr/bin/date "+%Y-%m-%d %H:%M:%S %a") INFO finish crawling"
