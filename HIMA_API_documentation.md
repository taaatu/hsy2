# HIMA APPLICATION REST API

Backend servive for HSY HIMA application - Autumn 2023 - Metropolia

## BUILD

1. Clone the project

```
    git clone https://github.com/taaatu/hsy2.git
```

2. Install dependencies

```
    npm i
```

3. Create/edit .env file with your database credentials.

```
    DB_HOST=<server-ip>
    DB_USER=<your-db-user>
    DB_PASS=<your-db-user_password>
    DB_NAME=<your-db-name>
    JWT_SECRET=<your-jwt-secret>
    MAILER_PROVIDER=<your-email-provider>
    MAILER_EMAIL=<your-email-address>
    MAILER_PASSWORD=<your-email-app-password>
```

4. Run the application

```
    node app.js
```

## DATABASE STRUCTURE

![Database structure](assets/database.png?raw=true "Database") <br>

## API REFERENCE

### AUTH ROUTE

#### * ***Login*** *

```http
  POST base_url/auth/login
```

```http
  Content-type: application/json
```

| Parameter  | Type     | Description  |
| :--------- | :------- | :----------- |
| `email`    | `email`  | **Required** |
| `password` | `string` | **Required** |

Response:

```json
{
    "user": {
        "user_id": 146,
        "full_name": "Kari Kalanen",
        "email": "karisetkalaset@gmail.com",
        "company": "Kalasen Isännöinti Oy",
        "user_group": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxNDYsImZ1bGxfbmFtZSI6IkthcmkgS2FsYW5lbiIsImVtYWlsIjoia2FyaXNldGthbGFzZXRAZ21haWwuY29tIiwiY29tcGFueSI6IkthbGFzZW4gSXPDpG5uw7ZpbnRpIE95IiwidXNlcl9ncm91cCI6MSwiaWF0IjoxNzAxNjQxNjkxfQ.Ec6WKD4zTUJD2DucUB_KEmMXe0x788GlczNXwaaSjPI"
}
```
---
### USER ROUTE

#### * ***Get All Users*** *

```http
  GET base_url/user
```

```http
  Authorization: Bearer token
```

Response:

```json
[
    ......
    {
        "user_id": 147,
        "full_name": "Maija Meriranta",
        "email": "maijantalotoy@yahoo.fi",
        "company": "Maijan Talot Oy",
        "user_group": 1
    },
    {
        "user_id": 148,
        "full_name": "Lauri Leppä",
        "email": "laurintalot@hotmail.fi",
        "company": "Leppä Oy",
        "user_group": 1
    },
    .......
]
```
---
#### * ***Add User By Admin*** *

```http
  POST base_url/user
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter            | Type     | Description                |
| :------------------- | :------- | :------------------------- |
| `full_name`          | `string` | **Required, min length 3** |
| `password`           | `string` | **Required, min length 3 and at least 1 upcase letter**         |
| `email`              | `email`  | **Required, email**        |
| `company`            | `string` | **Required, not empty**    |

Response:

```json
{
    "message": "user added with id: 157",
    "id": 157
}
```
---
#### * ***Get User By Id*** *

```http
  GET base_url/user/userid/:userId
```

```http
  Authorization: Bearer token
```

Response:

```json
{
    "user_id": 146,
    "full_name": "Kari Kalanen",
    "password": "Karikalanen1",
    "email": "karisetkalaset@gmail.com",
    "company": "Kalasen Isännöinti Oy",
    "user_group": 1
}
```
---
#### * ***Update User Info By Admin*** *

```http
  PUT base_url/user/adminupdate/:userId
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter            | Type     | Description                |
| :------------------- | :------- | :------------------------- |
| `full_name`          | `string` | **Required, min length 3** |
| `password`           | `string` | **Required, min length 3 and at least 1 upcase letter**         |
| `email`              | `email`  | **Required, email**        |
| `company`            | `string` | **Required, not empty**    |
| `user_group`         | `numeric`| **Required, is numeric**   |

