var listContainerEl = document.querySelector(".container");

var currentDay = moment().format("dddd, MMMM D, YYYY");
console.log(currentDay);

$("#currentDay").text(currentDay);

var timeBlocks = [
    "7:00 am",
    "8:00 am",
    "9:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "1:00 pm",
    "2:00 pm",
    "3:00 pm",
    "4:00 pm",
    "5:00 pm",
    "6:00 pm"
];   

console.log(timeBlocks.length);


var getTimeBlock = function(){
    // create list group to hold time block item rows
    var listWrapperEl = document.createElement("div");

    // loop through all time block hours and create a row for each
    for(i = 0; i < timeBlocks.length; i++){
        var timeBlockEl = document.createElement("div");
        timeBlockEl.classList=("row time-block");
        // timeBlockEl.id=timeBlocks[i];

        // create hour label for each row and append to timeBlockEl
        var hourEl = document.createElement("div");
        hourEl.textContent=timeBlocks[i];
        hourEl.classList=("hour col-2");
        timeBlockEl.appendChild(hourEl);


        // create description input for each row and append to timeBlockEl
        var descriptionEl = document.createElement("textarea");
        descriptionEl.classList=("description col-9");
        descriptionEl.id=timeBlocks[i];
        descriptionEl.placeholder=("Click here to add a task");
        timeBlockEl.appendChild(descriptionEl);


        // create save button for each row and append to timeBlockEl
        var saveBtnEl = document.createElement("button");
        saveBtnEl.classList=("saveBtn col-1");
        saveBtnEl.innerHTML=("<i class='fa fa-floppy-disk'></i>");
        timeBlockEl.appendChild(saveBtnEl);


        // append list item rows to list group
        listWrapperEl.appendChild(timeBlockEl);
    }
    // append list group to container div
    listContainerEl.appendChild(listWrapperEl);
}

getTimeBlock();

    
var now = (moment().startOf('hour').format("h:mm a"));
console.log("now:"+now);

var compare = (moment("7:00 pm","h:mm a").format("h:mm a"));
console.log("compare:"+compare);



var compareTimes = function(){
    if(now<compare){
        console.log(now+" is before "+compare);
    }
    else if(now>compare){
        console.log(now+" is after "+compare);
    }
    else if(now===compare){
        console.log(now+" is the same as "+compare);
    }
}

compareTimes();

