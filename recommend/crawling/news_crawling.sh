#!/bin/bash

echo "[$(/usr/bin/date)] : crawling start!!"

/usr/bin/python3 /home/sohee/crawling/naver_news_crawling.py
/usr/bin/python3 /home/sohee/crawling/naver_enter_news_crawling.py

echo "[$(/usr/bin/date)] : crawling done!!"