Response:

```json
{
    "message": "User Maija Meriranta's info updated"
}
```
---

#### * ***Update User Info By User*** *

```http
  PUT base_url/user/update
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter            | Type     | Description                |
| :------------------- | :------- | :------------------------- |
| `full_name`          | `string` | **Required, min length 3** |
| `password`           | `string` | **Required, min length 3 and at least 1 upcase letter**         |
| `email`              | `email`  | **Required, email**        |
| `company`            | `string` | **Required, not empty**    |

Response:

```json
{
    "message": "User Kari Kalanen's info updated"
}
```
---
#### * ***Delete User By Admin*** *

```http
  DELETE base_url/user/userid/:userId
```

```http
  Authorization: Bearer token
```

Response:

```json
{
    "message": "User deleted: 157"
}
```
---
#### * ***Check User Info By Token*** *

```http
  GET base_url/user/token
```

```http
  Authorization: Bearer token
```

Response:

```json
{
    "user_id": 1,
    "full_name": "Admin",
    "email": "admin@hsy.fi",
    "company": "Google",
    "user_group": 0,
    "iat": 1701642921
}
```
---

### BUILDING ROUTE

#### * ***Get Building List*** *

```http
  GET base_url/building
```

```http
  Authorization: Bearer token
```

Response:

```json
[
    ......
    {
        "building_id": 1,
        "u_id": 1,
        "street": "Maaherrantie 30",
        "post_code": "00650",
        "city": "Helsinki",
        "name": "building_1"
    },
    {
        "building_id": 2,
        "u_id": 1,
        "street": "Koskustie 4",
        "post_code": "00410",
        "city": "Helsinki",
        "name": "building_2"
    },
    .......
]
```
---
#### * ***Create New Building By User*** *

```http
  POST base_url/building
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter            | Type     | Description                |
| :------------------- | :------- | :------------------------- |
| `street`             | `string` | **Required, not empty** |
| `post_code`          | `numeric`| **Required, mathch 5 digits**         |
| `city`               | `string` | **Required, not empty**        |
| `name`               | `string` | **Required, not empty**    |

Response:

```json
{
    "building_id": "10",
    "message": "Building Maaherra Asoy added",
    "status": 200
}
```
---
#### * ***Delete Building*** *

```http
  DELETE base_url/building/:buildingId
```

```http
  Authorization: Bearer token
```

Response:

```json
{
    "building_id": "10",
    "message": "Building Maaherra Asoy added",
    "status": 200
}
```
---
#### * ***Update Existing Building By User*** *

```http
  PUT base_url/building/:buildingId
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter            | Type     | Description                |
| :------------------- | :------- | :------------------------- |
| `street`             | `string` | **Required, not empty** |
| `post_code`          | `numeric`| **Required, mathch 5 digits**         |
| `city`               | `string` | **Required, not empty**        |
| `name`               | `string` | **Required, not empty**    |

Response:

```json
{
    "building_id": "57",
    "message": "Building Maaherra Asoy updated",
    "status": 200
}
```
---
#### * ***Delete A Building By User*** *

```http
  DELETE base_url/building/:buildingId
```

```http
  Authorization: Bearer token
```

Response:

```json
{
    "message": "Building deleted: 57",
    "status": 200
}
```
---

### SURVEY ROUTE

#### * ***Get List Of Surveys*** *

```http
  GET base_url/survey
```

```http
  Authorization: Bearer token
