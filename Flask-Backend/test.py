import requests

BASE = "http://127.0.0.1:5000/"

response = requests.post(BASE + "user/sammyb")
print(response.json())

