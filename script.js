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

let prices = {
    plans: {
        monthly: {
            arcade: 9,
            advanced: 12,
            pro: 15
        },
        yearly: {
            arcade: 90,
            advanced: 120,
            pro: 150
        }
    }
}

let masterObject = {
    userName: "",
    userEmail: "",
    userNumber: 0,
    planDuration: "",
    planPrice: 0,


}

function highlightStep(index) {
    listOfNumber = Array.from(document.getElementsByClassName('list-number'));
    listOfNumber.forEach((element, i) => {
        if (i == index - 1) {
            element.classList.remove('nonhighlight');
            element.classList.add('highlight');
        }
        else {
            element.classList.remove('highlight');
            element.classList.add('nonhighlight');
        }
    });
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
                step2();
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

function planMonthly() {
    const yearlyOffer = Array.from(document.getElementsByClassName('yearly-2month-offer'));

    yearlyOffer.forEach((element, index) => {
        element.style.display = "none";
        element.dataset.duration = "monthly";
    });

    document.getElementById('arcade-price').innerHTML = prices.plans.monthly.arcade;
    document.getElementById('advanced-price').innerHTML = prices.plans.monthly.advanced;
    document.getElementById('pro-price').innerHTML = prices.plans.monthly.pro;

    document.getElementById('arcade').dataset.price = prices.plans.monthly.arcade;
    document.getElementById('advanced').dataset.price = prices.plans.monthly.advanced;
    document.getElementById('pro').dataset.price = prices.plans.monthly.pro;


    let yearMonthArray = Array.from(document.getElementsByClassName("per-year-month"));

    yearMonthArray.forEach((element, index) => {
        element.innerHTML = "mo"
    });
}
function planYearly() {
    const yearlyOffer = Array.from(document.getElementsByClassName('yearly-2month-offer'));

    yearlyOffer.forEach((element, index) => {
        element.style.display = "block";
        element.dataset.duration = "yearly";
    });

    document.getElementById('arcade-price').innerHTML = prices.plans.yearly.arcade;
    document.getElementById('advanced-price').innerHTML = prices.plans.yearly.advanced;
    document.getElementById('pro-price').innerHTML = prices.plans.yearly.pro;

    document.getElementById('arcade').dataset.price = prices.plans.yearly.arcade;
    document.getElementById('advanced').dataset.price = prices.plans.yearly.advanced;
    document.getElementById('pro').dataset.price = prices.plans.yearly.pro;

    let yearMonthArray = Array.from(document.getElementsByClassName("per-year-month"));

    yearMonthArray.forEach((element, index) => {
        element.innerHTML = "yr"
    });
}

function removeBorderPlan() {
    let planCards = Array.from(document.getElementsByClassName('plan-card'));
    planCards.forEach((element, index) => {
        element.parentElement.previousElementSibling.checked = false;
        element.classList.remove('add-border-plan-card');
    });
}

function step3() {

}

function step2() {

    formArea.innerHTML = `
    <div class="form-container">
                <header class="form-header">
                    <h1 class="main-form-heading">
                        Select Your plan
                    </h1>
                    <p class="form-parah">
                        You have the option of monthly or yearly billing.
                    </p>
                </header>

                <form class="form">

                    <div class="plan-select-field">
                        <div>
                            <input type="radio" id="arcade" class="check-plan" name="plan" value="arcade">
                            <label for="arcade">
                                <div class="plan-card">
                                    <div class="plan-img-container">
                                        <img src="./assets/images/icon-arcade.svg" alt="arcade">
                                    </div>
                                    <div class="plan-details">
                                        <span class="plan-name">
                                            Arcade
                                        </span>
                                        <br>
                                        <span class="plan-price">
                                            $<span id="arcade-price">9</span>/<span class="per-year-month">mo</span>
                                        </span>
                                        <br>
                                        <span class="yearly-2month-offer">
                                            2 months free
                                        </span>
                                    </div>

                                </div>
                            </label>
                        </div>
                        <br>
                        <div>
                            <input type="radio" id="advanced" class="check-plan" name="plan" value="advanced">
                            <label for="advanced">
                                <div class="plan-card">
                                    <div class="plan-img-container">
                                        <img src="./assets/images/icon-advanced.svg" alt="arcade">
                                    </div>
                                    <div class="plan-details">
                                        <span class="plan-name">
                                            Advanced
                                        </span>
                                        <br>
                                        <span class="plan-price">
                                            $<span id="advanced-price">12</span>/<span class="per-year-month">mo</span>
                                        </span>
                                        <br>
                                        <span class="yearly-2month-offer">
                                            2 months free
                                        </span>
                                    </div>

                                </div>
                            </label>
                        </div>
                        <br>
                        <div>
                            <input type="radio" id="pro" class="check-plan" name="plan" value="pro">
                            <label for="pro">
                                <div class="plan-card">
                                    <div class="plan-img-container">
                                        <img src="./assets/images/icon-pro.svg" alt="arcade">
                                    </div>
                                    <div class="plan-details">
                                        <span class="plan-name">
                                            Pro
                                        </span>
                                        <br>
                                        <span class="plan-price">
                                            $<span  id="pro-price">15</span>/<span class="per-year-month">mo</span>
                                        </span>
                                        <br>
                                        <span class="yearly-2month-offer">
                                            2 months free
                                        </span>
                                    </div>

                                </div>
                            </label>
                        </div>
                    </div>
                    <div class="plan-duration-field">
                        <div class="duration-selection">
                            <div class="monthly slided">
                                Monthly
                            </div>
                            <div class="slidearea">
                                <label class="switch">
                                    <input type="checkbox" id="slider">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div class="yearly ">
                                Yearly
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="btn-holder">
                <div class="internal-btn-holder">
                    <button class="next-step-btn" id="next-btn-step2">
                        Next Step
                    </button>
                </div>
            </div>
    `

    highlightStep(2);
    planMonthly();

    let slider = document.getElementById('slider');
    slider.checked = false;
    slider.addEventListener('change', function (e) {
        if (slider.checked == true) {
            planYearly();
        }
        else {
            planMonthly();
        }
    })


    let arcadeCard = document.getElementById('arcade');
    arcadeCard.checked = true;
    arcadeCard.nextElementSibling.firstElementChild.classList.add('add-border-plan-card');
    // document.get

    let planCards = Array.from(document.getElementsByClassName("check-plan"));
    planCards.forEach(element => {
        element.addEventListener('click', (e) => {
            removeBorderPlan();
            e.target.checked = true;
            e.target.nextElementSibling.firstElementChild.classList.add('add-border-plan-card');
        })
    });

    const nextBtnStep2 = document.getElementById('next-btn-step2');
    nextBtnStep2.addEventListener('click', (e) => {
        const plans = Array.from(document.getElementsByName('plan'));
        const selectedPlan = plans.filter((elem) => {
            return elem.checked
        })
        const price = selectedPlan[0].getAttribute('data-price');
        const duration = document.getElementsByClassName('yearly-2month-offer')[0].getAttribute('data-duration')

        masterObject.planDuration = duration;
        masterObject.planPrice = price;
        console.log(masterObject);
        step3();
    })

}



function step1() {
    console.log(formArea);
    formArea.innerHTML = `
    <div class="form-container">
                <header class="form-header">
                    <h1 class="main-form-heading">
                        Personal info
                    </h1>
                    <p class="form-parah">
                        Please provide your name, email address, and phone number.
                    </p>
                </header>

                <form class="form">
                    <div class="form-fields">
                        <div class="different-info">
                            <label class="label" for="name">Name</label>
                            <input type="text" id="user-name" class="input" id="name" name="name"
                                placeholder="e.g. Stephen King" required>

                        </div>
                        <div class="different-info">
                            <label class="label" for="email">Email Address</label>
                            <input type="email" id="user-email" class="input" name="email" id="email"
                                placeholder="e.g. stephenking@lorem.com" required>

                        </div>
                        <div class="different-info">
                            <label class="label" for="phone">Phone Number</label>
                            <input type="text" id="user-phone" class="input" name="phone" id="phone"
                                placeholder="e.g. +1 234 567 890" phone>
                        </div>
                        <div>
                            <button type="submit" id="submit-step-1" style="display: none;">submit</button>
                        </div>
                    </div>
                </form>
            </div>
            <div class="btn-holder">
                <div class="internal-btn-holder">
                    <button class="next-step-btn" id="next-btn-step1">
                        Next Step
                    </button>
                </div>
            </div>
    `
    highlightStep(1);

    const nextBtn = document.getElementById('next-btn-step1');

    nextBtn.addEventListener('click', validation);

}

step3();