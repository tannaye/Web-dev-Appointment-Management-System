//create schedule
function create_schedule() {
  const data = JSON.stringify({
    supervisorId: sessionStorage.getItem("id"),
    studentLimit: document.getElementById("num_of_students").value,
    day: document.getElementById("daySelector").value,
    timeStart: document.getElementById("input1").value,
    timeEnd: document.getElementById("input2").value,
    semesterId: document.getElementById("semesterSelector").value,
    message: document.getElementById("message").value,
    name: document.getElementById("meeting_name").value,
  });

  //   console.log(data);
  xhr.open("POST", `http://localhost:80/Web Project/api/meeting/schedule.php`);
  xhr.send(data);

  xhr.onload = function () {
    let resp = JSON.parse(xhr.response);
    if (xhr.status == 200) {
      alert(resp.message);
      window.location.replace(
        "http://127.0.0.1:5500/front-end/supervisor-meetings.html"
      );
    } else {
      // handle error
      // get the response from xhr.response
      console.log(resp.message);
      alert("Error: " + resp.message);
    }
  };
}
