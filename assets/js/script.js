var listContainerEl = document.querySelector(".container");


var currentDay = moment().format("dddd, MMMM D, YYYY");


$("#currentDay").text(currentDay);

// define time blocks for the work day
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

// build time blocks on the page
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
        hourEl.textContent=moment(timeBlocks[i].hour,"h:mm a").format("hA");
        hourEl.classList=("hour col-1");
        timeBlockEl.appendChild(hourEl);

        // create description input for each row and append to timeBlockEl
        var descriptionEl = document.createElement("textarea");
        descriptionEl.classList=("description col-10");
        descriptionEl.id=timeBlocks[i].hour;
        descriptionEl.placeholder=("Click here to add a task");
        timeBlockEl.appendChild(descriptionEl);

        // create save button for each row and append to timeBlockEl
        var saveBtnEl = document.createElement("button");
        saveBtnEl.classList=("saveBtn col-1");
        saveBtnEl.innerHTML=("<i class='fa fa-floppy-disk' data-btnHour="+JSON.stringify(timeBlocks[i].hour)+">"+"</i>");
        saveBtnEl.setAttribute("data-btnHour",timeBlocks[i].hour);
        timeBlockEl.appendChild(saveBtnEl);

        // append list item rows to list group
        listWrapperEl.appendChild(timeBlockEl);
    }
    // append list group to container div
    listContainerEl.appendChild(listWrapperEl);
}

// call function to build time blocks immediately upon page load
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


var updateTask = function(event){
    // get the id of the element that was just changed
    var updatedTask = event.target.id;
    // console.log(updatedTask);
    // get updated description
    var updatedValue = event.target.value.trim();
    // console.log(updatedValue);
    // get the index of the timeBlocks array object that matches the updated task's id
    var arrayIndex = timeBlocks.findIndex(element=>element.hour===updatedTask);
    // console.log(arrayIndex);
    // insert the updated description into the timeBlocks array at the current index
    timeBlocks[arrayIndex].description=updatedValue;
    // console.log(timeBlocks[arrayIndex]);
};


var storageArray = [""];

var saveToStorage = function(event){
    // identify the element that was clicked using the data-btnHour attribute
    var saveBtnClick = event.target.getAttribute("data-btnHour");  


    if(saveBtnClick){


        // loop through storageArray to find out if the time block is already saved in local storage    
        for(i = 0; i<storageArray.length; i++){

            // if there is already an object for this time block saved in local storage, get index of that object or return -1
            var targetIndex = storageArray.findIndex(element=>{if(element.hour===saveBtnClick){return true}});
            
            // if an object was found in storageArray, update the existing index object with the current information
            if(targetIndex !== -1){

                storageArray[targetIndex] = {"hour": saveBtnClick, "description": document.getElementById(saveBtnClick).value};
                console.log("updated storage array");
                console.log(storageArray);
                
                break;      
            }
            // if there is not already a saved object for the time block, create one in storageArray
            else{

                storageArray.push ({"hour": saveBtnClick, "description": document.getElementById(saveBtnClick).value});
                console.log("pushed new object");
                console.log(storageArray);
                
                break;
            }
        }
    }
// save the storageArray to localStorage
localStorage.setItem("savedTimeBlocks", JSON.stringify(storageArray));
}

// get the saved content from local storage and display it in the appropriate time blocks on the page
var loadSavedDescriptions = function(){

    // get the saved content from local storage
    var saved = localStorage.getItem("savedTimeBlocks");

    // if there was any saved content, parse it back into an array of objects
    if(saved){
        saved = JSON.parse(saved);
        // loop through the array of saved content and find the textarea on the page whose id matches the hour property from each object in the array
        for(i = 1; i < saved.length; i++){
            var loadContent = document.getElementById(saved[i].hour);
            // set the text content of the appropriate textarea to the saved description retrieved from localStorage
            loadContent.textContent=saved[i].description;
            // push the saved content into the storageArray
            storageArray.push({"hour":saved[i].hour,"description":saved[i].description});
        }
    }
}

loadSavedDescriptions();


listContainerEl.addEventListener("change",updateTask);

listContainerEl.addEventListener("click",saveToStorage);