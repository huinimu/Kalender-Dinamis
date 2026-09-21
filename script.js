/* ================================================= */
/*                 ELEMENT CALENDAR                  */
/* ================================================= */
// meta
const calendar = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const todayBtn = document.querySelector(".today-btn");
const gotoBtn = document.querySelector(".goto-btn");
const dateInput = document.querySelector(".date-input");
const eventDay = document.querySelector(".event-day");
const eventDate = document.querySelector(".event-date");
const eventsContainer = document.querySelector(".events");

/* ================================================= */
/*                  EVENT POPUP                      */
/* ================================================= */
// yuni
const addEventBtn = document.querySelector(".add-event");
const addEventContainer = document.querySelector(".add-event-wrapper");
const addEventCloseBtn = document.querySelector(".close");
const addEventTitle = document.querySelector(".event-name");
const addEventSubmit = document.querySelector(".add-event-btn");

/* ================================================= */
/*                  TIME ELEMENT                     */
/* ================================================= */
// yuni
const hourDisplay = document.querySelector("#hour-display");
const minuteDisplay = document.querySelector("#minute-display");
const periodDisplay = document.querySelector("#period-display");
const hourOptions = document.querySelector("#hour-options");
const minuteOptions = document.querySelector("#minute-options");
const periodOptions = document.querySelector("#period-options");
const selectedTimeText = document.querySelector("#selected-time-text");

/* ================================================= */
/*                    DATE                           */
/* ================================================= */
//meta
let today = new Date();
let activeDay = today.getDate();
let month = today.getMonth();
let year = today.getFullYear();

/* ================================================= */
/*                   MONTHS                          */
/* ================================================= */
// meta
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
    "December"
];

/* ================================================= */
/*                EVENT DATA                         */
/* ================================================= */
// yuni
// menyimpan data
let eventArr = [];
let editingEventIndex = null;

/* ================================================= */
/*              LOAD LOCAL STORAGE                   */
/* ================================================= */
// yuni
// tersimpan di browser
function getEvents() {
    const savedEvents = localStorage.getItem("events");
    if (savedEvents) {
        try {
            eventArr = JSON.parse(savedEvents); //mengubah dat jadi js
        } catch (error) {
            eventArr = [];
        }
    }
}

/* ================================================= */
/*               SAVE EVENT                          */
/* ================================================= */
// yuni
function saveEvents() {
    localStorage.setItem(
        "events",
        JSON.stringify(eventArr) //menguabh ke json
    );
}

/* ================================================= */
/*                TIME DATA                          */
/* ================================================= */
// yuni
let selectedHour = "12";
let selectedMinute = "00";
let selectedPeriod = "AM";

/* ================================================= */
/*             CREATE HOUR OPTIONS                   */
/* ================================================= */
// yuni
function createHourOptions() {
    hourOptions.innerHTML = "";
    for (let i = 1; i <= 12; i++) {
        let hour = String(i).padStart(2, "0");
        const button = document.createElement("button");
        button.className = "time-option";
        button.textContent = hour;
        button.dataset.value = hour;
        if (hour === selectedHour) {
            button.classList.add("selected");
        }
        button.addEventListener("click", function () {
            selectedHour = this.dataset.value;
            hourDisplay.textContent = selectedHour;
            updateSelectedTime();
            updateSelectedClass(hourOptions, selectedHour);
            hourOptions.classList.remove("active");
            hourDisplay.classList.remove("active");
        });
        hourOptions.appendChild(button);
    }
}

/* ================================================= */
/*             CREATE MINUTE OPTIONS                 */
/* ================================================= */
// yuni
function createMinuteOptions() {
    minuteOptions.innerHTML = "";
    for (let i = 0; i < 60; i++) {
        let minute = String(i).padStart(2, "0");
        const button = document.createElement("button");
        button.className = "time-option";
        button.textContent = minute;
        button.dataset.value = minute;
        if (minute === selectedMinute) {
            button.classList.add("selected");
        }
        button.addEventListener("click", function () {
            selectedMinute = this.dataset.value;
            minuteDisplay.textContent = selectedMinute;
            updateSelectedTime();
            updateSelectedClass(
                minuteOptions,
                selectedMinute
            );
            minuteOptions.classList.remove("active");
            minuteDisplay.classList.remove("active");
        });
        minuteOptions.appendChild(button);
    }
}

