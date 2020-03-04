# Backend

Base Server URL: https://potluck-planner2.herokuapp.com

REGISTRATION:

POST /api/auth/register

Req: 
{
	"username": "adam2",
	"password": "test12!"
	
}

Response:
{
    "user": [
        3
    ],
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1ODMzNDkwMDAsImV4cCI6MTU4MzM1MjYwMH0.-Ts0WNkXrkpxDgHUO_QxZonfgqOGoYLPUUVFpa4ky8E"
}



LOGIN: 

POST /api/auth/login

Req: 
{
	"username": "adam2",
	"password": "test12!"
	
}

Response:
{
    "user": {
        "id": 3,
        "username": "adam2"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJhZGFtMiIsImlhdCI6MTU4MzM0OTAwNCwiZXhwIjoxNTgzMzUyNjA0fQ.7m1x2RVGSV41wYLaRPQG-MPDuCXjvfQVjmHKpDi1A5E"
}

CREATE A POTLUCK:

POST /api/potluck

Req: 
{
	"title": "Last test potluck",
	"description": "Hope this works!",
	"date": "2001-04-03",
	"items": ["burgers", "fries", "hotdogs"],
	"guests": ["tate", "adam", "adonis", "aldair", "adrian"]
	
}
Response:
{
    "message": "Added potluck"
}


GET ALL THE POTLUCKS FOR THE USER:

GET /api/potlucks

Response:
[
    {
        "id": 41,
        "title": "Last test potluck",
        "description": "Hope this works!",
        "date": "2001-04-03",
        "userID": 3
    },
    {
        "id": 42,
        "title": "Last test potluck",
        "description": "Hope this works!",
        "date": "2001-04-03",
        "userID": 3
    }
]

GET A SINGLE POTLUCK WITH GUESTS AND ITEMS:

GET /api/potluck/:id

Response:

{
    "potluck": {
        "id": 41,
        "title": "Last test potluck",
        "description": "Hope this works!",
        "date": "2001-04-03",
        "userID": 3
    },
    "items": [
        {
            "id": 7,
            "potluckID": 41,
            "items": "burgers",
            "guest": null
        }
    ],
    "guests": [
        {
            "id": 21,
            "potluckID": 41,
            "guest_name": "tate"
        }
    ]
}

UPDATE A POTLUCK:

PUT /api/potluck/:id

Req:
{

	"title": "updated potluck",
	"description": "Hope this works!",
	"date": "2001-04-03"
	
}

DELETE A POTLUCK:

DEL /api/potluck/:id

Response: 
{
    "removed": 1
}