```

Response:

```json
[
    ......
    {
        "survey_id": 88,
        "u_id": 1,
        "survey_title": "5 kysymyksen kysely",
        "start_time": "10-11-2023",
        "end_time": "28-11-2025",
        "description": "5 kyssäriä",
        "survey_status": "published"
    },
    {
        "survey_id": 97,
        "u_id": 1,
        "survey_title": "Ihan Vaan Testi",
        "start_time": "16-11-2023",
        "end_time": "14-11-2023",
        "description": "Noh Tää Ny O Vaa Tämmöi Kysely",
        "survey_status": "published"
    },
    .......
]
```
---
#### * ***Create Survey*** *

```http
  POST base_url/survey
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter                     | Type     | Description                |
| :---------------------------- | :------- | :------------------------- |
| `survey_header.u_id`          | `numeric`| **Required, is numeric**   |
| `survey_header.survey_title`  | `string` | **Required, not empty**    |
| `survey_header.start_time`    | `string` | **Required, match day-month-year**    |
| `survey_header.end_time`      | `string` | **Required, match day-month-year**    |
| `survey_header.description`   | `string` | **Required, not empty** |
| `survey_header.survey_status` | `string` | **Required, should be published or unpblished**         |
| `questions[*].question`       | `string` | **Required, not empty**        |
| `questions[*].option_1`       | `string` | **Required, not empty**    |
| `questions[*].option_2`       | `string` | **Required, not empty** |
| `questions[*].option_3`       | `string`| **Required, not empty**         |

Response:

```json
{
    "survey_id": "127",
    "message": "Survey Parkkipaikka kysely added",
    "status": 200
}
```
---

#### * ***Modify Survey End Date*** *

```http
  PUT base_url/survey
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter                     | Type     | Description                |
| :---------------------------- | :------- | :------------------------- |
| `s_id`                        | `numeric`| **Required, is numeric**   |
| `end_time`                    | `string` | **Required, match day-month-year**    |

Response:

```json
{
    "message": "Survey Taloyhtiöbarometri's end time updated from 19-11-2024 to 19-11-2027"
}
```
---

#### * ***Update Survey Status*** *

```http
  POST base_url/survey/surveystatusupdate
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter                     | Type     | Description                |
| :---------------------------- | :------- | :------------------------- |
| `survey_id`                   | `numeric`| **Required, is numeric**   |

Response:

```json
{
    "message": "survey 124 has been successfully published!",
    "status": 200
}
```
---

#### * ***Get Survey By Survey ID*** *

```http
  GET base_url/survey/surveybyid/:surveyId
```

```http
  Authorization: Bearer token
```

Response:

```json
{
    "survey_header": {
        "survey_id": 134,
        "u_id": 1,
        "survey_title": "Parkkipaikka kysely",
        "start_time": "23-11-2023",
        "end_time": "20-01-2024",
        "description": "Tervehdys taloyhtiön asukkaat!\n\nOlemme käynnistämässä kyselyä liittyen taloyhtiömme parkkipaikkatilanteeseen. Tavoitteenamme on parantaa nykyistä järjestelmäämme ja varmistaa, että jokaisella asukkaalla on mahdollisuus turvalliseen ja kätevään pysäköintiin. Arvostamme osallistumistanne ja mielipidettänne tässä asiassa. Kyselyn tulokset auttavat meitä tekemään tietoisempia päätöksiä tulevaisuudessa.\n\nKiitos etukäteen osallistumisestasi!",
        "survey_status": "published"
    },
    "questions": [
        {
            "question_id": 445,
            "s_id": 134,
            "question": "Kuinka tyytyväinen olet nykyiseen parkkipaikkatilanteeseen taloyhtiössämme asteikolla 1-5, missä 1 on erittäin tyytymätön ja 5 erittäin tyytyväinen?",
            "option_1": "Pidän tärkeänä tai toimin näin",
            "option_2": "Asialla ei ole merkitystä tai asia ei koske minua",
            "option_3": "En pidä tärkeänä tai en toimi näin"
        },
        {
            "question_id": 446,
            "s_id": 134,
            "question": "Miten arvioit nykyisten vieraspaikkojen riittävyyttä taloyhtiössämme?",
            "option_1": "Pidän tärkeänä tai toimin näin",
            "option_2": "Asialla ei ole merkitystä tai asia ei koske minua",
            "option_3": "En pidä tärkeänä tai en toimi näin"
        },
        {
            "question_id": 447,
            "s_id": 134,
            "question": "Haluaisitko nähdä lisää katettuja parkkipaikkoja taloyhtiön alueella vai pidätkö nykyistä määrää riittävänä?",
            "option_1": "Pidän tärkeänä tai toimin näin",
            "option_2": "Asialla ei ole merkitystä tai asia ei koske minua",
            "option_3": "En pidä tärkeänä tai en toimi näin"
        },
        {
            "question_id": 448,
            "s_id": 134,
            "question": "Onko sinulla ehdotuksia tai parannusehdotuksia parkkipaikkajärjestelyihin liittyen?",
            "option_1": "Pidän tärkeänä tai toimin näin",
            "option_2": "Asialla ei ole merkitystä tai asia ei koske minua",
            "option_3": "En pidä tärkeänä tai en toimi näin"
        },
        {
            "question_id": 449,
            "s_id": 134,
            "question": "Kuinka usein käytät autoa ja tarvitset parkkipaikkaa taloyhtiön alueella?",
            "option_1": "Pidän tärkeänä tai toimin näin",
            "option_2": "Asialla ei ole merkitystä tai asia ei koske minua",
            "option_3": "En pidä tärkeänä tai en toimi näin"
        }
    ]
}
```
---

