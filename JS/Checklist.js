const CHECKBOX_LIST = document.querySelectorAll("input");
const DISPLAY_TEXT = document.querySelector(".center");
const RECTANGLE = document.querySelector(".rectangle");

//saving the Checkbox list
var listSize = CHECKBOX_LIST.length;

function ColorRect(rectColor) {
    RECTANGLE.style["background-color"] = rectColor;
}

function RemainingChecks() {
    // This will state the remaining checkboxes needed
    let checksLeft = 0;

    for (var index = 0; index < listSize; index++) {

        let indexedObject = CHECKBOX_LIST[index];

        if (indexedObject.checked === false) {
            ++checksLeft;
        }
        //else if (indexedObject.checked === true) {
        //    indexedObject.disabled = true;
        //}
    }

    if (checksLeft > 0) {
        DISPLAY_TEXT.innerHTML = "Remaining checks needed : (" + checksLeft + "/" + listSize + ")";
        ColorRect("red");
    }
    else {
        DISPLAY_TEXT.innerHTML = "Good to Go!!";
        ColorRect("green");
    }
}

RemainingChecks();

for (var index = 0; index < listSize; index++) {

    CHECKBOX_LIST[index].addEventListener("change", RemainingChecks, false);
}

