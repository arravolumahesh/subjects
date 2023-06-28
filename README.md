# Movies

Given two files `app.js` and a database file `moviesData.db` consisting of two tables `student` and `subject`.

Write APIs to perform CRUD operations on the tables `student`, `subject` containing the following columns,

**student Table**

| Columns      | Type    |
| ------------ | ------- |
| student_id   | INTEGER |
| subject_id   | INTEGER |
| student_name | TEXT    |
| email        | TEXT    |

**subject Table**

| Columns      | Type    |
| ------------ | ------- |
| subject_id   | INTEGER |
| subject_name | TEXT    |

### API 1

#### Path: `/student/`

#### Method: `GET`

#### Description:

Returns a list of all student names in the student table

#### Response

```
[
  {
    studentName: "ravi",
  },

  ...
]
```

### API 2

#### Path: `/student/`

#### Method: `POST`

#### Description:

Creates a new student in the student table. `student_id` is auto-incremented

#### Request

```
{
  "subjectId": 6,
  "studentName": "raju",
  "email": "raju@gmail.com"
}
```

#### Response

```
student Successfully Added
```

### API 3

#### Path: `/student/:studentId/`

#### Method: `GET`

#### Description:

Returns a student based on the student ID

#### Response

```
{
  studentId: 12,
  subjectId: 3,
  movieName: "latha",
  email: "latha@gmail.com",
}
```

### API 4

#### Path: `/subject/`

#### Method: `GET`

#### Description:

Returns a list of all subjects in the subject table

#### Response

```
[
  {
    subjectId: 1,
    subjectName: "urdu",
  },

  ...
]
```

<br/>

Use `npm install` to install the packages.

**Export the express instance using the default export syntax.**

**Use Common JS module syntax.**