#### * ***Delete Survey By Survey ID*** *

```http
  Delete base_url/survey/surveybyid/:surveyId
```

```http
  Authorization: Bearer token
```

Response:

```json
{
    "message": "Survey deleted: 127",
    "status": 200
}
```
---

#### * ***Get List Of Assigned Surveys*** *

```http
  GET base_url/survey/assignsurevey
```

```http
  Authorization: Bearer token
```

Response:

```json
[
    ......
    {
        "b_id": 50,
        "assigned_survey_id": 236,
        "survey_id": 134,
        "survey_creator_id": 1,
        "survey_title": "Parkkipaikka kysely",
        "start_time": "23-11-2023",
        "end_time": "20-01-2024",
        "description": "Tervehdys taloyhtiön asukkaat!\n\nOlemme käynnistämässä kyselyä liittyen taloyhtiömme parkkipaikkatilanteeseen. Tavoitteenamme on parantaa nykyistä järjestelmäämme ja varmistaa, että jokaisella asukkaalla on mahdollisuus turvalliseen ja kätevään pysäköintiin. Arvostamme osallistumistanne ja mielipidettänne tässä asiassa. Kyselyn tulokset auttavat meitä tekemään tietoisempia päätöksiä tulevaisuudessa.\n\nKiitos etukäteen osallistumisestasi!",
        "assigned_perperty_manager_u_id": 148,
        "street": "Talotie 4 B",
        "post_code": "00100",
        "city": "Helsinki",
        "building_name": "Talotie Asoy"
    },
    {
        "b_id": 51,
        "assigned_survey_id": 237,
        "survey_id": 134,
        "survey_creator_id": 1,
        "survey_title": "Parkkipaikka kysely",
        "start_time": "23-11-2023",
        "end_time": "20-01-2024",
        "description": "Tervehdys taloyhtiön asukkaat!\n\nOlemme käynnistämässä kyselyä liittyen taloyhtiömme parkkipaikkatilanteeseen. Tavoitteenamme on parantaa nykyistä järjestelmäämme ja varmistaa, että jokaisella asukkaalla on mahdollisuus turvalliseen ja kätevään pysäköintiin. Arvostamme osallistumistanne ja mielipidettänne tässä asiassa. Kyselyn tulokset auttavat meitä tekemään tietoisempia päätöksiä tulevaisuudessa.\n\nKiitos etukäteen osallistumisestasi!",
        "assigned_perperty_manager_u_id": 148,
        "street": "Mökkitie 7 ",
        "post_code": "00900",
        "city": "Helsinki",
        "building_name": "Mökkitie Asoy"
    },
    .......
]
```
---