/* ================================================= */
/*             PERIOD OPTIONS                       */
/* ================================================= */
// yuni
function createPeriodOptions() {
    const buttons =
        periodOptions.querySelectorAll("button");
    buttons.forEach(button => {
        if (button.dataset.value === selectedPeriod) {
            button.classList.add("selected");
        }
        button.addEventListener("click", function () {
            selectedPeriod = this.dataset.value;
            periodDisplay.textContent =
                selectedPeriod;
            updateSelectedTime();
            buttons.forEach(btn => {
                btn.classList.remove("selected");
            });
            this.classList.add("selected");
            periodOptions.classList.remove("active");
            periodDisplay.classList.remove("active");
        });
    });
}

/* ================================================= */
/*          UPDATE SELECTED TIME                     */
/* ================================================= */
// yuni
function updateSelectedTime() {
    selectedTimeText.textContent =
        selectedHour +
        ":" +
        selectedMinute +
        " " +
        selectedPeriod;
}

/* ================================================= */
/*          UPDATE SELECTED CLASS                    */
/* ================================================= */
// yuni
function updateSelectedClass(container, value) {
    const buttons =
        container.querySelectorAll(".time-option");
    buttons.forEach(button => {
        button.classList.remove("selected");
        if (button.dataset.value === value) {
            button.classList.add("selected");
        }
    });
}

/* ================================================= */
/*               TIME DISPLAY CLICK                  */
/* ================================================= */
// yuni
hourDisplay.addEventListener("click", function (e) {
    e.stopPropagation();
    closeTimeOptions();
    hourOptions.classList.toggle("active");
    hourDisplay.classList.toggle("active");
});
minuteDisplay.addEventListener("click", function (e) {
    e.stopPropagation();
    closeTimeOptions();
    minuteOptions.classList.toggle("active");
    minuteDisplay.classList.toggle("active");
});
periodDisplay.addEventListener("click", function (e) {
    e.stopPropagation();
    closeTimeOptions();
    periodOptions.classList.toggle("active");
    periodDisplay.classList.toggle("active");
});

/* ================================================= */
/*             CLOSE TIME OPTIONS                    */
/* ================================================= */
// yuni
function closeTimeOptions() {
    hourOptions.classList.remove("active");
    minuteOptions.classList.remove("active");
    periodOptions.classList.remove("active");
    hourDisplay.classList.remove("active");
    minuteDisplay.classList.remove("active");
    periodDisplay.classList.remove("active");
}

/* ================================================= */
/*              CLICK OUTSIDE TIME                   */
/* ================================================= */
// yuni
document.addEventListener("click", function () {
    closeTimeOptions();
});

