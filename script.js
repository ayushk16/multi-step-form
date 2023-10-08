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
    },
    addons: {
        monthly: {
            onlineService: 1,
            largerStorage: 2,
            customizableProfile: 2
        },
        yearly: {
            onlineService: 10,
            largerStorage: 20,
            customizableProfile: 20
        }
    }
}

let masterObject = {
    userName: "",
    userEmail: "",
    userNumber: "",
    planDuration: "monthly",
    planPrice: prices.plans.monthly.advanced,
    addons: {
        monthly: {
            onlineService: false,
            largerStorage: false,
            customizableProfile: false
        },
        yearly: {
            onlineService: false,
            largerStorage: false,
            customizableProfile: false
        }
    }


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
    // let phonepattern = /+\d{1,3}\d{3}\d{3}\d{3}$/;
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
    if (masterObject.planPrice == prices.plans.monthly.pro || masterObject.planPrice == prices.plans.yearly.pro) {
        masterObject.planPrice = prices.plans.monthly.pro;
        masterObject.planDuration = "monthly";
    }
    else if (masterObject.planPrice == prices.plans.monthly.advanced || masterObject.planPrice == prices.plans.yearly.advanced) {
        masterObject.planPrice = prices.plans.monthly.advanced;
        masterObject.planDuration = "monthly";

    }
    else {
        masterObject.planPrice = prices.plans.monthly.arcade;
        masterObject.planDuration = "monthly";
    }

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

    if (masterObject.planPrice == prices.plans.monthly.pro || masterObject.planPrice == prices.plans.yearly.pro) {
        masterObject.planPrice = prices.plans.yearly.pro;
        masterObject.planDuration = "yearly";
    }
    else if (masterObject.planPrice == prices.plans.monthly.advanced || masterObject.planPrice == prices.plans.yearly.advanced) {
        masterObject.planPrice = prices.plans.yearly.advanced;
        masterObject.planDuration = "yearly";

    }
    else {
        masterObject.planPrice = prices.plans.monthly.arcade;
        masterObject.planDuration = "yearly";
    }

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


function step4() {


}







function step3() {
    let duration;
    let currentRates = {};
    if (masterObject.planDuration == "monthly") {
        duration = 'mo';
        currentRates = {
            onlineService: prices.addons.monthly.onlineService,
            largerStorage: prices.addons.monthly.largerStorage,
            customizableProfile: prices.addons.monthly.customizableProfile
        }
    }
    else {
        duration = 'yr';
        currentRates = {
            onlineService: prices.addons.yearly.onlineService,
            largerStorage: prices.addons.yearly.largerStorage,
            customizableProfile: prices.addons.yearly.customizableProfile
        }
    }

    formArea.innerHTML = `
        <div class="form-container">
            <header class="form-header">
                <h1 class="main-form-heading">
                    Plan add-ons
                </h1>
                <p class="form-parah">
                    Add-ons help enhance your gaming experience.
                </p>
            </header>

            <form class="form">

                <div class="add-ons-selection-field">
                    <div class="add-ons-card">
                    <label for="online-service" class="add-ons-lable" id="online-service-lable">
                        <div class="checkbox-container">
                            <input type="checkbox" data-tagname="input" name="services" id="online-service" class="add-ons" value="online-service">
                            <span class="checkmark"></span>
                        </div>
                        <div class="add-ons-details">
                            <div class="add-ons-info">
                                <div class="add-ons-name">
                                    online-service
                                </div>
                                <div class="add-ons-parah">
                                    Access to multiplier games
                                </div>
                            </div>
                            <div class="add-ons-price-info">
                                +$<span class="add-ons-price" id="online-service-price">${currentRates.onlineService}</span>/<span
                                    class="add-ons-duration">${duration}</span>
                            </div>
                        </div>
                    </label>
                </div>
                <br>
                <div class="add-ons-card">
                    <label for="larger-storage" class="add-ons-lable" id="larger-storage-lable">
                        <div class="checkbox-container">
                            <input type="checkbox" data-tagname="input" name="services" id="larger-storage" class="add-ons" value="larger-storage">
                            <span class="checkmark"></span>
                        </div>
                        <div class="add-ons-details">
                            <div class="add-ons-info">
                                <div class="add-ons-name">
                                    Larger storage
                                </div>
                                <div class="add-ons-parah">
                                    Extra 1TB of cloud save
                                </div>
                            </div>
                            <div class="add-ons-price-info">
                                +$<span class="add-ons-price" id="larger-storage-price">${currentRates.largerStorage}</span>/<span
                                    class="add-ons-duration">${duration}</span>
                            </div>
                        </div>
                    </label>
                </div>
                <br>
                <div class="add-ons-card">
                    <label for="customizable-profile" class="add-ons-lable" id="customizable-profile-lable">
                        <div class="checkbox-container">
                            <input type="checkbox" data-tagname="input" name="services" id="customizable-profile" class="add-ons" value="customizable-profile">
                            <span class="checkmark"></span>
                        </div>
                        <div class="add-ons-details">
                            <div class="add-ons-info">
                                <div class="add-ons-name">
                                    Customizable profile
                                </div>
                                <div class="add-ons-parah">
                                    Custom theme on your profile
                                </div>
                            </div>
                            <div class="add-ons-price-info">
                                +$<span class="add-ons-price" id="customizable-profile-price">${currentRates.customizableProfile}</span>/<span
                                    class="add-ons-duration">${duration}</span>
                            </div>
                        </div>
                    </label>
                </div>
                </div>
            </form>
        </div>
        <div class="btn-holder">
            <div class="internal-btn-holder">
                <div class="goback-btn" id="goback-step3">
                    Go Back
                </div>
                <button class="next-step-btn" id="next-btn-step3">
                    Next Step
                </button>
            </div>
        </div>
    `;
    highlightStep(3);

    const gobackBtn = document.getElementById('goback-step3');
    const nextBtnStep3 = document.getElementById('next-btn-step3');

    gobackBtn.addEventListener('click', (e) => {
        step2();
    })

    nextBtnStep3.addEventListener('click', (e) => {
        step4();
    })


    const onlineService = document.getElementById('online-service');
    const largerStorage = document.getElementById('larger-storage');
    const customizableProfile = document.getElementById('customizable-profile');
    console.log(document.getElementsByName('services').values);

    // check if being checked already
    let currentYearlyChecks = masterObject.addons.yearly;
    let currentMonthlyChecks = masterObject.addons.monthly;
    if (masterObject.planDuration == "monthly") {
        // check corresponding add ons in dom
        for (const addons in currentMonthlyChecks) {
            if (currentMonthlyChecks[addons] == true) {
                if (addons == "onlineService") {
                    onlineService.checked = true;
                    onlineService.parentElement.parentElement.classList.add('checkedHighlight')
                }
                else if (addons == "largerStorage") {
                    largerStorage.checked = true;
                    largerStorage.parentElement.parentElement.classList.add('checkedHighlight')
                }
                else if (addons == "customizableProfile") {
                    customizableProfile.checked = true;
                    customizableProfile.parentElement.parentElement.classList.add('checkedHighlight')
                }
            }
        }
        // clear yearly addons in master object
        for (const addons in currentYearlyChecks) {
            currentYearlyChecks[addons] = false;
        }
        console.log(currentYearlyChecks)
        console.log(currentMonthlyChecks);
        console.log(masterObject);
    }
    else {
        // check corresponding add ons in dom
        for (const addons in currentYearlyChecks) {
            if (currentYearlyChecks[addons] == true) {
                if (addons == "onlineService") {
                    onlineService.checked = true;
                    onlineService.parentElement.parentElement.classList.add('checkedHighlight')
                }
                else if (addons == "largerStorage") {
                    largerStorage.checked = true;
                    largerStorage.parentElement.parentElement.classList.add('checkedHighlight')
                }
                else if (addons == "customizableProfile") {
                    customizableProfile.checked = true;
                    customizableProfile.parentElement.parentElement.classList.add('checkedHighlight')
                }
            }
        }
        // clear monthly addons in master object
        for (const addons in currentMonthlyChecks) {
            currentMonthlyChecks[addons] = false;
        }
        console.log(currentYearlyChecks)
        console.log(currentMonthlyChecks);
        console.log(masterObject);
    }

    console.log(onlineService, largerStorage, customizableProfile);
    const addOnsSelectionArea = document.getElementsByClassName('add-ons-selection-field')[0];
    addOnsSelectionArea.addEventListener('click', (e) => {
        if (e.target.hasAttribute("data-tagname")) {
            const addon = e.target.value;
            if (e.target.checked) {
                e.target.parentElement.parentElement.classList.add('checkedHighlight');
            }
            else {
                e.target.parentElement.parentElement.classList.remove('checkedHighlight');
            }
            if (masterObject.planDuration == "monthly") {
                if (addon == "online-service") {
                    if (masterObject.addons.monthly.onlineService == false) {
                        masterObject.addons.monthly.onlineService = true;
                    }
                    else {
                        masterObject.addons.monthly.onlineService = false;
                    }
                }
                else if (addon == "larger-storage") {
                    if (masterObject.addons.monthly.largerStorage == false) {
                        masterObject.addons.monthly.largerStorage = true;
                    }
                    else {
                        masterObject.addons.monthly.largerStorage = false;
                    }
                }
                else if (addon == "customizable-profile") {
                    if (masterObject.addons.monthly.customizableProfile == false) {
                        masterObject.addons.monthly.customizableProfile = true;
                    }
                    else {
                        masterObject.addons.monthly.customizableProfile = false;
                    }
                }
                console.log(masterObject.addons.monthly);
            }
            else {
                if (addon == "online-service") {
                    if (masterObject.addons.yearly.onlineService == false) {
                        masterObject.addons.yearly.onlineService = true;
                    }
                    else {
                        masterObject.addons.yearly.onlineService = false;
                    }
                }
                else if (addon == "larger-storage") {
                    if (masterObject.addons.yearly.largerStorage == false) {
                        masterObject.addons.yearly.largerStorage = true;
                    }
                    else {
                        masterObject.addons.yearly.largerStorage = false;
                    }
                }
                else if (addon == "customizable-profile") {
                    if (masterObject.addons.yearly.customizableProfile == false) {
                        masterObject.addons.yearly.customizableProfile = true;
                    }
                    else {
                        masterObject.addons.yearly.customizableProfile = false;
                    }
                }
                console.log(masterObject.addons.yearly);
            }
        }
    }, true)



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
                                            $<span id="arcade-price">${prices.plans.monthly.arcade}</span>/<span class="per-year-month">mo</span>
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
                                            $<span id="advanced-price">${prices.plans.monthly.advanced}</span>/<span class="per-year-month">mo</span>
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
                                            $<span  id="pro-price">${prices.plans.monthly.pro}</span>/<span class="per-year-month">mo</span>
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
                    <div class="goback-btn" id="goback-step2">
                        Go Back
                    </div>
                    <button class="next-step-btn" id="next-btn-step2">
                        Next Step
                    </button>
                </div>
            </div>
    `

    highlightStep(2);

    const gobackBtn = document.getElementById('goback-step2');
    gobackBtn.addEventListener('click', (e) => {
        step1();
    })

    let slider = document.getElementById('slider');

    if (masterObject.planDuration == "monthly") {
        slider.checked = false;
        planMonthly();
    }
    else {
        slider.checked = true;
        planYearly();
    }

    slider.addEventListener('change', function (e) {
        if (slider.checked == true) {
            planYearly();
        }
        else {
            planMonthly();
        }
    })

    if (masterObject.planPrice === prices.plans.monthly.pro || masterObject.planPrice === prices.plans.yearly.pro) {
        let Card = document.getElementById('pro');

        Card.checked = true;
        Card.nextElementSibling.firstElementChild.classList.add('add-border-plan-card');
    }
    else if (masterObject.planPrice === prices.plans.monthly.advanced || masterObject.planPrice === prices.plans.yearly.advanced) {
        let Card = document.getElementById('advanced');

        Card.checked = true;
        Card.nextElementSibling.firstElementChild.classList.add('add-border-plan-card');
    }
    else {
        let Card = document.getElementById('arcade');

        Card.checked = true;
        Card.nextElementSibling.firstElementChild.classList.add('add-border-plan-card');
    }


    // document.get

    let planCards = Array.from(document.getElementsByClassName("check-plan"));
    planCards.forEach(element => {
        element.addEventListener('click', (e) => {
            removeBorderPlan();
            const price = e.target.getAttribute('data-price');
            const duration = document.getElementsByClassName('yearly-2month-offer')[0].getAttribute('data-duration');
            masterObject.planDuration = duration;
            masterObject.planPrice = parseInt(price);
            console.log(masterObject);
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
        masterObject.planPrice = parseInt(price);
        console.log(masterObject);
        step3();
    })

}



function step1() {
    // console.log(formArea);
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
                    <div class="goback-btn" id='go-back-step1'>
                        Go Back
                    </div>
                    <button class="next-step-btn" id="next-btn-step1">
                        Next Step
                    </button>
                </div>
            </div>
    `
    if (masterObject.userName !== "") {
        document.getElementById('user-name').value = masterObject.userName;
    }
    if (masterObject.userEmail !== "") {
        document.getElementById('user-email').value = masterObject.userEmail;
    }
    if (masterObject.userNumber !== "") {
        document.getElementById('user-phone').value = masterObject.userNumber;
    }

    document.getElementById('go-back-step1').style.visibility = 'hidden';
    highlightStep(1);

    const nextBtn = document.getElementById('next-btn-step1');

    nextBtn.addEventListener('click', validation);

}

step1();