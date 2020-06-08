from flask import Flask
from flask_cors import CORS

import threading
from json import dumps
app = Flask(__name__)
CORS(app)

import firebase_admin
from firebase_admin import credentials
from google.cloud import firestore

cred = credentials.Certificate('./usprotest-map-f61aff22d908.json')
firebase_admin.initialize_app(cred)

db = firestore.Client()
callback_done = threading.Event()

markers = []

docs = db.collection(u'tweets').stream()
for doc in docs:
    print('got one')
    markers.append(doc.to_dict())

print(markers)

@app.route('/get/markers')
def get_markers():
    return(dumps(markers))
