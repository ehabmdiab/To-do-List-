let input = document.querySelector(".input");
let submit = document.querySelector(".submit");
let tasks = document.querySelector(".task");
let delet = document.querySelectorAll(".btn");
let task = document.querySelectorAll(".element");

let array = []; //array of object to be stored in localstorage

const createElement = (task) => {
  let element = document.createElement("div");
  element.style.cssText = `
  background-color:white;
  display:flex;
  justify-content:space-between;
  align-items:center;
  border-radius:6px;
  padding:10px;
  margin:10px;
  `;
  element.className = "element";
  element.id = Date.now();
  //
  let title = document.createElement("h4");
  title.textContent = input.value == "" ? task.taskname : input.value;
  title.style.cssText = `
  margin-left:5px;
  `;
  //
  let btn = document.createElement("button");
  btn.style.cssText = `
  color:white;
  background-color:red;
  border-radius:6px;
  font-weight:bold;
  border:none;
  padding:10px;
  `;
  btn.textContent = "Delete";
  btn.className = "btn";

  //
  element.append(title, btn);
  tasks.append(element);

  //
  array.push({
    id: element.id,
    taskname: input.value || task.taskname,
  });
  window.localStorage.setItem("tasks", JSON.stringify(array));
  //

  btn.addEventListener("click", (e) => {
    //adding delete function to the delete button
    // let modifiedArray = JSON.parse(localStorage["tasks"]);
    // let id = e.currentTarget.parentElement.id;

    // modifiedArray = modifiedArray.filter((ele) => {
    //   return ele["id"] !== id;
    // });
    // console.log(modifiedArray);
    // e.currentTarget.parentElement.remove();
    // localStorage.setItem("tasks", JSON.stringify(modifiedArray));

    array = array.filter(
      (element) => element.id !== `${e.currentTarget.parentElement.id}` //shorter method
    );
    window.localStorage.setItem("tasks", JSON.stringify(array));
    e.currentTarget.parentElement.remove();
  });
};

submit.addEventListener("click", () => {
  if (input.value != "") {
    createElement();
    input.value = "";
  }
});

// // // // // // // // // // // // // // // // // // //
let night = document.querySelector(".container i:first-child");
let sun = document.querySelector(".container i:nth-child(2)");

window.onload = () => {
  if (localStorage.getItem("tasks") != null) {
    let elements = JSON.parse(localStorage.getItem("tasks"));

    elements.forEach((element) => {
      createElement(element);
    });
  }

  /////////////////////////////////////////////////////////////////
  if (sessionStorage.getItem("color") != null) {
    document.body.style.background = sessionStorage.getItem("color");
    if (sessionStorage.getItem("color") == "white") {
      night.style.display = "block";
      sun.style.display = "none";
    } else {
      night.style.display = "none";
      sun.style.display = "block";
    }
  }
};

night.onclick = () => {
  document.body.style.background = "#777";
  night.style.display = "none";
  sun.style.display = "block";
  sessionStorage.setItem("color", "#777");
};

sun.onclick = () => {
  document.body.style.background = "white";
  night.style.display = "block";
  sun.style.display = "none";
  sessionStorage.setItem("color", "white");
};
