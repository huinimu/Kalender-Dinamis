const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventSubmit = document.querySelector(".add-event-btn");

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

//array kosong
let eventArr = [];
getEvents();

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

    activeDay = i;  
    getActiveDay(i);
    updateEvents(i);
    

      // if event found tambah event class
      // tambah active ke hari ini
      if (event) {
        days += `<div class="day today active event" >${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
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
  initCalendar();
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

      // panggil active day setelah click
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));

      //  hapus active dari hari yamg sudah aktif
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
      }, 100);
      //aktif di bulan selanjutnya
    } else if(e.target.classList.contains("next-date")) {
        nextMonth();

        setTimeout(() => {
          // select class day
          const days = document.querySelectorAll(".day");

          days.forEach((day) => {
            if(
              !day.classList.contains("next-date") &&
              day.innerHTML == e.target.innerHTML
            ) {
              day.classList.add("active");
            }
        });
      }, 100);
    }
    else{
      //month day saat ini
      e.target.classList.add("active");
    }
  });
});
}

// tampilkan active day dan event diatas
     
function getActiveDay(date){
  const day = new Date (year , month , date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month]+ " " + year;

}

//munculkan event hari yang di klik

function updateEvents(date){
  let events = "";
  eventArr.forEach((event) =>{
    //hanya event active day
    if(
      date == event.day &&
      month + 1 == event.month &&
      year == event.year
    ){

      // munculkan event di document
      event.events.forEach((event) => {
        events += `
        <div class="event">
          <div class="title">
            <i class="fas fa-circle"></i>
            <h3 class="event-title">${event.title}</h3>
          </div>
          <div class="event-time">
            <span class="event-time">${event.time}</span>
          </div>
        </div>
        `;
      });
    }
  });

  // kalau tidak ada event
  if(events == ""){
    events = `<div class="no-event">
                <h3> Tidak Ada Acara </h3>
              </div>`;
  }
  eventsContainer.innerHTML = events;
  // simpan kalau ditambah
  saveEvents();
}

// tambah event

addEventSubmit.addEventListener("click", () =>{
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;

  //validasi
  if(eventTitle == "" || eventTimeFrom == "" || eventTimeTo == ""){
    alert("Please fill all the fields");
    return;
  }

  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");

  if(timeFromArr.length != 2 || timeToArr.length != 2 ||timeFromArr[0] > 23 || timeFromArr[1] > 59 || timeToArr[0] > 23 || timeToArr[1] > 59){
    alert("Invalid Time Format");
    return;
  }

  const timeFrom = convertTime (eventTimeFrom);
  const timeTo = convertTime (eventTimeTo);

  const newEvent = {
    title : eventTitle,
    time : timeFrom + " - " + timeTo,
  };

  let eventAdded = false;

  // cek kalau eventarr tidak kosong
  if(eventArr. length > 0){
    // cek kalau hari sudah puna event lalu tambahkan event
    eventArr.forEach((item) =>{
      if(
        item.day == activeDay &&
        item.month == month + 1 &&
        item.year == year
      ){
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
    }

    // kalau hari tidak ada event buat event baru
    if(!eventAdded){
      eventArr.push({
        day: activeDay,
        month: month + 1,
        year: year,
        events: [newEvent],
      });
    }

    // hapus active dari add event form
    addEventContainer.classList.remove("active")
    addEventTitle.value="";
    addEventFrom.value="";
    addEventTo.value="";

    // tampilkan added event 
    updateEvents(activeDay);
    
    //tambah class event ke tanggal yang punya event
    const activeDayElem = document.querySelector(".day.active");
    if(!activeDayElem.classList.contains("event")){
      activeDayElem.classList.add("event");
    }
  });

function convertTime(time){
  let timeArr = time.split(":");
  let timeHour = timeArr[0];
  let timeMin = timeArr[1];

  let timeFormat = timeHour >= 12 ? "PM" : "AM";
  timeHour = timeHour % 12 || 12;

  return timeHour + ":" + timeMin + " " + timeFormat;
}

// hapus event

eventsContainer.addEventListener("click", (e) => {
  if(e.target.classList.contains("event")){
    const eventTitle = e.target.children[0].children[1].innerHTML;

    eventArr.forEach((event) =>{
      if(
        event.day == activeDay &&
        event.month == month + 1 &&
        event.year == year
      ){
        event.events.forEach((item,index) => {
          if (item.title == eventTitle){
            event.events.splice(index, 1);
          }
        });

        //hapus class event kalau sudah tidak ada event

        if(event.events.length == 0){
          eventArr.splice(eventArr.indexOf(event),1);

          const activeDayElem = document.querySelector(".day.active");
          if (activeDayElem.classList.contains("event")){
            activeDayElem.classList.remove("event");
          }
        }
      }
    });
    //setelah hapus , update
    updateEvents(activeDay);
  }
  });


  // LOCAL STORAGE

  function saveEvents(){
    localStorage.setItem("events", JSON.stringify(eventArr));
  }

  function getEvents(){
    if(localStorage.getItem("events" == null)){
      return;
    }
    eventArr.push(...JSON.parse(localStorage.getItem("events")));
  }