const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const app = express();

app.use(express.json());

const databasePath = path.join(__dirname, "moviesData.db");

let database = null;

const initializeDBAndServer = async () => {
  try {
    database = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};
initializeDBAndServer();

const convertStudentDbObjectToResponseObject = (dbObject) => {
  return {
    studentId: dbObject.student_id,
    subjectId: dbObject.subject_id,
    studentName: dbObject.student_name,
    email: dbObject.email,
  };
};

const convertSubjectDbObjectToResponseObject = (dbObject) => {
  return {
    subjectId: dbObject.director_id,
    subjectName: dbObject.director_name,
  };
};

app.get("/student/", async (request, response) => {
  const getStudentQuery = `
        SELECT 
            student_name
        FROM
            student;`;
  const studentArray = await database.all(getStudentQuery);
  response.send(
    studentArray.map((eachStudent) => ({
      studentName: eachStudent.student_name,
    }))
  );
});

app.post("/student/", async (request, response) => {
  const { subjectId, studentName, email } = request.body;
  const postStudentQuery = `
    INSERT INTO
        movie(subject_id,student_name,email)
    VALUES
        ('${subjectId}','${studentName}','${email}');`;
  await database.run(postStudentQuery);
  response.send("Student Successfully Added");
});

app.get("/student/:studentId/", async (request, response) => {
  const { studentId } = request.params;
  const getStudentQuery = `
    SELECT 
      *
    FROM 
      student 
    WHERE 
      student_id = ${studentId};`;
  const students = await database.get(getStudentQuery);
  response.send(convertStudentDbObjectToResponseObject(students));
});

app.get("/subject/", async (request, response) => {
  const getSubjectsQuery = `
    SELECT
      *
    FROM
      subject;`;
  const subjectsArray = await database.all(getSubjectsQuery);
  response.send(
    subjectsArray.map((eachSubject) =>
      convertSubjectDbObjectToResponseObject(eachSubject)
    )
  );
});

module.exports = app;