#### * ***Delete Assigned Survey By Assigned Survey ID*** *

```http
  Delete base_url/survey/assignsurevey
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter                     | Type     | Description                |
| :---------------------------- | :------- | :------------------------- |
| `as_id`                       | `numeric`| **Required, is numeric**   |

Response:

```json
{
    "message": "Assigned survey deleted: 127",
    "status": 200
}
```
---

#### * ***Assign A Survey To A Building*** *

```http
  POST base_url/survey/assignsurevey
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter                     | Type     | Description                |
| :---------------------------- | :------- | :------------------------- |
| `s_id`                        | `numeric`| **Required, is numeric**   |
| `as_id`                       | `numeric`| **Required, is numeric**   |

Response:

```json
{
    "message": "Survey 126 has been successfully assigned to building 6",
    "status": 200
}
```
---

#### * ***Create An Access Key For A Assigned Survey*** *

```http
  POST base_url/survey/assignsureveykeypost
```

```http
  Authorization: Bearer token
```

```http
  Content-type: application/json
```

| Parameter                     | Type     | Description                |
| :---------------------------- | :------- | :------------------------- |
| `as_id`                       | `numeric`| **Required, is numeric**   |

Response:

```json
{
    "message": "key 685447 has been successfully create for assigned survey ID 236",
    "status": 200
}
```
---

#### * ***Get List Of Access Keys Of A Assigned Survey*** *

```http
  GET base_url/survey/assignsureveykey/:as_id/:key_status
```

```http
  Authorization: Bearer token
```

Response:

```json
[
    ......
    {
        "survey_key": 283399,
        "key_status": "used"
    },
    {
        "survey_key": 614808,
        "key_status": "used"
    },
    {
        "survey_key": 664172,
        "key_status": "unused"
    },
    .......
]
```
---

#### * ***Get Statistic And List Of Answers Of An Assigned Survey*** *

```http
  GET base_url/survey/assignedsurveyanswerlist/:as_id
```

```http
  Authorization: Bearer token
```

Response:

