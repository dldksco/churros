#! /bin/bash

PATH=/var/jenkins/workspace/A503/recommend/crawling
DIR_PATH=~/crawling
FILE1=naver_news_crawling.py
FILE2=naver_enter_news_crawling.py
FILE3=news_crawling.sh

/usr/bin/cp ${PATH}/${FILE1} ${DIR_PATH}
/usr/bin/cp ${PATH}/${FILE2} ${DIR_PATH}
/usr/bin/cp ${PATH}/${FILE3} ${DIR_PATH}

/usr/bin/chmod 545 ${DIR_PATH}/${FILE1}
/usr/bin/chmod 545 ${DIR_PATH}/${FILE2}
/usr/bin/chmod 545 ${DIR_PATH}/${FILE3}
