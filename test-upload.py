import requests

url = 'http://localhost:3000/upload/image'
image_path = 'client/public/propertyOne.jpg'

with open(image_path, 'rb') as img:
    files = {'image': img}
    response = requests.post(url, files=files)
    print('Status code:', response.status_code)
    print('Response:', response.text) 