```json
{
    "number_of_answers": 2,
    "survey_point_list": [
        3.5,
        2
    ],
    "average_percentage": 55,
    "average_survey_point": 2.75,
    "survey_questions_statistics": [
        {
            "question": "Kysymys 1",
            "number_resident_selected_option_1": 1,
            "number_resident_selected_option_2": 1,
            "number_resident_selected_option_3": 0
        },
        {
            "question": "Kysymys 2",
            "number_resident_selected_option_1": 0,
            "number_resident_selected_option_2": 1,
            "number_resident_selected_option_3": 1
        },
        {
            "question": "Kysymys 3",
            "number_resident_selected_option_1": 0,
            "number_resident_selected_option_2": 1,
            "number_resident_selected_option_3": 1
        },
        {
            "question": "Kysymys 4",
            "number_resident_selected_option_1": 2,
            "number_resident_selected_option_2": 0,
            "number_resident_selected_option_3": 0
        },
        {
            "question": "Kysymys 5",
            "number_resident_selected_option_1": 1,
            "number_resident_selected_option_2": 0,
            "number_resident_selected_option_3": 1
        }
    ],
    "survey_answers": [
        {
            "survey_head": {
                "survey_id": 88,
                "u_id": 1,
                "survey_title": "5 kysymyksen kysely",
                "start_time": "10-11-2023",
                "end_time": "28-11-2025",
                "description": "5 kyssäriä",
                "survey_status": "published"
            },
            "survey_answers": [
                {
                    "q_id": 281,
                    "question": "Kysymys 1",
                    "selected_option": "Pidän tärkeänä tai toimin näin"
                },
                {
                    "q_id": 282,
                    "question": "Kysymys 2",
                    "selected_option": "Asialla ei ole merkitystä tai asia ei koske minua"
                },
                {
                    "q_id": 283,
                    "question": "Kysymys 3",
                    "selected_option": "En pidä tärkeänä tai en toimi näin"
                },
                {
                    "q_id": 284,
                    "question": "Kysymys 4",
                    "selected_option": "Pidän tärkeänä tai toimin näin"
                },
                {
                    "q_id": 285,
                    "question": "Kysymys 5",
                    "selected_option": "Pidän tärkeänä tai toimin näin"
                }
            ],
            "survey_points": 3.5,
            "percentage": "70.0%"
        },
        {
            "survey_head": {
                "survey_id": 88,
                "u_id": 1,
                "survey_title": "5 kysymyksen kysely",
                "start_time": "10-11-2023",
                "end_time": "28-11-2025",
                "description": "5 kyssäriä",
                "survey_status": "published"
            },
            "survey_answers": [
                {
                    "q_id": 281,
                    "question": "Kysymys 1",
                    "selected_option": "Asialla ei ole merkitystä tai asia ei koske minua"
                },
                {
                    "q_id": 282,
                    "question": "Kysymys 2",
                    "selected_option": "En pidä tärkeänä tai en toimi näin"
                },
                {
                    "q_id": 283,
                    "question": "Kysymys 3",
                    "selected_option": "Asialla ei ole merkitystä tai asia ei koske minua"
                },
                {
                    "q_id": 284,
                    "question": "Kysymys 4",
                    "selected_option": "Pidän tärkeänä tai toimin näin"
                },
                {
                    "q_id": 285,
                    "question": "Kysymys 5",
                    "selected_option": "En pidä tärkeänä tai en toimi näin"
                }
            ],
            "survey_points": 2,
            "percentage": "40.0%"
        }
    ]
}
```
---

#### * ***Get Statistic And List Of Answers Of A Survey*** *

```http
  GET base_url/survey/surveyanswerlist/:s_id
```

```http
  Authorization: Bearer token
```

Response:

```json
{
    "number_of_answers": 9,
    "survey_point_list": [
        3.5,
        2,
        0.5,
        5,
        2,
        5,
        2.5,
        5,
        0
    ],
    "average_percentage": 56.7,
    "average_survey_point": 2.83,
    "survey_questions_statistics": [
        {
            "question": "Kysymys 1",
            "number_resident_selected_option_1": 4,
            "number_resident_selected_option_2": 3,
            "number_resident_selected_option_3": 2
        },
        {
            "question": "Kysymys 2",
            "number_resident_selected_option_1": 3,
            "number_resident_selected_option_2": 3,
            "number_resident_selected_option_3": 3
        },
        {
            "question": "Kysymys 3",
            "number_resident_selected_option_1": 3,
            "number_resident_selected_option_2": 2,
            "number_resident_selected_option_3": 4
        },
        {
            "question": "Kysymys 4",
            "number_resident_selected_option_1": 6,
            "number_resident_selected_option_2": 1,
            "number_resident_selected_option_3": 2
        },
        {
            "question": "Kysymys 5",
            "number_resident_selected_option_1": 5,
            "number_resident_selected_option_2": 0,
            "number_resident_selected_option_3": 4
        }
    ],
    "survey_answers": [
      ......
      {
            "survey_head": {
                "survey_id": 88,
                "u_id": 1,
                "survey_title": "5 kysymyksen kysely",
                "start_time": "10-11-2023",
                "end_time": "28-11-2025",
                "description": "5 kyssäriä",
                "survey_status": "published",
                "assigned_survey_id": 190,
                "street": "eskonkatu 1",
                "post_code": "00100",
                "city": "Helsinki",
                "name": "Esko asoy"
            },
            "survey_answers": [
                {
                    "q_id": 281,
                    "question": "Kysymys 1",
                    "selected_option": "Pidän tärkeänä tai toimin näin"
                },
                {
                    "q_id": 282,
                    "question": "Kysymys 2",
                    "selected_option": "Asialla ei ole merkitystä tai asia ei koske minua"
                },
                {
                    "q_id": 283,
                    "question": "Kysymys 3",
                    "selected_option": "En pidä tärkeänä tai en toimi näin"
                },
                {
                    "q_id": 284,
                    "question": "Kysymys 4",
                    "selected_option": "Pidän tärkeänä tai toimin näin"
                },
                {
                    "q_id": 285,
                    "question": "Kysymys 5",
                    "selected_option": "Pidän tärkeänä tai toimin näin"
                }
            ],
            "survey_points": 3.5,
            "percentage": 70
        },
      ......
    ]
}
```
---

