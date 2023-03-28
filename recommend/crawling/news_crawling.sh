#!/bin/bash

echo "$(/usr/bin/date "+%Y-%m-%d %H:%M:%S %a") INFO start crawling"

#/usr/bin/python3 /home/sohee/crawling/naver_news_crawling.py
#/usr/bin/python3 /home/sohee/crawling/naver_enter_news_crawling.py
/usr/bin/python3 /home/sohee/crawling/start_all_crawling.py

echo "$(/usr/bin/date "+%Y-%m-%d %H:%M:%S %a") INFO finish crawling"
