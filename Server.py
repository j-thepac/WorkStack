from flask import Flask,request,json
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
import json
import logging 
logging.basicConfig(level=logging.INFO )

app=Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"]="sqlite:///workdescdb.sqlite3"
api=Api(app)
db= SQLAlchemy(app)


class WorkDB(db.Model):
    sl=db.Column(db.Integer,primary_key=True)
    desc=db.Column(db.String(1000))

class WorkStack(Resource):
    def post(self):
        lastKey=len(WorkDB.query.all())
        logging.info(f"{request.json}")
        w:WorkDB=WorkDB(sl=lastKey,desc=request.json["desc"])
        db.session.add(w)
        db.session.commit()
        return {"dataAdded":f"{request.json['desc']}" , "status":"Success"}

    def get(self):
        data= [work.desc for work in WorkDB.query.all()]
        logging.info(f"{data}")
        jData=json.dumps({"dataAdded":data , "status":"Success"})
        return jData

api.add_resource(WorkStack,"/")
if(__name__=="__main__"):
    app.app_context().push()
    db.create_all()
    app.run(host="0.0.0.0",port="4321")