### SURVEY SUBMIT ROUTE

#### * ***Get A Assigned Survey By Key*** *

```http
  GET base_url/submit/:key
```

Response:

```json
{
    "survey_header": {
        "survey_id": 75,
        "u_id": 27,
        "survey_title": "Taloyhtiöbarometri 2",
        "start_time": "11-03-2023",
        "end_time": "31-05-2024",
        "description": "ASUKASKYSELY TALOYHTIÖMME TAHTOTILAN SELVITTÄMISEKSI \n\nPyydämme sinua osallistumaan taloyhtiömme asukaskyselyyn, jonka tulosten perusteella laadimme yhteiset tavoitteet energiankulutukselle, taloudelle ja asumismukavuudelle.  \n\nOHJE VASTAAMISEEN: Kysymykset ovat luonteeltaan sellaisia, että saatat toimia jossain tilanteissa tietyllä tavalla ja joissain tilanteissa toisin. Valitse vastausvaihtoehdoista se, joka eniten vastaa tahtotilaasi tai asennettasi kysyttyyn asiaan. Mikäli taloyhtiössänne tai kodissanne automaatio huolehtii kysytystä asiasta, vastaa \"Pidän tärkeänä tai toimin näin\".\n\nVastaa asukaskyselyyn viimeistään XX.XX.\nKysymyksiä on yhteensä 39 kappaletta. Vastaamiseen kuluu 5-10 minuuttia.\n\nKuljetaan kohti yhteisiä tavoitteita \n\nTaloyhtiön asukkaina ja osakkaina emme useinkaan mieti elämäntapaamme ja jokapäiväisiä tottumuksiamme. Asumistottumuksemme vaikuttavat kuitenkin käytännössä taloyhtiön kuluihin, kuntoon ja sitä kautta myös sen arvoon. Sen vuoksi haluamme kartoittaa nykytilannetta ja tehdä suunnitelmat tulevaisuutta silmällä pitäen, jotta asuminen taloyhtiössämme on turvallista, ennakoitavaa ja terveellistä sekä ilmastoystävällistä. \n\nKyselystä koottujen tulosten perusteella kokoamme yhteisen kuvan asukkaidemme tahtotilasta. Sen perusteella laadimme toimintasuunnitelman eli tiekartan, jotta jatkossa jokainen meistä on perillä siitä, mihin taloyhtiössämme pyritään. Näin jokaisella on myös entistä paremmat mahdollisuudet osallistua yhteisten tavoitteiden saavuttamiseen. Kyselyn tulosten avulla taloyhtiön hallitus ja isännöitsijä pystyvät ohjaamaan taloyhtiötä sinun toivomaasi suuntaan. \n\nVastaat kyselyyn anonyymisti ja tulokset kootaan automaattisesti. Vastaukset käydään läpi kokonaisuutena eikä kenenkään vastauksia pystytä kohdistamaan yksittäiseen henkilöön. \n\nTervetuloa tulosten julkistamistilaisuuteen xx.xx.20xx klo: xx.xx, osoite: .  \n\nYhteistyöterveisin, \n\nTaloyhtiön hallitus ja isännöitsijä ",
        "survey_status": ""
    },
    "questions": [
        .......
        {
            "question_id": 159,
            "s_id": 75,
            "question": "Pyrin pitämään huonelämpötilan suositusten mukaisena (n. 20-22 C).",
            "option_1": "Pidän tärkeänä tai toiminin näin",
            "option_2": "Asialla ei ole merkitystä tai asia ei koske minua",
            "option_3": "En pidä tärkeänä tai en toimi näin"
        },
        {
            "question_id": 160,
            "s_id": 75,
            "question": "Ohjeita noudattamalla varmistan, että lämmitysjärjestelmä toimii oikein. En peitä patteritermostaatteja verhoilla tai huonekaluilla.",
            "option_1": "Pidän tärkeänä tai toiminin näin",
            "option_2": "Asialla ei ole merkitystä tai asia ei koske minua",
            "option_3": "En pidä tärkeänä tai en toimi näin"
        },
        .......
    ]
}
```
---