/* ================================================= */
/*             CALENDAR FUNCTION                     */
/* ================================================= */
// meta
function initCalendar() {
    const firstDay =
        new Date(year, month, 1);

    const lastDay =
        new Date(year, month + 1, 0);

    const prevLastDay =
        new Date(year, month, 0);

    const prevDays =
        prevLastDay.getDate();

    const lastDate =
        lastDay.getDate();

    const day =
        firstDay.getDay();

    const nextDays =
        7 - lastDay.getDay() - 1;

    date.innerHTML =
        months[month] +
        " " +
        year;
    let days = "";
    /* ================= PREVIOUS MONTH ================= */
    // meta
    for (let x = day; x > 0; x--) {
        days += `
            <div class="day prev-date">
                ${prevDays - x + 1}
            </div>
        `;
    }
    /* ================= CURRENT MONTH ================= */
    // yuni
    for (let i = 1; i <= lastDate; i++) {
        let event = false;
        eventArr.forEach(eventObj => {
            if (
                eventObj.day == i &&
                eventObj.month == month + 1 &&
                eventObj.year == year
            ) {
                event = true;
            }
        });
        const isToday =
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth();

        if (isToday) {
            activeDay = i;
            if (event) {
                days += `
                    <div class="day today active event">
                        ${i}
                    </div>
                `;
            } else {
                days += `
                    <div class="day today active">
                        ${i}
                    </div>
                `;
            }
        } else {
            if (event) {
                days += `
                    <div class="day event">
                        ${i}
                    </div>
                `;
            } else {
                days += `
                    <div class="day">
                        ${i}
                    </div>
                `;
            }
        }
    }
    /* ================= NEXT MONTH ================= */
    // meta
    for (let j = 1; j <= nextDays; j++) {
        days += `
            <div class="day next-date">
                ${j}
            </div>
        `;
    }
    daysContainer.innerHTML = days;
    addListeners();
    getActiveDay(activeDay);
    updateEvents(activeDay);
}

/* ================================================= */
/*                PREVIOUS MONTH                     */
/* ================================================= */
// meta
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    activeDay = 1;
    initCalendar();
}

/* ================================================= */
/*                  NEXT MONTH                       */
/* ================================================= */
// meta
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    activeDay = 1;
    initCalendar();
}
prev.addEventListener(
    "click",
    prevMonth
);
next.addEventListener(
    "click",
    nextMonth
);

/* ================================================= */
/*                    TODAY                          */
/* ================================================= */
// meta
todayBtn.addEventListener("click", function () {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    activeDay = today.getDate();
    initCalendar();
});

/* ================================================= */
/*                  GO TO DATE                       */
/* ================================================= */
// meta
dateInput.addEventListener("input", function () {
    dateInput.value =
        dateInput.value.replace(
            /[^0-9/]/g,
            ""
        );
    if (
        dateInput.value.length === 2
    ) {
        dateInput.value += "/";
    }
    if (
        dateInput.value.length > 7
    ) {
        dateInput.value =
            dateInput.value.slice(0, 7);
    }


});
gotoBtn.addEventListener(
    "click",
    gotoDate
);
function gotoDate() {
    const dateArr =
        dateInput.value.split("/");
    if (
        dateArr.length === 2 &&
        dateArr[0] > 0 &&
        dateArr[0] < 13 &&
        dateArr[1].length === 4
    ) {
        month =
            Number(dateArr[0]) - 1;
        year =
            Number(dateArr[1]);
        activeDay = 1;
        initCalendar();
        return;
    }
    alert("Invalid Date!");
}

/* ================================================= */
/*              DAY LISTENER                         */
/* ================================================= */
// meta
function addListeners() {
    const days =
        document.querySelectorAll(".day");
    days.forEach(day => {
        day.addEventListener(
            "click",
            function (e) {
                const clickedDay =
                    Number(e.target.textContent.trim());
                /* PREVIOUS MONTH */
                if (
                    e.target.classList.contains(
                        "prev-date"
                    )
                ) {
                    prevMonth();
                    activeDay = clickedDay;
                    initCalendar();
                    setActiveDay();
                    return;
                }
                /* NEXT MONTH */
                if (
                    e.target.classList.contains(
                        "next-date"
                    )
                ) {
                    nextMonth();
                    activeDay = clickedDay;
                    initCalendar();
                    setActiveDay();
                    return;
                }
                /* CURRENT MONTH */
                activeDay = clickedDay;
                setActiveDay();
            }
        );
    });
}

/* ================================================= */
/*             SET ACTIVE DAY                        */
/* ================================================= */
// meta
function setActiveDay() {
    const days =
        document.querySelectorAll(".day");
    days.forEach(day => {
        day.classList.remove("active");
    });
    days.forEach(day => {
        if (
            Number(
                day.textContent.trim()
            ) === activeDay &&
            !day.classList.contains(
                "prev-date"
            ) &&
            !day.classList.contains(
                "next-date"
            )
        ) {
            day.classList.add("active");
        }
    });
    getActiveDay(activeDay);
    updateEvents(activeDay);
}

