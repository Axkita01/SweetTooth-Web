from flask import Flask
from requests import get
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/')
def get_places():
    data = request.args
    fetched_data = get(
        'https://api.yelp.com/v3/businesses/search', 
        params=data, 
        headers={'Authorization': 'Bearer ***'}
        ).json()
    print(data, 'request data')
    print(fetched_data, 'fetched data')
    return fetched_data

    