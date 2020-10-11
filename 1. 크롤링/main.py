from selenium import webdriver
import requests
import time
from bs4 import BeautifulSoup
import pandas as pd
# pandas 패키지는 데이터 분석에서 수학의 정석 같은 패키지입니다.
# pandas 사용법은 구글링하시면서 학습 꼭 필요한 부분입니다.

# driver 제공 메서드
# find_element_by_name: name 속성의 값으로 검색
# find_element_by_tag: 태그명 기준 검색
# find_element_by_xpath: 태그 경로명 및 조건으로 검색
# find_element_by_class_name: class 속성의 값으로 검색
# find_element_by_id: id 속성의 값으로 검색


driver = webdriver.Chrome(
    "C:/Users/COM/Downloads/chromedriver_win32/chromedriver.exe")
driver.get('https://kr.hotels.com/')
elem = driver.find_element_by_name("q-destination")
elem.send_keys("제주도")
elem.submit()
time.sleep(8)

# 무한스크롤
SCROLL_PAUSE_TIME = 5

last_height = driver.execute_script("return document.body.scrollHeight")

for k in range(5):  # 여기 숫자 5가 5번 스크롤하는건데 더 많이 할 수 있으면 더 높은 숫자 써주세요
    driver.execute_script(
        "window.scrollTo(0, document.body.scrollHeight-500);")

    time.sleep(SCROLL_PAUSE_TIME)
    driver.execute_script(
        "window.scrollTo(0, document.body.scrollHeight-1000);")
    time.sleep(SCROLL_PAUSE_TIME)

    new_height = driver.execute_script("return document.body.scrollHeight")

    if(new_height == last_height):
        break
    last_height = new_height


# 호텔리뷰 가져오기
hotel_review = driver.find_elements_by_xpath(
    '//*[@id="listings"]/ol/li/article/section/div/div/div/a')

href_elem_list = []
result = []

for i in hotel_review:
    href_elem = i.get_attribute('href')
    href_elem_list.append(href_elem)

for href in href_elem_list:
    driver.get(href)
    try:
        hotel_name = driver.find_element_by_id('widget-overlay-title-1').text
    except:
        hotel_name = "NaN"

    review_cards_container = driver.find_element_by_class_name(
        'brand-reviews-listing')
    review_cards = review_cards_container.find_elements_by_class_name(
        'review-card')
    for j in review_cards:
        try:
            review_rating = j.find_element_by_class_name('rating-score').text
        except:
            review_rating = "NaN"
        print(review_rating)
        try:
            review_detail = j.find_element_by_tag_name('blockquote').text
        except:
            review_detail = "NaN"
        print(review_detail)

        result.append([hotel_name, review_rating, review_detail])

# csv 저장
data = pd.DataFrame(result)
data.columns = ["호텔이름", "평점", "후기"]

data.to_csv('제주도크롤링결과.csv', encoding='utf-8-sig')
