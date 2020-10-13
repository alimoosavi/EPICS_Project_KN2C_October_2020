from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from api.parameter.parameters import Parameters
from api.parameter.log_parameters import LogParameters
from background_tasks.log_pv import log_pvs_to_database
from api.pvs.live_log import LiveLog
from api.pvs.pv import PV
from background_tasks.generating_random_temperatures import set_random_temperatures
import _thread

app = Flask(__name__)
app.config['SECRET_KEY'] = 'vnkdjnfjknfl1232#'

CORS(app)
api = Api(app)

api.add_resource(Parameters, '/parameters', endpoint='parameters')
api.add_resource(LogParameters, '/log/parameters', endpoint='log_parameters')
api.add_resource(PV, '/pv', endpoint='pv')
api.add_resource(LiveLog, '/live_log', endpoint='live_log')



if __name__ == "__main__":
    _thread.start_new_thread(set_random_temperatures, ("Generating-Random-Temperatures", 2,))
    _thread.start_new_thread(log_pvs_to_database, ("Log-Pvs-Database", 4,))
    app.run(debug=True, port=1234)
