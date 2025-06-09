from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

@app.route('/api/products')
def get_products():
    with open('/app/products.json', 'r') as f:
        data = json.load(f)
    return jsonify(data['products'])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000) 