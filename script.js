
document.getElementById("show-add-box").addEventListener("click", function() {
    const formDivHid = document.getElementById("new-event");
    formDivHid.style.display = "block";
    const showFormBtn=document.getElementById("show-add-box");
    showFormBtn.style.display = "none";
});

const eventForm = document.getElementById("event-form");
const eventsShowBox = document.getElementById("events-show-box"); 



const titleInput = eventForm["title"];
const imageInput = eventForm["image"];
const descriptionInput = eventForm["description"];
const locationInput = eventForm["location"];
const startInputs = eventForm["start-date"];
const endInputs = eventForm["end-date"];

document.addEventListener("DOMContentLoaded", async function () {
    addLocationOneToFilter(); 
    locationFilterForEvents(""); 
    
});

const eventsArray = JSON.parse(localStorage.getItem("eventsArray")) || [];


function eventIdGenerator() {
    return "eventId_" + Date.now();
}; 

function addEvent (title, image, description, location, start, end)  {
    const eventId = eventIdGenerator();
    eventsArray.push({ eventId, title, image, description, location, start, end });
    localStorage.setItem("eventsArray", JSON.stringify(eventsArray));
    addLocationOneToFilter();

    return { eventId, title, image, description, location, start, end };
};


function filterUniqueLocation() {
    
    const locationOne = [] ; 
    eventsArray.forEach(event => {
        if (!locationOne.includes(event.location)) {  
            locationOne.push(event.location); 
        }
    });
    return locationOne;
};
function addLocationOneToFilter()  {
    const locationOne = filterUniqueLocation();
    const selectedFilterLocation = document.getElementById("location-filter");

    selectedFilterLocation.innerHTML = "";

    const filterLocationOptions = document.createElement("option");
    filterLocationOptions.value = "";
    filterLocationOptions.textContent = "🌍";
    selectedFilterLocation.appendChild(filterLocationOptions);

    locationOne.forEach(location => {
        const option = document.createElement("option");
        option.value = location;
        option.textContent = location;
        selectedFilterLocation.appendChild(option);
    });
};
function locationFilterForEvents  (location)  {
    const filteredEvents = location === "" ? eventsArray: eventsArray.filter(event => event.location === location); 
    const eventBox = document.getElementById("events-show-box");
    eventBox.innerHTML = ""; 
    filteredEvents.forEach(event => {
        createEventElement(event);
    });
};
document.getElementById("location-filter").addEventListener("change", (e) => {
    const selectedLocation = e.target.value;
    locationFilterForEvents(selectedLocation);
});






async function deleteOneEvent  (event) {


	const clickToDeleteOneEvent = event.currentTarget;
	const parentElement = clickToDeleteOneEvent.parentElement;
    const Id = parentElement.getAttribute("event-id"); 
    const indexOfEvent = eventsArray.findIndex(event => event.eventId === Id);
    if (indexOfEvent !== -1) {
        eventsArray.splice(indexOfEvent, 1);
    }


    localStorage.setItem("eventsArray", JSON.stringify(eventsArray));
    parentElement.remove();
    if (eventsArray.length === 0) {
        eventsShowBox.style.display = "none";
    } 
    else {
        eventsShowBox.style.display = "flex";
    }

   
    addLocationOneToFilter();
};



