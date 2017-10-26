const DISPLAY_TEXT = document.querySelector(".center");
const CHECKBOX_LIST = document.querySelectorAll("input");
const BUTTON_LIST = document.querySelectorAll("button");
const BUTTONTEXT_LIST = document.querySelectorAll("p");
//This should be how many ten hundredths of a second you want it to blink for
const MAX_BLINKSECONDS = 50;

var activeSelection = null;
var selectionRect_ListSize = BUTTON_LIST.length;
var m_btnTxtList_Length = BUTTONTEXT_LIST.length;
var m_seconds = 0;
var m_interval = null;
var m_blinkSeconds = 0;
var m_isRunning = false;

//adding leading zeros for aesthetics
function LeadingZero(time) {

    //if its less than 10 add a zero the begin of the text
    if (time < 10) {
        time = "0" + time;
    }

    return time;
}

function UpdateTimer() {
    //decrementing the seconds
    --m_seconds;

    //earlyOut check
    if (m_seconds === 0) {
        //setting the blink seconds the max blink
        m_blinkSeconds = MAX_BLINKSECONDS;
        //clearing the interval and assigning it to the Blink function
        clearInterval(m_interval);
        Blink();

        //changing all text to black
        for (var index = 0; index < m_btnTxtList_Length; index++) {
            //if the checkbox is check do not change it to black
            if (CHECKBOX_LIST[index].checked == true) {
                continue;
            }
            //change indices' text color
            BUTTONTEXT_LIST[index].style.color = "black";
        }

    }
    //display the time to the user
    DisplayTime();
}

function Blink() {
    //blinks for 5 seconds

    //once the blink is done call reset
    Reset()
}

function Reset() {
    m_isRunning = false;
    CHECKBOX_LIST[activeSelection.value].checked = true;
}

function MakeActive(e) {
    //if the timer is running make sure no input is recognized
    if (m_isRunning === true) {
        return;
    }

    //finding the index value for the checkbox
    let checkboxObj = e.target
    const indexNumber = e.target.value;
    checkboxObj = CHECKBOX_LIST[indexNumber];

    //if its checked already ingnore it
    if (checkboxObj.checked === true) {
        return;
    }

    //changing the color of both objects
    if (activeSelection != null) {
        activeSelection.style.borderColor = "transparent";
    }
    e.target.style.borderColor = "red";

    //setting the activateSelection to the new target that was passed Over
    activeSelection = e.target;
}

function StartTask(e) {

    //if the timer is running make sure no input is recognized
    if (m_isRunning === true) {
        //leave function
        return;
    }

    //if the target and activeSelection are not equal
    if (e.target != activeSelection) {
       //leave function
        return;
    }

    //finding the index value for the checkbox
    const indexNumber = activeSelection.value;
    const checkboxObj = CHECKBOX_LIST[indexNumber];
    //if the checkbox is checked
    if (checkboxObj.checked === true) {
        //leave function
        return;
    }

    //setting the bool to true
    m_isRunning = true;

    //retrieving the time in seconds
    m_seconds = checkboxObj.value;
    console.log(m_seconds + " Seconds");

    //changing all text to grey
    for (let index = 0; index < m_btnTxtList_Length; index++) {
        BUTTONTEXT_LIST[index].style.color = "grey";
    }

    //Display the current time to the user
    DisplayTime();

    m_interval = setInterval(UpdateTimer, 1000);
}

//Display the current time to the use
function DisplayTime() {
    //converting the seconds into hours
    let hours = Math.floor((m_seconds / 3600));

    //converting the seconds into minutes
    let minutes = Math.floor((m_seconds - (hours * 3600)) / 60);

    DISPLAY_TEXT.innerHTML = "Time Left: " + LeadingZero(hours) + ":" +
        LeadingZero(minutes) + ":" +
        LeadingZero(m_seconds - (hours * 3600) - (minutes * 60));
}

(function () {
    for (var index = 0; index < selectionRect_ListSize; index++) {

        CHECKBOX_LIST[index].disabled = true;
    }
})();

for (var index = 0; index < selectionRect_ListSize; index++) {

    BUTTON_LIST[index].addEventListener('mouseenter', MakeActive, false);
    BUTTON_LIST[index].addEventListener('mousedown', StartTask, false);

}
