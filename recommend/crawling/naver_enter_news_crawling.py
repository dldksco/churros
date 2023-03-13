import os
import requests
from dotenv import load_dotenv
from bs4 import BeautifulSoup
from pymongo import MongoClient
from pymongo.errors import BulkWriteError
import datetime

load_dotenv()

# mongoDB 설정
mongo_host = os.environ.get('MongoHost')
mongo_port = int(os.environ.get('MongoPort'))
mongo_client = MongoClient(host=mongo_host, port=mongo_port)

db = mongo_client['newsdb']
collection = db['newsCol']
index_collection = db['indexCounter']
# collections = (db['politics'], db['social'], db['economy'], db['culture'], db['science'])

# https://entertain.naver.com/now?sid=221
topics = {
    '연예가화제' : '221',
    '방송/TV' : '224',
    '드라마' : '225',
    '뮤직' : '7a5',
    '해외연예' : '309'
}

def getRequestResponse(url):
    header = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'}
    r = requests.get(url, headers=header)

    if (r == None):
        return None
    else:
        return r

def getNaverNewsList(sid1):
    base = "https://entertain.naver.com/now"
    parameters = "?sid=%s" % (sid1)
    url = base + parameters

    return getRequestResponse(url)

def getDetailData(url, lasttitle, lastdate):
    response = getRequestResponse(url)
    bs = BeautifulSoup(response.text, "lxml")

    title = bs.select_one('.end_tit').text.strip()
    pd = bs.select_one(".article_info > .author").text.split(' ')
    publish_date = datetime.datetime.strptime(pd[0].replace('기사입력', '') + pd[2], '%Y.%m.%d.%H:%M')
    if(pd[1] == '오후'):
        publish_date += datetime.timedelta(hours=12)

    full_text = bs.select_one("#articeBody").text.strip()
    img_src = ''

    # datetime.datetime.strptime(publish_date, '%Y-%m-%d %H:%M:%S')

    if publish_date == lastdate and title == lasttitle:
        return title, publish_date, full_text, img_src, True

    try:
        img_src = bs.select_one("#img1")['src']
    except:
        # print("이미지가 존재하지 않는 기사 : ", url)
        pass

    return title, publish_date, full_text, img_src, False

def getPostData(response, json_result, cat1, cat2, cnt, lasttitle, lastdate):
    bs = BeautifulSoup(response.text, "lxml")
    flag = False

    for news in bs.select_one('#newsWrp > ul').select('li'):
        try:
            description = news.select_one('.tit_area').select_one('.summary').text.strip()
            press = news.select_one('.tit_area').select_one('.press').text.split('\t')[0].strip()
            link = 'https://entertain.naver.com/' + news.select_one('.tit_area').select_one('a')['href']

            title, publish_date, full_text, img_src, is_duplicate = getDetailData(link, lasttitle, lastdate)

            if is_duplicate:
                flag = True
                break

            json_result.append({'_idx': 0, 'cat1': cat1, 'cat2': cat2, 'title': title, 'description': description,
                                'press': press, 'link': link, 'publish_date': publish_date, 'full_text': full_text,
                                'img_src': img_src})
        except Exception as e:
            print("크롤링 중 예외 발생 : ", e)

    json_result.reverse()
    for result in json_result:
        cnt += 1
        result['_idx'] = cnt

    return cnt

def crawlingGeneralNews(lastidx):
    for topic in topics.keys():
        print(f"[{topic}] : 크롤링 시작...")
        sid1 = topics[topic]

        json_result = []
        response = getNaverNewsList(sid1)

        if not response:
            continue

        lasttitle = ''
        lastdate = ''
        lastindex = index_collection.find_one({"cat1": "연예", "cat2": topic})
        topic_last_data = []

        if lastindex:
            topic_last_data = list(collection.find({"_idx": lastindex['counter']}))
        else:
            topic_last_data = list(collection.find({"cat1": "연예", "cat2": topic}).sort("_idx", -1))

        if topic_last_data:
            lasttitle = topic_last_data[0]['title']
            lastdate = topic_last_data[0]['publish_date']

        newidx = getPostData(response, json_result, '연예', topic, lastidx, lasttitle, lastdate)

        # print(f"[{topic} - {detail}] : {newidx-lastidx}개 크롤링 완료...")
        lastidx = newidx

        # with open('naver_enter_news.json', 'w', encoding='utf8') as outfile:
        #     jsonFile = json.dumps(json_result, indent=4, sort_keys=True, ensure_ascii=False)
        #
        #     outfile.write(jsonFile)

        if json_result:
            try:
                index_collection.insert_one({"cat1": "연예", "cat2": topic, "counter": lastidx})
                result = collection.insert_many(json_result)
                result.inserted_ids
            except BulkWriteError as bwe:
                print(bwe.details)
    return lastidx

def main():
    lastidx = collection.estimated_document_count()

    try:
        crawlingGeneralNews(lastidx)
    except Exception as e:
            print("크롤링 중 예외 발생 : ", e)

if __name__ == '__main__':
    main()
