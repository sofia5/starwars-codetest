# starwars_coding_test
A coding test that has a little bit of everything.

- It should not take longer than 4 hours to complete.

### Assignment

Write a service that has a REST endpoint fetching the tallest characters from the star wars API.

https://swapi.dev/

- GET endpoint should be something like /tallest-characters

It should return data looking like

```
{
    "count": 82,
    "next": "http://localhost/api/tallest-characters/?page=2",
    "previous": null,
    "results": [
        {
            "name": "Luke Skywalker",
            "height": "172",
        },
        {
            "name": "C-3PO",
            "height": "167",
        }
    ]
}
```

- Create a simple frontend with a table presenting the data (fetched from the backend)

#### Bonus Points

- Create a docker-compose.yaml file with the entire stack
  so you simple can run docker-compose up and having it run.

or 

- Deploy services to heroku / netlify


Fork or clone this repo or send us a link to it when you have completed the assignment.


