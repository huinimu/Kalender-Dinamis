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

//default
const eventArr = [
  {
    day: 14,
    month: 9,
    year: 2026,
    events: [
      {
        title: "Event 1 lorem ipsum dolor set",
        time: "10:00 AM",
      },
      {
        title: "Event 2",
        time: "11:00 AM",
      },
    ],
  },
  {
    day: 16,
    month: 9,
    year: 2026,
    events: [
      {
        title: "Event 1 lorem ipsum dolor set",
        time: "10:00 AM",
      },
      {
        title: "Event 2",
        time: "11:00 AM",
      },
    ],
  },
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
    //check event hari yang di klik

    let event = false;
    eventArr.forEach((eventObj) => {
      if (
        eventObj.day == i &&
        eventObj.month == month + 1 &&
        eventObj.year == year
      ) {
        event = true;
      }
    });

    //kalau day adalah today tambah class today
    if (
      i == new Date().getDate() &&
      year == new Date().getFullYear() &&
      month == new Date().getMonth()
    ) {
      // if event found tambah event class
      if (event) {
        days += `<div class="day today event" >${i}</div>`;
      } else {
        days += `<div class="day today">${i}</div>`;
      }
    }
    // sisanya
    else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day">${i}</div>`;
      }
    }
  }

  //month n day selanjutnya
  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  // balik ka kondisi awal/default
  addListner();
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

const addEventBtn = document.querySelector(".add-event"),
  addEventContainer = document.querySelector(".add-event-wrapper"),
  addEventCloseBtn = document.querySelector(".close"),
  addEventTitle = document.querySelector(".event-name"),
  addEventFrom = document.querySelector(".event-time-from"),
  addEventTo = document.querySelector(".event-time-to");

addEventBtn.addEventListener("click", () => {
  addEventContainer.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
  addEventContainer.classList.remove("active");
});

document.addEventListener("click", (e) => {
  //click diluar wrapper
  if (e.target != addEventBtn && !addEventContainer.contains(e.target)) {
    addEventContainer.classList.remove("active");
  }
});

// hanya 50 char
addEventTitle.addEventListener("input", (e) => {
  addEventTitle.value = addEventTitle.value.slice(0, 50);
});

// format waktu

addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  //sedtelah 2 char tambahkan :
  if (addEventFrom.value.length == 2) {
    addEventFrom.value += ":";
  }
  // tidak bisa lebih dari 5 char
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});
//to time
addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  //sedtelah 2 char tambahkan :
  if (addEventTo.value.length == 2) {
    addEventTo.value += ":";
  }
  // tidak bisa lebih dari 5 char
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});


// tambah event
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      // hari menjadi aktif
      activeDay = Number(e.target.innerHTML);

      // 
      days.forEach((day) => {
        day.classList.remove("active");
      });

      // menambahkan aktif di bulan sebelumnya
      if(e.target.classList.contains("prev-date")) {
        prevMonth();

        setTimeout(() => {
          // select class day
          const days = document.querySelectorAll(".day");

          days.forEach((day) => {
            if(
              !day.classList.contains("prev-date") &&
              day.innerHTML == e.target.innerHTML
            ) {
              day.classList.add("active");
            }
        });
      });
    }
  });
});
}