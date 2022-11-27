from flask import Flask
from requests import get
from flask import request
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

#places api
@app.route('/places')
def get_places():
    data = request.args
    fetched_data = get(
        'https://api.yelp.com/v3/businesses/search', 
        params=data, 
        headers={'Authorization': f'Bearer {os.environ.get("YELP_API_KEY")}'}
        ).json()
    return fetched_data

#geocode api
@app.route('/geocode')
def geocode():
    data = dict(request.args)
    data['key'] = f'{os.environ.get("GEOCODE_API_KEY")}'
    fetched_data = get(
        'https://us1.locationiq.com/v1/search',
        params=data,  
    ).json()
    return fetched_data