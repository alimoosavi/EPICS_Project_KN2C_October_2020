from flask import request
from flask_restful import Resource
from database_config.config import mycursor,mydb

def jonify_parameters_logs(logs):
    jsonify_logs = []
    for log in logs:
        jsonify_logs.append({
            'id': log[0],
            'threshold': log[1],
            'volume': log[2],
            'mole': log[3],
            'powerph': log[4],
            'time': log[5],
        })
    return jsonify_logs

class LogParameters(Resource):
    def get(self):
        mycursor.execute("select * from ParametersLogs;")
        parametersLogs = mycursor.fetchall()
        return jonify_parameters_logs(parametersLogs)
