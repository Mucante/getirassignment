# getirassignment
RESTful API for getir's challenge

### Endpoints

* /v1/record POST  - example request body:
    ```
    {
        "startDate": "2016-01-11",
        "endDate": "2018-02-02",
        "minCount": 2700,
        "maxCount": 3000
    }
    ```
### Run Jest unit-tests & run the server locally

```
npm run test
npm start
```
### Heroku deployment using Heroku CLI

```


$ heroku login

Use Git to clone getirassignment-canozer's source code to your local machine.

$ heroku git:clone -a getirassignment-canozer
$ cd getirassignment-canozer
$ git push heroku master
```