/* ================================================= */
/*             GET ACTIVE DAY                        */
/* ================================================= */
// meta
function getActiveDay(dayNumber) {
    const selectedDate =
        new Date(
            year,
            month,
            dayNumber
        );
    const dayName =
        selectedDate.toString().split(" ")[0];

    eventDay.innerHTML =
        dayName;

    eventDate.innerHTML =
        dayNumber +
        " " +
        months[month] +
        " " +
        year;
}

/* ================================================= */
/*              UPDATE EVENTS                       */
/* ================================================= */
// yuni
// mengecek tanggal,bulan,tahun
function updateEvents(dayNumber) {
    let events = "";
    eventArr.forEach(
        (eventObj, index) => {
            if (
                Number(eventObj.day) ===
                    Number(dayNumber) &&

                Number(eventObj.month) ===
                    Number(month + 1) &&

                Number(eventObj.year) ===
                    Number(year)
            ) {
                eventObj.events.forEach( //jika berhasil
                    (event, eventIndex) => {
                        events += `
                            <div class="event">
                                <div class="title">
                                    <i class="fas fa-circle"></i>
                                    <h3 class="event-title">
                                        ${event.title}
                                    </h3>
                                </div>
                                <div class="event-time">
                                    ${event.time}
                                </div>
                                <div class="event-actions">
                                    <button
                                        class="edit-event"
                                        data-event-index="${eventIndex}"
                                        data-main-index="${index}">
                                        Edit
                                    </button>
                                    <button
                                        class="delete-event"
                                        data-event-index="${eventIndex}"
                                        data-main-index="${index}">
                                        Hapus
                                    </button>
                                </div>
                            </div>
                        `;
                    }
                );
            }
        }
    );
    if (events === "") { //tidak ada event
        events = `
            <div class="no-event">
                <h3>
                    Tidak Ada Acara
                </h3>
            </div>
        `;
    }
    eventsContainer.innerHTML = events; //menampilkan ke html
}

/* ================================================= */
/*              OPEN ADD EVENT                       */
/* ================================================= */
// yuni
addEventBtn.addEventListener(
    "click",
    function (e) {
        e.stopPropagation();
        editingEventIndex = null;
        addEventContainer.classList.remove(
            "edit-mode"
        );
        document.querySelector(
            ".add-event-header .title"
        ).textContent = "Add Event";

        addEventSubmit.textContent = "Add";

        resetForm();

        addEventContainer.classList.toggle(
            "active"
        );
    }
);

/* ================================================= */
/*              CLOSE EVENT POPUP                    */
/* ================================================= */
// yuni
addEventCloseBtn.addEventListener(
    "click",
    function () {
        closeEventPopup();
    }
);
function closeEventPopup() {
    addEventContainer.classList.remove(
        "active"
    );

    addEventContainer.classList.remove(
        "edit-mode"
    );
    closeTimeOptions();
    editingEventIndex = null;
}

/* ================================================= */
/*             RESET FORM                            */
/* ================================================= */
// yuni
function resetForm() {
    addEventTitle.value = "";
    selectedHour = "12";
    selectedMinute = "00";
    selectedPeriod = "AM";

    hourDisplay.textContent =
        selectedHour;

    minuteDisplay.textContent =
        selectedMinute;

    periodDisplay.textContent =
        selectedPeriod;

    updateSelectedTime();
    createHourOptions();
    createMinuteOptions();
    createPeriodOptions();
}

