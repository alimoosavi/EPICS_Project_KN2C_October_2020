import mysql.connector

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="epics"
)

mycursor = mydb.cursor()

try:
    mycursor.execute("CREATE TABLE ParametersLogs (id INT AUTO_INCREMENT PRIMARY KEY, threshold integer , volume integer , mole integer , powerph integer , time BIGINT  )")

    mycursor.execute("CREATE TABLE PvLogs (id INT AUTO_INCREMENT PRIMARY KEY, parametersId int ,  temperature_average float , chiller integer , time_count integer, power_usage integer , pressure integer , pressure_stat integer , pressure_sevr integer , thermometer_1 integer , thermometer_2 integer , thermometer_3 integer , time BIGINT , FOREIGN KEY(parametersId) REFERENCES ParametersLogs(id)  )")

except:
    print("table already exists!")