#### * ***Submit Answers to A Assigned Survey By Key*** *

```http
  POST base_url/base_url/submit/:key
```

```http
  Content-type: application/json
```

| Parameter                     | Type     | Description                |
| :---------------------------- | :------- | :------------------------- |
| `answers[*].q_id`             | `numeric`| **Required, is numeric**   |
| `answers[*].selected_option`  | `string` | **Required, not empty**    |

Response:

```json
{
    "message": "Survey submitted.",
    "status": 200
}
```
---

#### * ***Review Newly Submitted Answers By Key*** *

```http
  POST base_url/base_url/surveyanswer/:key
```

Response:

```json
{
    "survey_head": {
        "survey_id": 134,
        "u_id": 1,
        "survey_title": "Parkkipaikka kysely",
        "start_time": "23-11-2023",
        "end_time": "20-01-2024",
        "description": "Tervehdys taloyhtiön asukkaat!\n\nOlemme käynnistämässä kyselyä liittyen taloyhtiömme parkkipaikkatilanteeseen. Tavoitteenamme on parantaa nykyistä järjestelmäämme ja varmistaa, että jokaisella asukkaalla on mahdollisuus turvalliseen ja kätevään pysäköintiin. Arvostamme osallistumistanne ja mielipidettänne tässä asiassa. Kyselyn tulokset auttavat meitä tekemään tietoisempia päätöksiä tulevaisuudessa.\n\nKiitos etukäteen osallistumisestasi!",
        "survey_status": "published"
    },
    "survey_answers": [
        {
            "q_id": 445,
            "question": "Kuinka tyytyväinen olet nykyiseen parkkipaikkatilanteeseen taloyhtiössämme asteikolla 1-5, missä 1 on erittäin tyytymätön ja 5 erittäin tyytyväinen?",
            "selected_option": "Pidän tärkeänä tai toimin näin"
        },
        {
            "q_id": 446,
            "question": "Miten arvioit nykyisten vieraspaikkojen riittävyyttä taloyhtiössämme?",
            "selected_option": "Asialla ei ole merkitystä tai asia ei koske minua"
        },
        {
            "q_id": 447,
            "question": "Haluaisitko nähdä lisää katettuja parkkipaikkoja taloyhtiön alueella vai pidätkö nykyistä määrää riittävänä?",
            "selected_option": "Pidän tärkeänä tai toimin näin"
        },
        {
            "q_id": 448,
            "question": "Onko sinulla ehdotuksia tai parannusehdotuksia parkkipaikkajärjestelyihin liittyen?",
            "selected_option": "En pidä tärkeänä tai en toimi näin"
        },
        {
            "q_id": 449,
            "question": "Kuinka usein käytät autoa ja tarvitset parkkipaikkaa taloyhtiön alueella?",
            "selected_option": "Pidän tärkeänä tai toimin näin"
        }
    ],
    "average_percentage": 70,
    "average_survey_point": 3.5,
    "own_percentage": 70,
    "own_survey_points": 3.5,
    "answer_count": 3
}
```
---