import time

from database_config.config import mycursor, mydb
from epics_db.pv_objects import chiller as chillerPv, power_Usage_Display as powerUsagePv, pressure as pressurePv, \
    temperature_Average as tempAvgPv, thermometer_1 as th1Pv, thermometer_2 as th2Pv, thermometer_3 as th3Pv, \
    time_countPv , sevr , stat

delay = 10


def get_milliseconds_timestamp():
    return int(round(time.time() * 1000));


def log_pvs_to_database(thread_name, thread_priority):
    while True:
        th1, th2, th3, chiller, powerUsage, pressure,\
        tempAvg, time_count = th1Pv.value, th2Pv.value,\
                              th3Pv.value, chillerPv.value,\
                              powerUsagePv.value, \
                              pressurePv.value,\
                              tempAvgPv.value, time_countPv.value
        # find latest parameters log as foreign key in pv logs record
        mycursor.execute("select id from ParametersLogs "
                         "where time in (select max(time) from ParametersLogs )")
        paramtersId = int(mycursor.fetchone()[0])

        # print(pressure_stat.value , pressure_sevr.value)
        sql = "INSERT INTO PvLogs (parametersId, temperature_average , chiller , time_count , power_usage , pressure , pressure_stat , pressure_sevr , thermometer_1 , thermometer_2 , thermometer_3 , time) VALUES (%s, %s , %s , %s , %s , %s , %s , %s , %s , %s , %s , %s)"


        val = (paramtersId, tempAvg, chiller, time_count, powerUsage,
               pressure, stat.value, sevr.value, th1, th2, th3,
               get_milliseconds_timestamp())
        mycursor.execute(sql, val)
        mydb.commit()

        time.sleep(delay)
