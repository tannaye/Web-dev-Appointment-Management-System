let xhr = new XMLHttpRequest();
// xhr.setRequestHeader("Content-type", "application/json; charset=utf-8");
const baseUrl = "http://localhost:80/Web Project/api/";

//Function to register a user
async function Register() {
  let type;
  var ele = document.getElementsByName("type");

  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      type = ele[i].value;
    }
  }
  const data = JSON.stringify({
    firstName: document.getElementById("Firstname").value,
    surname: document.getElementById("Lastname").value,
    type: type,
    email: document.getElementById("Email").value,
    password: document.getElementById("Password").value,
  });
  console.log(data);

  xhr.open("POST", `http://localhost:80/Web Project/api/user/register.php`);
  xhr.send(data);

  xhr.onload = function () {
    let resp = JSON.parse(xhr.response);
    if (xhr.status == 200) {
      alert(resp.message);
      window.location.replace("http://127.0.0.1:5500/front-end/signin.html");
    } else {
      // handle error
      // get the response from xhr.response
      console.log(resp.message);
      alert("Error: " + resp.message);
    }
  };
}

//sign in
async function SignIn() {
  const data = JSON.stringify({
    email: document.getElementById("Email").value,
    password: document.getElementById("Password").value,
  });

  xhr.open("POST", `http://localhost:80/Web Project/api/user/login.php`);
  xhr.send(data);

  xhr.onload = function () {
    let resp = JSON.parse(xhr.response);
    if (xhr.status == 200) {
      alert(resp.message);

      //   save user's details in a session
      sessionStorage.setItem("user", resp.data);
      if (resp.data.type == "STUDENT") {
        window.location.replace(
          "http://127.0.0.1:5500/front-end/Student-Meetings.html"
        );
      } else {
        window.location.replace(
          "http://127.0.0.1:5500/front-end/supervisor-Meetings.html"
        );
      }
    } else {
      // handle error
      // get the response from xhr.response

      alert("Error: " + resp.message);
    }
  };
}

//get seemesters
async function get_semesters() {
  var sel = document.getElementById("semesterSelector");
  xhr.open("GET", `http://localhost:80/Web Project/api/semester/semester.php`);
  xhr.send();

  xhr.onload = function () {
    let resp = JSON.parse(xhr.response);
    console.log(resp.data);
    for (let i = 0; i < resp.data.length; i++) {
      const semester = resp.data[i];
      const opt = document.createElement("option");

      opt.appendChild(document.createTextNode(semester.name));

      opt.value = semester.id;

      sel.appendChild(opt);
    }
  };
}

//generate meeting table for student
async function get_students_meetings() {}