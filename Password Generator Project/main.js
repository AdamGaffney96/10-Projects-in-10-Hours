console.log("Script loaded successfully.");

// Global variable declarations
// -- Elements
const passwordLengthNumber = document.querySelector(".password-length-num");
const passwordLengthBar = document.querySelector(".password-length-bar");
const passwordLengthSlider = document.querySelector(".password-length-slider");
const passwordText = document.querySelector(".password-text");

// Calculated variables
const barRightBound = Math.round(passwordLengthBar.getBoundingClientRect().right) + 114;
const barLeftBound = Math.round(passwordLengthBar.getBoundingClientRect().right) - 114;

// Fixed variables
const minLength = 6;
const maxLength = 32;
const maxWidth = 200;
const letters = "abcdefghijklmnopqrstuvwxyz";
const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numbers = "0123456789";
const symbols = `?!#@$&/`;

// Function declarations
const changeBarWidthOnMove = event => {
    // Prevents selection when bar is in use
    document.onselectstart = event.preventDefault();
    // Calculates bar width
    if (event.clientX < barRightBound && event.clientX > barLeftBound) {
        passwordLengthBar.style.width = `${passwordLengthBar.offsetWidth + event.movementX}px`;
    }
    // Set password number
    let newLength = calculatePasswordLength(passwordLengthBar.offsetWidth, minLength, maxLength);
    if (newLength != passwordLengthNumber.innerHTML) {
        passwordLengthNumber.innerHTML = newLength;
        setPassword();
    }
};

const calculatePasswordLength = (barWidth, minLength, maxLength) => {
    let diff = maxLength - minLength;
    let interval = Math.round(maxWidth / diff);
    let length = barWidth == 200 ? 32 : minLength + Math.ceil(barWidth / interval);
    return length;
};

const calculatePassword = (password = "", counter = 1) => {
    if (counter > parseInt(passwordLengthNumber.innerHTML)) return password;
    let type = Math.floor(Math.random() * 4);
    let character;
    if (type == 0) {
        character = letters[Math.floor(Math.random() * letters.length)];
    } else if (type == 1 && document.getElementById("numerics").checked) {
        character = numbers[Math.floor(Math.random() * numbers.length)];
    } else if (type == 2 && document.getElementById("symbols").checked) {
        character = symbols[Math.floor(Math.random() * symbols.length)];
    } else if (type == 3 && document.getElementById("uppercase").checked) {
        character = uppercase[Math.floor(Math.random() * uppercase.length)];
    } else {
        character = letters[Math.floor(Math.random() * letters.length)];
    }
    password = calculatePassword(password + character, counter + 1);
    return password;
};

const setPassword = () => {
    passwordText.innerHTML = calculatePassword();
}

copyPassword = () => {
    navigator.clipboard.writeText(passwordText.innerText);
    document.querySelector(".copied-alert").style.display = "inherit";
    setTimeout(e => {
        document.querySelector(".copied-alert").style.opacity = 0;
    }, 500);
    let interval = setTimeout(e => {
        document.querySelector(".copied-alert").removeAttribute("style");
        clearInterval(interval);
    }, 1000);
    console.log("Password copied!");
}

const init = () => {
    passwordLengthNumber.innerHTML = calculatePasswordLength(passwordLengthBar.offsetWidth, minLength, maxLength);
    setPassword();
    document.querySelectorAll("input[type='checkbox']").forEach(checkbox => {
        checkbox.addEventListener("change", setPassword);
    })
    document.querySelector(".password-head").addEventListener("click", copyPassword);
}

passwordLengthSlider.addEventListener("mousedown", e => {
    window.addEventListener("mousemove", changeBarWidthOnMove);
});

window.addEventListener("mouseup", e => {
    window.removeEventListener("mousemove", changeBarWidthOnMove);
});

// Run initial functions
init();