function createEventElement ({ eventId, title, image, description, location, start, end }) {
    const eventDiv = document.createElement("div");

    eventDiv.setAttribute("event-id", eventId);
    const eventTitle = document.createElement("p");
    const eventImage = document.createElement("p");
    const eventDescription = document.createElement("p");
    const eventLocation = document.createElement("p");
    const eventStart = document.createElement("p");
    const eventEnd = document.createElement("p");
    const deleteBtn = document.createElement("button");

    deleteBtn.innerText="Delete🗑️"
    deleteBtn.addEventListener("click", deleteOneEvent);
    

   
    const eventImg = document.createElement("img");
    eventImg.src = image;
    eventImg.alt = image; 
    

    eventTitle.innerHTML = "<b>Event name:</b> " + title;
    eventImage.innerHTML = "<b>Image:</b> "; 
    eventDescription.innerHTML = "<b>Description:</b> " + description;
    eventLocation.innerHTML = "<b>Location:</b> " + location;
    eventStart.innerHTML = "<b>Start date:</b> " + start;
    eventEnd.innerHTML = "<b>End date:</b> " + end;
  
    eventDiv.append(eventTitle, eventImage, eventImg, eventDescription, eventLocation, eventStart, eventEnd, deleteBtn);
    eventDiv.setAttribute("class", "eventDiv");

    eventsShowBox.appendChild(eventDiv);

    if (eventsArray.length === 0) {
        eventsShowBox.style.display = "none";
    } else {
        eventsShowBox.style.display = "flex";
    }
};
if (eventsArray.length === 0) {
    eventsShowBox.style.display = "none";
} else {
    eventsShowBox.style.display = "flex";
}

eventsArray.forEach(createEventElement);

eventForm.onsubmit = (e) => {
    e.preventDefault();
    
    if (!startInput.value || !endInput.value) {
        alert("You need to select start and end date!!!");
        return; 
    }
    if (!startDatepicker.classList.contains("datepicker-not-visible") || !endDatepicker.classList.contains("datepicker-not-visible")) {
        alert("You need to save start or end date!!!");
        return; 
    }

    const newEvent = addEvent(titleInput.value, imageInput.value, descriptionInput.value, locationInput.value, startInputs.value, endInputs.value);

    createEventElement(newEvent);
    resetAllInputData();
    
};



const deleteEveryEventBtn = document.getElementById("delete-all");
deleteEveryEventBtn.addEventListener("click", () => {
    eventsArray.length = 0;
    localStorage.setItem("eventsArray", JSON.stringify(eventsArray));
    eventsShowBox.innerHTML = "";
    eventsShowBox.style.display = "none";
    addLocationOneToFilter();
});
function resetAllInputData(){
    titleInput.value = "";
    imageInput.value = "";
    descriptionInput.value = "";
    locationInput.value = "";
    startInputs.value = "";
    endInputs.value = "";
    startDate = new Date();  
    endDate = new Date();  
    showStartDates();      
    showEndDates(); 
}

const datepicker = document.getElementById("datepicker");

const startInput = document.getElementById("start-date");
const startDatepicker = document.getElementById("start-datepicker");
const startNextButton = document.getElementById("start-next-month");
const startPreviousButton = document.getElementById("start-previous-month");
const startMonthInput = document.getElementById("start-input-month");
const startYearInput = document.getElementById("start-input-year");
const startDates = document.getElementById("start-dates-option");
const selectStartDate = document.getElementById("choose-start-date");
const startSaveButton = document.getElementById("start-apply-button");

const endInput = document.getElementById("end-date");
const endDatepicker = document.getElementById("end-datepicker");
const endNextButton = document.getElementById("end-next-month");
const endPreviousButton = document.getElementById("end-previous-month");
const endMonthInput = document.getElementById("end-input-month");
const endYearInput = document.getElementById("end-input-year");
const endDates = document.getElementById("end-dates-option");
const selectEndDate = document.getElementById("choose-end-date");
const endSaveButton = document.getElementById("end-apply-button");


let startDate= new Date(), endDate = new Date(), today = new Date();
let startYear = today.getFullYear();
let startMonth = today.getMonth();
let endYear = today.getFullYear();
let endMonth = today.getMonth();

selectStartDate.addEventListener("click", ()=>{
    startDatepicker.classList.remove("datepicker-not-visible");
    selectStartDate.classList.add("datepicker-not-visible");
    startYear = today.getFullYear();
    startMonth = today.getMonth();
    showStartDates();
});

