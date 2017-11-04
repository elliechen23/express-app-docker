# express-app-docker

**Pre-install**

- Node.js

- Docker Toolbox

- Mongo DB

**Local init**

`npm install`

`npm start`

**Mongo DB command**

`brew upgrade mongodb`

`mongod --dbpath ./data/db`

`mongo`

**Reset Docker**

- clean all container

`docker rm -f $(docker ps -a -q)`

- clean all images

`docker rmi -f $(docker images -a -q)`

**Build**

`docker-compose build`

**Run**

`docker-compose up`

**Start Postman**

**Users REST API Testing**

- 新增 Post:

  `http://<your-ip>:8080/api1/users/`
  
  `{"name":"Jack","email":"Jack@hotmail.com","age":35}`

- 查詢全部 Get:

  `http://<your-ip>:8080/api1/users/`
  
  - 查詢結果

  `[{"_id":"59f57aac3cc930c28f11beda","name":"Jack","email":"Jack@hotmail.com","age":39,"__v":0}]`

- 修改 Put:

  `http://<your-ip>:8080/api1/users/59f57aac3cc930c28f11beda`
  
  `{"name":"Jack","email":"Jack@hotmail.com","age":39}`

- 刪除 Delete:

  `http://<your-ip>:8080/api1/users/59f57aac3cc930c28f11beda`


**Books REST API Testing**

- 新增 Post:

  `http://<your-ip>:8080/api2/books/`
  
  `{"name":"Office 2016","author":"Microsoft","price":1000}`

- 查詢全部 Get:

  `http://<your-ip>:8080/api2/books/`
  
  - 查詢結果

  `[{"_id":"59fda77acd77740011ec27b2","name":"Office 2016","author":"Microsoft","price":1000,"__v":0}]`

- 修改 Put:

  `http://<your-ip>:8080/api2/books/59fda77acd77740011ec27b2`
  
  `{"name":"Office 2017","author":"Microsoft","price":1200}`

- 刪除 Delete:

  `http://<your-ip>:8080/api2/books/59fda77acd77740011ec27b2`


