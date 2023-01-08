from dotenv import load_dotenv
import os
load_dotenv()

from flask import Flask, render_template, request, jsonify
app = Flask(__name__)

from pymongo import MongoClient
client = MongoClient(os.getenv('DB_LINK'))
db = client.dbsparta


@app.route('/')
def home():
    return render_template('index.html')

@app.route("/homework", methods=["POST"])
def homework_post():
    params = request.get_json()
    name_receive = params['name_give']
    comment_receive = params['comment_give']
    date_receive = params['date_give']
    # name_receive = request.form['name_give']
    # comment_receive = request.form['comment_give']
    # date_receive = request.form['date_give']

    doc = {
        'name': name_receive,
        'comment': comment_receive,
        'date': date_receive
    }
    db.fans.insert_one(doc)
    return jsonify({'msg':'응원완료!'})

@app.route("/homework", methods=["GET"])
def homework_get():
    fan_list = list(db.fans.find({}, {'_id': False}))
    return jsonify({'fans': fan_list})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)