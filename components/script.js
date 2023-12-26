// no known bugs as of now

console.log("Controls :- Esc to clear all, Backspace to delete, enter to equal, else are same as defined on keyboard");

// calculating function
function calculate2(string) {
    const value = eval(string);
    const digits = 3;
    const number = Math.trunc(value * Math.pow(10, digits)) / Math.pow(10, digits)
    return number;
}
function isValidParentheses(str) {
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '(')
            count++;
        else if (str[i] === ')')
            count--;
        if (count < 0)
            return false;
    }
    return (count === 0);
}
function operatorChecker(str) {
    const n = str.length;
    for (let i = 0; i < n - 1; i++) {
        if ((str[i] === "-" || str[i] === "/" || str[i] === "*" || str[i] === "+") && (str[i + 1] == "/" || str[i + 1] == "*" || str[i + 1] == "+"))
            return false;
    }
    return true;
}
function decimalCheck(str) {
    const n = str.length;
    let cntDecimal = 0;
    for (let i = 0; i < n; i++) {
        if (cntDecimal > 1)
            return false;
        if (str[i] === ".")
            cntDecimal++;
        if (str[i] === "/" || str[i] === "*" || str[i] === "-" || str[i] === "+")
            cntDecimal = 0;
        if (/[a-zA-Z]/.test(str[i]))
            return false;
        if (cntDecimal > 1)
            return false;
        return true;
    }
}
function calculate1(str) {
    if (isValidParentheses(str) && operatorChecker(str) && decimalCheck(str)) {
        const value = calculate2(str);
        return value.toString();
    }
    return "err";
}

// background
const mainBody = document.querySelector("body");
mainBody.style.backgroundColor = "#1c1c1b";

// heading
const heading = document.querySelector(".heading h1");
heading.style.color = "#f5f5f5";
heading.style.paddingTop = "15px";
heading.style.paddingBottom = "10px";

// input
const input = document.querySelector(".input input");
input.style.fontFamily = "Roboto, sans-serif";
input.style.fontSize = "45px";
input.style.textAlign = "right";
input.style.backgroundColor = "#c9c9c7";
input.style.color = "black";
str = "";

// buttons
const buttonsArr = ["(", ")", "C", "<", "7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-", ".", "0", "=", "+"];
for (let i = 0; i < buttonsArr.length; i++) {
    const newbtn = document.createElement("button");
    newbtn.className = "btn";
    newbtn.textContent = `${buttonsArr[i]}`;
    newbtn.value = `${buttonsArr[i]}`;
    newbtn.style.backgroundColor = "#c9c9c7";
    newbtn.style.border = "none";
    newbtn.style.fontFamily = "Roboto, sans-serif";
    let parentEle = document.querySelector(".btns");
    parentEle.appendChild(newbtn);
}
const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
    button.style.fontSize = "30px";
    button.addEventListener("click", (e) => {
        if (e.target.value !== "C" && e.target.value !== "<" && e.target.value !== "=") {
            str += e.target.value;
            input.value = str;
        }
        else if (e.target.value === "C") {
            str = "";
            input.value = str;
        }
        else if (e.target.value === "<") {
            str = str.slice(0, -1);
            input.value = str;
        }
        else if (e.target.value === "=") {
            str = calculate1(str);
            input.value = str;
        }
    })
})

// footer text
const signature = document.querySelector(".foot p");
signature.style.color = "#edece8";
// signature.style.fontWeight = "100";
signature.style.fontSize = "30px";
signature.style.paddingTop = "10px";

// disabling input box
const inputBox = document.querySelector(".input input");
inputBox.style.border = "2px solid black";
inputBox.disabled = !inputBox.disabled;

// keyboard support
document.addEventListener("keydown", (e) => {
    const key = e.key;
    // console.log(key);
    if (key === "Enter") {
        const keyPressed = document.querySelector(`.btn[value="="]`);
        keyPressed.click();
    }
    else if (key === "Backspace") {
        const keyPressed = document.querySelector(`.btn[value="<"]`);
        keyPressed.click();
    }
    else if (key === "Escape") {
        const keyPressed = document.querySelector(`.btn[value="C"]`);
        keyPressed.click();
    }
    else {
        const keyPressed = document.querySelector(`.btn[value="${key}"]`); // returns null if can't find.
        if (keyPressed)
            keyPressed.click();
    }
    // console.log(keyPressed);
})


// media query
function checkViewportWidth() {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    if (viewportWidth < 600) {
        const heading = document.querySelector(".heading h1");
        heading.style.fontSize = "58px";
    }
    else {
        const heading = document.querySelector(".heading h1");
        heading.style.fontSize = "70px";
    }
}
checkViewportWidth();
window.addEventListener("resize", checkViewportWidth);
window.addEventListener("load", checkViewportWidth);
