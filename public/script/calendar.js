// calendar
const currDate = document.querySelector(".current-date");
const days = document.querySelector(".days");

let date = new Date();
currYear = date.getFullYear();
currMonth = date.getMonth();

const months = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  " July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// to check if the date function is working in the console


function renderCalendar() {
  console.log("checkdate ", date, currYear, currMonth);
  let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  console.log(lastDateofMonth);
  // put out all the date in the month to a tag
  days.innerHTML = "";
  for (let i = 0; i <= lastDateofMonth; i++) {
    const li = document.createElement("li");
    li.textContent = i;
    days.appendChild(li);
  }
  currDate.querySelector("p").innerText = `${months[currMonth]}`;
  currDate.querySelector("span").innerText = `${currYear}`;
  console.log(days);
}

function checkMonth() {
  if (currMonth < 0 || currMonth > 11) {
    date = new Date(currYear, currMonth, new Date().getDate());
    currYear = date.getFullYear();
    currMonth = date.getMonth();
  }
  else {
    date = new Date();
  }
}

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
console.log(prev);
console.log(next);

prev.addEventListener("mouseover", () => {
  prev.style.backgroundColor = "white";
  prev.style.color = "black";
});

prev.addEventListener("mouseout", () => {
  prev.style.backgroundColor = "";
  prev.style.color = "";
});

prev.addEventListener("click", () => {
  currMonth -= 1;
  checkMonth();
  renderCalendar();
});

next.addEventListener("mouseover", () => {
  next.style.backgroundColor = "white";
  next.style.color = "black";
});

next.addEventListener("mouseout", () => {
  next.style.backgroundColor = "";
  next.style.color = "";
});

next.addEventListener("click", () => {
  currMonth += 1;
  checkMonth();
  renderCalendar();
});

// for the key on the keyboard
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    // Handle left arrow key (previous month)
    currMonth -= 1;
    checkMonth();
    renderCalendar();
  } else if (event.key === "ArrowRight") {
    // Handle right arrow key (next month)
    currMonth += 1;
    checkMonth();
    renderCalendar();
  }
});

console.log("current month " + currMonth);
renderCalendar();
