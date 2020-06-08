# from json import loads, dumps
import firebase_admin
from firebase_admin import credentials
from google.cloud import firestore
import tweepy
# # Use the application default credentials
# cred = credentials.ApplicationDefault()
# firebase_admin.initialize_app(cred, {
#   'projectId': project_id,
# })

cred = credentials.Certificate('./usprotest-map-f61aff22d908.json')
firebase_admin.initialize_app(cred)

db = firestore.Client()


access_token = "17715312-m3hIGKuzfdPIWA9efnlLaUy1t56jgRr9MwoWtEhL5"
access_token_secret = "Zr9OVfnOSyH0fXbMOaKWEdzugj1iL3eMDAp8EDxakfGu2"
consumer_key = "27EIGGvWqO1qdZ1N63OPlhMWY"
consumer_secret = "Jui8jpeLqVmGQlcRKCtpWIh2RXWLthJiiQgjM0cP5niBXCk5ue"

tweets = {}
latest_id = ""

auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)


public_tweets = api.search(
    q="#protestMap2020",
    count=100,
    result_type="recent",
    wait_on_rate_limit=True)

for tweet in public_tweets:
    # print(tweet._json)

    reply_tweet = api.statuses_lookup([tweet._json['in_reply_to_status_id_str']])

    for tw in reply_tweet:
        print(tw._json['entities']['urls'])
        try:
            db.collection(u'tweets').document(tweet._json['id_str']).set({
                "id": tweet._json['in_reply_to_status_id_str'],
                "text": tweet._json['text'],
                "geo": "(" + tweet._json['text'].split('(')[1],
                "url":  "https://twitter.com/" +
                        tw._json['user']['screen_name'] +
                        "/status/" +
                        tw._json['id_str']
                })
        except IndexError:
            db.collection(u'review').document(tweet._json['id_str']).set({
                "id": tweet._json['in_reply_to_status_id_str'],
                "text": tweet._json['text'],
                "geo": "(" + tweet._json['text'].split('(')[1]
            })
if len(public_tweets) > 0:
    latest_id = public_tweets[-1]._json['id_str']


print("Latest id: ", latest_id)
print("tweets count: ", len(tweets))