/* ================================================= */
/*               ADD EVENT                           */
/* ================================================= */
// yuni
addEventSubmit.addEventListener(
    "click",
    function () {
        const title =
            addEventTitle.value.trim();

        if (title === "") {
            alert(
                "Please enter event name."
            );
            return;
        }
        const time =
            selectedHour +
            ":" +
            selectedMinute +
            " " +
            selectedPeriod;
        /* ================= EDIT ================= */
        if (
            editingEventIndex !== null
        ) {
            const mainIndex =
                editingEventIndex.mainIndex;

            const eventIndex =
                editingEventIndex.eventIndex;

            eventArr[
                mainIndex
            ].events[
                eventIndex
            ].title = title;

            eventArr[
                mainIndex
            ].events[
                eventIndex
            ].time = time;

            saveEvents();
            updateEvents(activeDay);
            initCalendar();
            closeEventPopup();
            return;
        }
        /* ================= ADD ================= */
        let eventAdded = false;
        eventArr.forEach(
            eventObj => {
                if (
                    Number(eventObj.day) ===
                        Number(activeDay) &&

                    Number(eventObj.month) ===
                        Number(month + 1) &&

                    Number(eventObj.year) ===
                        Number(year)
                ) {
                    eventObj.events.push({
                        title: title,
                        time: time
                    });
                    eventAdded = true;
                }
            }
        );
        if (!eventAdded) {
            eventArr.push({
                day: activeDay,
                month: month + 1,
                year: year,
                events: [

                    {
                        title: title,
                        time: time
                    }
                ]
            });
        }
        saveEvents();
        closeEventPopup();
        initCalendar();
    }
);

/* ================================================= */
/*                EDIT EVENT                         */
/* ================================================= */
// yuni
eventsContainer.addEventListener(
    "click",
    function (e) {
        /* ================= EDIT ================= */
        if (
            e.target.classList.contains(
                "edit-event"
            )
        ) {
            const mainIndex =
                Number(
                    e.target.dataset.mainIndex
                );

            const eventIndex =
                Number(
                    e.target.dataset.eventIndex
                );

            const event =
                eventArr[
                    mainIndex
                ].events[
                    eventIndex
                ];

            editingEventIndex = {

                mainIndex:
                    mainIndex,

                eventIndex:
                    eventIndex
            };
            /* ISI DATA EVENT */
            addEventTitle.value =
                event.title;

            const timeParts =
                event.time.split(" ");

            const time =
                timeParts[0];

            const period =
                timeParts[1];

            const timeArr =
                time.split(":");

            selectedHour =
                timeArr[0];

            selectedMinute =
                timeArr[1];

            selectedPeriod =
                period;

            hourDisplay.textContent =
                selectedHour;

            minuteDisplay.textContent =
                selectedMinute;

            periodDisplay.textContent =
                selectedPeriod;

            updateSelectedTime();

            createHourOptions();

            createMinuteOptions();

            createPeriodOptions();
            /* ================= POPUP TENGAH ================= */
            addEventContainer.classList.add(
                "active"
            );
            addEventContainer.classList.add(
                "edit-mode"
            );
            document.querySelector(
                ".add-event-header .title"
            ).textContent =
                "Edit Event";
            addEventSubmit.textContent =
                "Save";
        }
        /* ================= DELETE ================= */
        if (
            e.target.classList.contains(
                "delete-event"
            )
        ) {
            const mainIndex =
                Number(
                    e.target.dataset.mainIndex
                );
            const eventIndex =
                Number(
                    e.target.dataset.eventIndex
                );
            eventArr[
                mainIndex
            ].events.splice(
                eventIndex,
                1
            );
            if (
                eventArr[
                    mainIndex
                ].events.length === 0 //mengetahui jumlah data
            ) {
                eventArr.splice(
                    mainIndex,
                    1
                );
            }
            saveEvents();
            initCalendar();
        }
    }
);

/* ================================================= */
/*                INITIALIZE                         */
/* ================================================= */
getEvents();

createHourOptions();

createMinuteOptions();

createPeriodOptions();

updateSelectedTime(); //update tampilan waktu yg dipilih

initCalendar();