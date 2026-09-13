const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev");
((next = document.querySelector(".next")),
  (todayBtn = document.querySelector(".today-btn")),
  (gotoBtn = document.querySelector(".goto-btn")),
  (dateInput = document.querySelector(".date-input")));

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// function hari

function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  //update bulan n tanggal
  date.innerHTML = months[month] + " " + year;

  //adding days di dom
  let days = "";

  //prev month n days
  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  //month n day
  for (let i = 1; i <= lastDate; i++) {
    //kalau day adalah today tambah class today
    if (
      i == new Date().getDate() &&
      year == new Date().getFullYear() &&
      month == new Date().getMonth()
    ) {
      days += `<div class="day today">${i}</div>`;
    }
    // tanggal sisanya
    else {
      days += `<div class="day">${i}</div>`;
    }
  }
  //month n day selanjutnya
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
}

initCalendar();

//prev month
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

//next month
function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

// eventListener

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

//done
//goto date n goto today

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar;
});

dateInput.addEventListener("input", (e) => {
  //hanya bisa input angka
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length == 2) {
    // tambah slash if two number enter
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    //tidak bisa lebih dari 7 char
    dateInput.value = dateInput.value.slice(0, 7);
  }

  if (e.inputType == "deleteContentBackward") {
    if (dateInput.value.length == 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

//mengarah ke tanggal yang diinput

function gotoDate() {
  const dateArr = dateInput.value.split("/");
  if (dateArr.length == 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length == 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date!");
}
