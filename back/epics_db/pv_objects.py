from epics import PV

chiller = PV('Chiller')
temperature_Average = PV('Temperature_Average')
pressure = PV('Pressure')
time_Count = PV('Time_Count')
power_Usage_Display = PV('Power_Usage_Display')

sevr = PV('Pressure.SEVR')
stat = PV('Pressure.STAT')

thermometer_1 = PV('Thermometer_1.VAL')
thermometer_2 = PV('Thermometer_2.VAL')
thermometer_3 = PV('Thermometer_3.VAL')

thresholdPV = PV('Threshold.VAL')
time_countPv = PV('Time_Count.VAL')
powerphPV = PV('PowerPH.VAL')
volumePV = PV('Volume.VAL')
molePV = PV('N.VAL')

