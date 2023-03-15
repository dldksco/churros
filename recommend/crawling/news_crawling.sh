#!/bin/bash

echo "[$(/usr/bin/date)] : crawling start!!"

sudo /usr/bin/python3 /home/ubuntu/docker_mongo/naver_news_crawling.py
sudo /usr/bin/python3 /home/ubuntu/docker_mongo/naver_enter_news_crawling.py

echo "[$(/usr/bin/date)] : crawling done!!"
