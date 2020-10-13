import random
import time

from epics_db.pv_objects import thermometer_1, thermometer_2, thermometer_3

temperature_mid_value = 800
temperature_bound = 500
delay = 1


def set_random_temperatures(thread_name, thread_priority):
    while True:
        time.sleep(delay)

        temp = random.randint(temperature_mid_value - (temperature_bound / 2),
                              temperature_mid_value + (temperature_bound / 2))


        thermometer_1.put(value= temp)

        thermometer_2.put(value= temp + random.randint(5 , 50))

        thermometer_3.put(value= temp + random.randint(5 , 50))
