import random
from influxdb_client import InfluxDBClient, Point
import time

# Token WdmBIzzFAZ1Y1YmyH9ngbnwc9-l45gMz4zVuB9bSgobLg-OImV7ju1dF_DP4wm4vWgeAMsD4IkHB9zV90N25NA==
INFLUXDB_URL = "http://influxdb:8086/"
INFLUXDB_TOKEN = "WdmBIzzFAZ1Y1YmyH9ngbnwc9-l45gMz4zVuB9bSgobLg-OImV7ju1dF_DP4wm4vWgeAMsD4IkHB9zV90N25NA=="
INFLUXDB_ORG = "UofG"
INFLUXDB_BUCKET = "Dashboard"

client = InfluxDBClient(url=INFLUXDB_URL, token=INFLUXDB_TOKEN)

def generate_data():
    write_api = client.write_api()

    value1_trend = 50
    value2_trend = 100
    value3_trend = 150

    while True:
        points = []
        for _ in range(10):
            timestamp = int(time.time() * 1e9)

            # Update trend with a random walk
            value1_trend += random.uniform(-1, 1)  # random walk for value1
            value2_trend += random.uniform(-1, 1)  # random walk for value2
            value3_trend += random.uniform(-1, 1)  # random walk for value3

            # Ensure values stay within a reasonable range
            value1_trend = max(0, min(100, value1_trend))
            value2_trend = max(0, min(200, value2_trend))
            value3_trend = max(0, min(300, value3_trend))

            # Add random noise to each value
            value1 = value1_trend + random.uniform(-1, 1)  # noise for value1
            value2 = value2_trend + random.uniform(-1, 1)  # noise for value2
            value3 = value3_trend + random.uniform(-1, 1)  # noise for value3

            # Create points for each sequence
            point1 = Point("measurement1").field("value", value1).time(timestamp)
            point2 = Point("measurement2").field("value", value2).time(timestamp)
            point3 = Point("measurement3").field("value", value3).time(timestamp)

            # Append points to the batch
            points.extend([point1, point2, point3])

        try:
            # Write points to InfluxDB
            write_api.write(bucket=INFLUXDB_BUCKET, org=INFLUXDB_ORG, record=points)
            print(f"Written batch of data")
        except Exception as e:
            print(f"Error writing data: {e}")

        time.sleep(1)

if __name__ == "__main__":
    generate_data()

