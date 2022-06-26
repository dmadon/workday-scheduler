var listContainerEl = document.querySelector(".container");


var currentDay = moment().format("dddd, MMMM D, YYYY");
console.log(currentDay);

$("#currentDay").text(currentDay);

var timeBlocks = [
    {hour:"7:00 am", description:""},
    {hour:"8:00 am", description:""},
    {hour:"9:00 am", description:""},
    {hour:"10:00 am", description:""},
    {hour:"11:00 am", description:""},
    {hour:"12:00 pm", description:""},
    {hour:"1:00 pm", description:""},
    {hour:"2:00 pm", description:""},
    {hour:"3:00 pm", description:""},
    {hour:"4:00 pm", description:""},
    {hour:"5:00 pm", description:""},
    {hour:"6:00 pm", description:""},
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
        hourEl.textContent=timeBlocks[i].hour;
        hourEl.classList=("hour col-2");
        timeBlockEl.appendChild(hourEl);


        // create description input for each row and append to timeBlockEl
        var descriptionEl = document.createElement("textarea");
        descriptionEl.classList=("description col-9");
        descriptionEl.id=timeBlocks[i].hour;
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



// check to see if a time block is in the past, is the current block, or is in the future, and set css classes accordingly
var compareTimes = function(){

    // loop through all time blocks to compare the hour to the current hour
    for(i = 0; i < timeBlocks.length; i++){

    // define current hour
    var now = (moment().startOf('hour').format("HH:mm a"));

    // get the hour from each time block object
    var compare = (moment(timeBlocks[i].hour,"HH:mm a").format("HH:mm a"));

    // check to see if the time block is in the future, compared to current hour
    if(now<compare){
        // find the description element whose id is the same as the time block hour and add the "future" class to the classList
        var descriptionEl = document.getElementById(timeBlocks[i].hour);
        descriptionEl.classList=("description col-9 future");
        }
    // check to see if the time block is in the past, compared to the current hour
    else if(now>compare){
        // find the description element whose id is the same as the time block hour and add the "past" class to the classList
        var descriptionEl = document.getElementById(timeBlocks[i].hour);
        descriptionEl.classList=("description col-9 past");
        }
    // check to see if the time block matches the current hour
    else if(now===compare){
        // find the description element whose id is the same as the time block hour and add the "present" class to the classList
        var descriptionEl = document.getElementById(timeBlocks[i].hour);
        descriptionEl.classList=("description col-9 present");
        }
    }
}

var runTimeCheck = function(){
    // check time blocks every 7 minutes and update time block color status while page is open
    timeCheck = setInterval(compareTimes,(60000 * 7));
}

// set time block colors immediately upon page load by running the compareTimes function
compareTimes();

// continue to update time block colors while page is open by running runTimeCheck function
runTimeCheck();


