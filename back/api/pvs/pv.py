from flask_restful import Resource
from flask import request
from database_config.config import mydb
import functools

columns_based_on_types = {
    '1': ['id' , 'temperature_average', 'chiller', 'time_count', 'power_usage', 'time'],
    '2': ['id' , 'pressure', 'pressure_stat', 'pressure_sevr', 'time'],
    '3': ['id' , 'thermometer_1', 'thermometer_2', 'thermometer_3', 'time']
}


def get_selected_columns_based_on_type(type):
    return functools.reduce(lambda a, b: a + "," + b, columns_based_on_types[type])


def sql_query_generator(query):
    limit_query = ''
    table_type = query['table_type']
    selected_columns = get_selected_columns_based_on_type(table_type)

    if ('pageSize' in query and 'pageNumber' in query):
        limit_query = f"limit {int(query['pageNumber']) * int(query['pageSize'])} , {int(query['pageSize'])}"

    return f"select {selected_columns} from PvLogs where parametersId={query['parametersId']} {limit_query}"


def jsonify_record(record, table_type):
    columns = columns_based_on_types[table_type]
    json = {}
    for i in range(len(columns)):
        json[columns[i]] = record[i]

    return json


def jsonify_fetch_result(result, table_type):
    return list(map(lambda record: jsonify_record(record, table_type), result))


class PV(Resource):
    def get(self):

        print(f"select count(*) from PvLogs where parametersId={request.args['parametersId']}")
        mycursor = mydb.cursor()
        mycursor.execute(f"select count(*) from PvLogs where parametersId={request.args['parametersId']}")

        count = mycursor.fetchone()[0]

        mycursor.execute(sql_query_generator(request.args))
        myresult = mycursor.fetchall()
        # mycursor.close()

        return {'count': count, 'data': jsonify_fetch_result(myresult, request.args['table_type'])}
