from flask import Flask
from requests import get
from flask import request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/places')
def get_places():
    data = request.args
    fetched_data = get(
        'https://api.yelp.com/v3/businesses/search', 
        params=data, 
        headers={'Authorization': 'Bearer ***'}
        ).json()
    return fetched_data

@app.route('/geocode')
def geocode():
    data = dict(request.args)
    data['key'] = '***'
    fetched_data = get(
        'https://us1.locationiq.com/v1/search',
        params=data,  
    ).json()
    return fetched_data