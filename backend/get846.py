import requests
import firebase_admin
from firebase_admin import credentials
from google.cloud import firestore



cred = credentials.Certificate('./usprotest-map-f61aff22d908.json')
firebase_admin.initialize_app(cred)

db = firestore.Client()


twitter_objects = {}

api_data = requests.get("https://api.846policebrutality.com/api/incidents?include=evidence")
for incident in api_data.json()['data']:
    t_obj = {}
    t_obj['geo'] = "({lat},{lng})".format(lat=incident["geocoding"]["lat"],lng=incident["geocoding"]["long"])
    t_obj['links'] = incident["links"]
    t_obj["text"] = incident["title"]
    
    
    if ([t_obj for t_obj in t_obj['links'] if "twitter" in t_obj]):
        for link in t_obj["links"]:
            if "twitter.com" in link:
                t_obj["url"] = link
                s_link = link.split('/')
                t_obj["id"] = s_link[-1]
        twitter_objects[t_obj["id"]] = t_obj
        db.collection(u'tweets').document(t_obj['id']).set(t_obj)

print(twitter_objects)

