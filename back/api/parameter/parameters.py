from flask import request
from flask_restful import Resource

from api.parameter.set_parameters import set_parameters, get_parameters as ret_parameters
from database_config.config import mycursor, mydb


class Parameters(Resource):
    def get(self):
        return ret_parameters()

    def post(self):
        data = request.json['data']

        threshold, powerph,\
        volume, mole ,\
        time = int(data['threshold']),\
               int(data['powerph']), \
               int(data['volume']),\
               int(data['mole']) ,\
               int(data['time'])

        sql = "INSERT INTO ParametersLogs (threshold, volume" \
              " , mole , powerph , time ) VALUES " \
              "(%s, %s , %s , %s , %s)"

        val = (
        threshold, volume, mole, powerph, time )

        mycursor.execute(sql, val)
        mydb.commit()

        set_parameters(threshold, powerph, volume, mole)

        return 'set successfully'