startNextButton.addEventListener("click", () => {
    startMonth = startMonth + 1;
    if (startMonth == 12) {
        startMonth = 0;
        startYear = startYear + 1;
    }
    showStartDates();
});

startPreviousButton.addEventListener("click", () => {
    startMonth = startMonth - 1;
    if (startMonth == -1) {
        startMonth = 11;
        startYear = startYear - 1;
    }
    showStartDates();
});

startYearInput.addEventListener("change", () => {
    startYear = parseInt(startYearInput.value);
    showStartDates();
});

startMonthInput.addEventListener("change", () => {
    startMonth = parseInt(startMonthInput.value);
    showStartDates();
});


function showStartDates ()  {
    startDates.innerHTML = "";
   
    startMonthInput.value = startMonth;
    startYearInput.value = startYear;

    const lastDayOfPreviousMonth = new Date(startYear, startMonth, 0);
    for (let i = 1; i <= lastDayOfPreviousMonth.getDay(); i++) {
        const dan = lastDayOfPreviousMonth.getDate() - lastDayOfPreviousMonth.getDay() + i;
        const btn = startButtonCreateFunction(dan, true, -1);
        startDates.appendChild(btn);
    }

    const lastDayOfCurrentMonth = new Date(startYear, startMonth + 1, 0);

    for (let i = 1; i <= lastDayOfCurrentMonth.getDate(); i++) {
        const btn = startButtonCreateFunction(i, false, 0);
        btn.addEventListener("click", handleDateButtonOnClick);
        startDates.appendChild(btn);
    }

    for (let i = lastDayOfCurrentMonth.getDay(); i < 7; i++) {
        const btn = startButtonCreateFunction(i - lastDayOfCurrentMonth.getDay() + 1, true, 1);
        startDates.appendChild(btn);
    }
};

function startButtonCreateFunction (txt, isDisabled, prevNextMonth) {
    const btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.textContent = txt;
    btn.disabled = isDisabled;

    let comparasionDate = new Date();
    const currentDate = new Date();

    if (prevNextMonth < 0) {
        btn.classList.add("previous");
        comparasionDate = new Date(startYear, startMonth - 1, txt);
    }
    if (prevNextMonth > 0) {
        btn.classList.add("next");
        comparasionDate = new Date(startYear, startMonth + 1, txt);
    }
    if (currentDate.getFullYear() === startYear && currentDate.getMonth() === startMonth && currentDate.getDate() === txt) {
        btn.classList.add("today");
    }

    if (startDate.getFullYear() == startYear && startDate.getMonth() == startMonth && startDate.getDate() == txt ) {
        btn.classList.add("selected");
    }

    if (currentDate > comparasionDate) {
        btn.disabled = true;
    }
    return btn;
};

function handleDateButtonOnClick (event) {
    const btn = event.target;
    const selected = startDates.querySelectorAll(".selected");
    let selectedDate = new Date(startYear, startMonth, parseInt(btn.textContent));

    selected.forEach(element => {
        element.classList.remove("selected");
        if (element.classList.contains("today")) {
            element.classList.remove("selected");
            element.style.backgroundColor = "rgb(220, 40, 40)"; 
        }
    });
       
    startDate= selectedDate;
    startInput.value = startDate.toDateString();

    btn.classList.add("selected");
    if (btn.classList.contains("today")) {
        btn.classList.add("selected");
        btn.style.backgroundColor = "black";  
    }
    startSaveButton.removeAttribute("disabled");
};

startSaveButton.addEventListener("click", () =>{
    selectEndDate.removeAttribute("disabled");
    startDatepicker.classList.add("datepicker-not-visible");
    selectStartDate.classList.remove("datepicker-not-visible");

    endDate = new Date();
    endInput.value = "";
});



selectEndDate.addEventListener("click", ()=>{
    endDatepicker.classList.remove("datepicker-not-visible");
    selectEndDate.classList.add("datepicker-not-visible");
    endYear = today.getFullYear();
    endMonth = today.getMonth();
    showEndDates();
});

