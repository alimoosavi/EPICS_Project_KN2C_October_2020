from flask_restful import Resource

from epics_db.pv_objects import chiller, temperature_Average, pressure, time_Count, power_Usage_Display


class LiveLog(Resource):
    def get(self):
        return {'Chiller': chiller.value, 'Temperature_Average': temperature_Average.value, 'Pressure': pressure.value,
                'Time_Count': time_Count.value, 'Power_Usage_Display': power_Usage_Display.value}
