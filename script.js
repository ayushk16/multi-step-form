const Marineblue = "hsl(213, 96%, 18%)";
const Mblue = "hsl(213, 71%, 22%)";
const Purplishblue = "hsl(243, 100%, 62%)";
const Pastelblue = "hsl(228, 100%, 84%)";
const Lightblue = "hsl(206, 94%, 87%)";
const Strawberryred = "hsl(354, 84%, 57%)";
const Coolgray = "hsl(231, 11%, 63%)";
const Lightgray = "hsl(229, 24%, 87%)";
const Magnolia = "hsl(217, 100%, 97%)";
const Alabaster = "hsl(231, 100%, 99%)";
const White = "hsl(0, 0%, 100%)";

const formArea = document.getElementById('form-area');


let masterObject = {
    userName: "",
    userEmail: "",
    userNumber: 0,

}

// let's create a function
function checkEmail() {
    let pattern = /^[^ ]+@[^ ]+.[a-z]{2,3}$/; //pattern to validate email

    if (!eInput.value.match(pattern)) { //if pattern not matched with user input
        eField.classList.add("error");
        let errorTxt = eField.querySelector(".error-text");

        // if email is not empty then show Enter a valid email until a valid else show email can't be blank
        (eInput.value != "") ? errorTxt.innerText = "Enter a valid email" : errorTxt.innerText = "email can't be blank";
    }
    else {
        eField.classList.remove("error");
    }
}

function validateEmail(value) {

}

function validateStep1(nameField, emailField, phoneField) {
    const name = nameField.value;
    const email = emailField.value;
    const phone = phoneField.value;
    let emailpattern = /^[^ ]+@[^ ]+.[a-z]{2,3}$/;
    // let phonepattern = /\+\d{1}\s\d{3}\s\d{3}\s\d{3}/
    let phonepattern = /\b(?:\+?\d{1,3}[-. ]?)?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}\b/;
    // let phonepattern = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    if (name == "") {
        nameField.focus();
    }
    else {
        if (!email.match(emailpattern)) {
            console.log("err-email");
            emailField.focus();
        }
        else {
            if (!phone.match(phonepattern) && phone.length < 6) {
                console.log("error-phone");
                phoneField.focus();
            }
            else {
                console.log("go ahead");
                masterObject.userName = name;
                masterObject.userEmail = email;
                masterObject.userNumber = phone;
            }
        }
    }

}

function validation() {
    const nameField = document.getElementById('user-name');
    const emailField = document.getElementById('user-email');
    const phoneField = document.getElementById('user-phone')

    validateStep1(nameField, emailField, phoneField)

}

function listenPage() {

}

const nextBtn = document.getElementById('next-btn')

nextBtn.addEventListener('click', validation);

// console.log(document.getElementById('next-btn'))

listenPage();