endNextButton.addEventListener("click", () => {
    endMonth = endMonth + 1;
    if (endMonth == 12) {
        endMonth = 0;
        endYear = endYear + 1;
    }
    showEndDates();
});

endPreviousButton.addEventListener("click", () => {
    endMonth = endMonth - 1;
    if (endMonth == -1) {
        endMonth = 11;
        endYear = endYear - 1;
    }
    showEndDates();
});

endYearInput.addEventListener("change", () => {
    endYear = parseInt(endYearInput.value);
    showEndDates();
});

endMonthInput.addEventListener("change", () => {
    endMonth = parseInt(endMonthInput.value);
    showEndDates();
});


function showEndDates  () {
    endDates.innerHTML = "";
   
    endMonthInput.value = endMonth;
    endYearInput.value = endYear;

    const lastDayOfPreviousMonth = new Date(endYear, endMonth, 0);
    for (let i = 1; i <= lastDayOfPreviousMonth.getDay(); i++) {
        const dan = lastDayOfPreviousMonth.getDate() - lastDayOfPreviousMonth.getDay() + i;
        const btn = endButtonCreateFunction(dan, true, -1);
        endDates.appendChild(btn);
    }

    const lastDayOfCurrentMonth = new Date(startYear, startMonth + 1, 0);

    for (let i = 1; i <= lastDayOfCurrentMonth.getDate(); i++) {
        const btn = endButtonCreateFunction(i, false, 0);
        btn.addEventListener("click", handleEndDateButtonOnClick);
        endDates.appendChild(btn);
    }

    for (let i = lastDayOfCurrentMonth.getDay(); i < 7; i++) {
        const btn = endButtonCreateFunction(i - lastDayOfCurrentMonth.getDay() + 1, true, 1);
        endDates.appendChild(btn);
    }
};

function endButtonCreateFunction (txt, isDisabled, prevNextMonth) {
    const btn = document.createElement("button");
    btn.setAttribute("type", "button");
    btn.textContent = txt;
    btn.disabled = isDisabled;

    let comparasionDate = new Date();
    const currentDate = new Date();

    if (new Date(endYear, endMonth, txt) < startDate) {
        btn.disabled = true;
        return btn;
    }

    if (prevNextMonth < 0) {
        btn.classList.add("previous");
        comparasionDate = new Date(endYear, endMonth - 1, txt);
    }
    if (prevNextMonth > 0) {
        btn.classList.add("next");
        comparasionDate = new Date(endYear, endMonth + 1, txt);
    }
    if (currentDate.getFullYear() === endYear && currentDate.getMonth() === endMonth && currentDate.getDate() === txt) {
        btn.classList.add("today");

    }


    if (endDate.getFullYear() == endYear && endDate.getMonth() == endMonth && endDate.getDate() == txt ) {
        btn.classList.add("selected");
    }

    if (currentDate > comparasionDate) {
        btn.disabled = true;
    }
    return btn;
};

function handleEndDateButtonOnClick (event)  {
    const btn = event.target;
    const selected = endDates.querySelectorAll(".selected");
    
    
    selected.forEach(element => {
        element.classList.remove("selected");
        if (element.classList.contains("today")) {
            element.style.backgroundColor = "rgb(220, 40, 40)"; 
        }
    });
         
    
    let selectedDate = new Date(endYear, endMonth, parseInt(btn.textContent));
    endDate = selectedDate;
    endInput.value = endDate.toDateString();
    btn.classList.add("selected");
    if (btn.classList.contains("today")) {
        btn.style.backgroundColor = "black"; 
    }
    endSaveButton.removeAttribute("disabled");
};



endSaveButton.addEventListener("click", () =>{
    selectEndDate.removeAttribute("disabled");
    endDatepicker.classList.add("datepicker-not-visible");
    selectEndDate.classList.remove("datepicker-not-visible");
});



