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
    planPrice: prices.plans.monthly.arcade,
    addons: {
        onlineService: false,
        largerStorage: false,
        customizableProfile: false
    }


}

function clearError() {
    let errorAlert = Array.from(document.getElementsByClassName('error-step1'));
    errorAlert.forEach((element, i) => {
        element.style.display = "none";
        element.parentElement.nextElementSibling.style.borderColor = Lightgray;

    });
}

function showError(index) {
    let errorAlert = Array.from(document.getElementsByClassName('error-step1'));
    errorAlert.forEach((element, i) => {
        if (i == index - 1) {

            element.style.display = "block";
            element.parentElement.nextElementSibling.style.borderColor = Strawberryred;
        }
    });
}


function highlightStep(index) {
    let listOfNumber = Array.from(document.getElementsByClassName('list-number'));

    if (index >= 5) {
        listOfNumber.forEach((element, i) => {
            if (i == 3) {
                element.classList.remove('nonhighlight');
                element.classList.add('highlight');
            }
            else {
                element.classList.remove('highlight');
                element.classList.add('nonhighlight');
            }
        });
    }
    else {
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

    let listofSteps = Array.from(document.getElementsByClassName('steps'));

    listofSteps.forEach((element, i) => {
        if (element.getAttribute('data-step') == `${index}`) {
            element.style.display = 'flex';
            console.log(element);
        }
        else {
            element.style.display = 'none';
        }
    })


}


function validateStep1(nameField, emailField, phoneField) {
    const name = nameField.value;
    const email = emailField.value;
    const phone = phoneField.value;
    // regex patter for validation
    let emailpattern = /^[^ ]+@[^ ]+.+[a-z]{2,3}$/;
    let phonepattern = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    // let phonepattern = /\b(?:\+?\d{1,3}[-. ]?)?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}\b/;
    // let phonepattern = /\+\d{1}\s\d{3}\s\d{3}\s\d{3}/
    // let phonepattern = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
    // let phonepattern = /+\d{1,3}\d{3}\d{3}\d{3}$/;
    if (name == "") {
        nameField.focus();
        clearError();
        showError(1);
    }
    else {
        if (!email.match(emailpattern)) {
            console.log("err-email");
            emailField.focus();
            clearError();
            showError(2);
        }
        else {
            if (!phone.match(phonepattern) && phone.length < 6) {
                console.log("error-phone");
                phoneField.focus();
                clearError();
                showError(3);
            }
            else {
                console.log("go ahead");
                // update masterObject
                masterObject.userName = name;
                masterObject.userEmail = email;
                masterObject.userNumber = phone;
                clearError();
                step2();
            }
        }
    }
}

function validation() {
    // extracting tags with user-detail for check
    const nameField = document.getElementById('user-name');
    const emailField = document.getElementById('user-email');
    const phoneField = document.getElementById('user-phone')

    validateStep1(nameField, emailField, phoneField)
}

function planMonthly() {
    // change css
    document.getElementsByClassName('monthly')[0].classList.add('slided');
    document.getElementsByClassName('yearly')[0].classList.remove('slided');

    // changing master Object planDuration according slider
    masterObject.planDuration = "monthly";

    // reseting masterObject prices if fluctuated

    if (masterObject.planPrice == prices.plans.monthly.pro || masterObject.planPrice == prices.plans.yearly.pro) {
        masterObject.planPrice = prices.plans.monthly.pro;
        // masterObject.planDuration = "monthly";
    }
    else if (masterObject.planPrice == prices.plans.monthly.advanced || masterObject.planPrice == prices.plans.yearly.advanced) {
        masterObject.planPrice = prices.plans.monthly.advanced;
        // masterObject.planDuration = "monthly";
    }
    else {
        masterObject.planPrice = prices.plans.monthly.arcade;
        // masterObject.planDuration = "monthly";
    }

    // hide yearly price offer and adding data-set duration for later use
    const yearlyOffer = Array.from(document.getElementsByClassName('yearly-2month-offer'));

    yearlyOffer.forEach((element, index) => {
        element.style.visibility = "hidden";
        element.dataset.duration = "monthly";
    });

    // setting monthly prices in cards
    document.getElementById('arcade-price').innerHTML = prices.plans.monthly.arcade;
    document.getElementById('advanced-price').innerHTML = prices.plans.monthly.advanced;
    document.getElementById('pro-price').innerHTML = prices.plans.monthly.pro;

    // creating data-set price to extract values latter
    document.getElementById('arcade').dataset.price = prices.plans.monthly.arcade;
    document.getElementById('advanced').dataset.price = prices.plans.monthly.advanced;
    document.getElementById('pro').dataset.price = prices.plans.monthly.pro;

    // changing duration in dom to month
    let yearMonthArray = Array.from(document.getElementsByClassName("per-year-month"));

    yearMonthArray.forEach((element, index) => {
        element.innerHTML = "mo"
    });
}
function planYearly() {
    // change css
    document.getElementsByClassName('yearly')[0].classList.add('slided');
    document.getElementsByClassName('monthly')[0].classList.remove('slided');


    // changing master Object planDuration according to slider
    masterObject.planDuration = "yearly";


    // reseting masterObject prices and duration if fluctuated
    if (masterObject.planPrice == prices.plans.monthly.pro || masterObject.planPrice == prices.plans.yearly.pro) {
        masterObject.planPrice = prices.plans.yearly.pro;
        // masterObject.planDuration = "yearly";
    }
    else if (masterObject.planPrice == prices.plans.monthly.advanced || masterObject.planPrice == prices.plans.yearly.advanced) {
        masterObject.planPrice = prices.plans.yearly.advanced;
        // masterObject.planDuration = "yearly";
    }
    else {
        masterObject.planPrice = prices.plans.yearly.arcade;
        // masterObject.planDuration = "yearly";
    }

    // show yearly price offer and adding data-set duration for later use
    const yearlyOffer = Array.from(document.getElementsByClassName('yearly-2month-offer'));

    yearlyOffer.forEach((element, index) => {
        element.style.visibility = "visible";
        element.dataset.duration = "yearly";
    });

    // setting yearly prices in cards
    document.getElementById('arcade-price').innerHTML = prices.plans.yearly.arcade;
    document.getElementById('advanced-price').innerHTML = prices.plans.yearly.advanced;
    document.getElementById('pro-price').innerHTML = prices.plans.yearly.pro;

    // creating data-set price to extract values latter
    document.getElementById('arcade').dataset.price = prices.plans.yearly.arcade;
    document.getElementById('advanced').dataset.price = prices.plans.yearly.advanced;
    document.getElementById('pro').dataset.price = prices.plans.yearly.pro;

    // changing duration in dom to year
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

function step5() {
    highlightStep(5);
    document.getElementsByClassName('thank-u-container')[0].addEventListener('click', (e) => {
        step4();
    });

}


function step4() {
    highlightStep(4);

    document.getElementById('goback-step4').addEventListener('click', (e) => { step3() });

    document.getElementById('change-btn').addEventListener('click', (e) => { step2() });

    const planDuration = masterObject.planDuration;
    const basePrice = masterObject.planPrice;

    let grandTotal = 0;

    let currentMasterObject = {
        planName: "",
        planDuration: "",
        planDurationShortHand: "",
        planPrice: 9,
        addons: [],
        total: 9
    }

    // setting plan price using masterObject price
    currentMasterObject.planPrice = masterObject.planPrice;

    // update grand total
    grandTotal += masterObject.planPrice;

    // setting plan name using masterObject price
    if (masterObject.planPrice == prices.plans.monthly.pro || masterObject.planPrice == prices.plans.yearly.pro) {
        currentMasterObject.planName = "Pro";
    }
    else if (masterObject.planPrice == prices.plans.monthly.advanced || masterObject.planPrice == prices.plans.yearly.advanced) {
        currentMasterObject.planName = "Advanced";
    }
    else {
        currentMasterObject.planName = "Arcade";
    }

    // setting planDuration and planDurationShortHand
    if (masterObject.planDuration == "monthly") {
        currentMasterObject.planDuration = "month";
        currentMasterObject.planDurationShortHand = "mo"
    }
    else if (masterObject.planDuration == "yearly") {
        currentMasterObject.planDuration = "Year";
        currentMasterObject.planDurationShortHand = "yr"
    }

    // setting addons if any
    const allAddons = masterObject.addons;
    console.log(allAddons);
    for (const addon in allAddons) {
        if (allAddons[addon] == true) {
            let tempObj = {
                addonName: "",
                addonPrice: 0
            };
            // console.log(addon);
            if (addon == 'onlineService') {
                tempObj.addonName = "online services";
                if (masterObject.planDuration == "monthly") {
                    tempObj.addonPrice = prices.addons.monthly.onlineService;
                }
                else {
                    tempObj.addonPrice = prices.addons.yearly.onlineService;
                }
            }
            else if (addon == 'largerStorage') {
                tempObj.addonName = "larger storage";
                if (masterObject.planDuration == "monthly") {
                    tempObj.addonPrice = prices.addons.monthly.largerStorage;
                }
                else {
                    tempObj.addonPrice = prices.addons.yearly.largerStorage;
                }
            }
            else if (addon == 'customizableProfile') {
                tempObj.addonName = "customizable profile";
                if (masterObject.planDuration == "monthly") {
                    tempObj.addonPrice = prices.addons.monthly.customizableProfile;
                }
                else {
                    tempObj.addonPrice = prices.addons.yearly.customizableProfile;
                }
            }
            // update grand total
            grandTotal += tempObj.addonPrice;

            // update currentMasterObject
            currentMasterObject.addons.push(tempObj);
        }
    }

    document.getElementById('confirm-btn').addEventListener('click', (e) => {
        step5();
    })

    // setting elements in document
    document.getElementById('bill-plan-name').innerText = `${currentMasterObject.planName}(${currentMasterObject.planDuration})`;
    document.getElementById('bill-plan-price').innerText = `$${currentMasterObject.planPrice}/${currentMasterObject.planDurationShortHand}`;

    let addonArea = document.getElementsByClassName("bill-add-ons-detail")[0];
    // console.log(addonArea);
    addonArea.innerHTML = '';
    const currentAddOns = currentMasterObject.addons;
    for (const addon in currentAddOns) {
        let newAddOn = document.createElement('div');
        newAddOn.classList.add('bill-add-ons');

        let newAddOnName = document.createElement('span');
        newAddOnName.classList.add('bill-add-ons-name');
        newAddOnName.innerText = `${currentAddOns[addon]['addonName']}`

        newAddOn.appendChild(newAddOnName);

        let newAddOnPrice = document.createElement('span');
        newAddOnPrice.classList.add('bill-add-ons-price');
        newAddOnPrice.innerText = `+$${currentAddOns[addon]['addonPrice']}/${currentMasterObject.planDurationShortHand}`

        newAddOn.appendChild(newAddOnPrice);

        addonArea.appendChild(newAddOn);
    }

    let totalBillDuration = document.getElementById('total-duration');
    totalBillDuration.innerText = `Total(per ${currentMasterObject.planDuration})`


    let grandTotalArea = document.getElementById('grand-total');

    grandTotalArea.innerText = `$${grandTotal}/${currentMasterObject.planDurationShortHand}`;
}







function step3() {

    highlightStep(3);
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

    // set prices in dom 
    document.getElementById('online-service-price').innerText = currentRates.onlineService;
    document.getElementById('larger-storage-price').innerText = currentRates.largerStorage;
    document.getElementById('customizable-profile-price').innerText = currentRates.customizableProfile;

    // set duration in dom
    let addonDurationArr = Array.from(document.getElementsByClassName('add-ons-duration'))
    addonDurationArr.forEach((element, index) => {
        element.innerText = duration;
    });

    // listening goback btn at step3
    const gobackBtn = document.getElementById('goback-step3');

    gobackBtn.addEventListener('click', (e) => {
        step2();
    })

    // listening next step btn at step3
    const nextBtnStep3 = document.getElementById('next-btn-step3');

    nextBtnStep3.addEventListener('click', (e) => {
        step4();
    })


    const onlineService = document.getElementById('online-service');
    const largerStorage = document.getElementById('larger-storage');
    const customizableProfile = document.getElementById('customizable-profile');

    // only for phase when step3 is loaded
    // check if being checked already
    // change only values if duration changes

    // let currentYearlyChecks = masterObject.addons.yearly;
    // let currentMonthlyChecks = masterObject.addons;
    let currentlyChecked = masterObject.addons;

    for (const addons in currentlyChecked) {
        // console.log(addons);
        if (currentlyChecked[addons] == true) {
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
        else if (currentlyChecked[addons] == false) {
            if (addons == "onlineService") {
                onlineService.checked = false;
                onlineService.parentElement.parentElement.classList.remove('checkedHighlight')
            }
            else if (addons == "largerStorage") {
                largerStorage.checked = false;
                largerStorage.parentElement.parentElement.classList.remove('checkedHighlight')
            }
            else if (addons == "customizableProfile") {
                customizableProfile.checked = false;
                customizableProfile.parentElement.parentElement.classList.remove('checkedHighlight')
            }
        }
    }

    // console.log(onlineService, largerStorage, customizableProfile);

    // listening parent of all checkboxes and changing masterObject and dom accordingly
    const addOnsSelectionArea = document.getElementsByClassName('add-ons-selection-field')[0];
    addOnsSelectionArea.addEventListener('click', (e) => {
        if (e.target.hasAttribute("data-tagname")) {
            const addon = e.target.value;
            // highlighting dom and updating masterObject
            if (e.target.checked) {
                console.log("checked")
                e.target.parentElement.parentElement.classList.add('checkedHighlight');
                if (addon == "online-service") {
                    masterObject.addons.onlineService = true;
                }
                else if (addon == "larger-storage") {
                    masterObject.addons.largerStorage = true;
                }
                else if (addon == "customizable-profile") {
                    masterObject.addons.customizableProfile = true;
                }
            }
            else {
                e.target.parentElement.parentElement.classList.remove('checkedHighlight');
                if (addon == "online-service") {
                    masterObject.addons.onlineService = false;
                }
                else if (addon == "larger-storage") {
                    masterObject.addons.largerStorage = false;
                }
                else if (addon == "customizable-profile") {
                    masterObject.addons.customizableProfile = false;
                }
            }
        }
        // console.log(masterObject.addons);
    })
}


function step2() {

    // formArea.innerHTML = `

    // `

    highlightStep(2);

    // listening goback btn at step 2;
    const gobackBtn = document.getElementById('goback-step2');

    gobackBtn.addEventListener('click', (e) => {
        step1();
    })

    // listening to year month slider  and changing dom and master object accordingly
    let slider = document.getElementById('slider');

    if (masterObject.planDuration == "monthly") {
        slider.checked = false;
        planMonthly();
    } else {
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

    // checking for default checked plans
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

    // adding click on plan cards
    let planCards = Array.from(document.getElementsByClassName("check-plan"));
    planCards.forEach(element => {
        element.addEventListener('click', (e) => {
            // marking checkbox and adding border to target
            removeBorderPlan();
            e.target.checked = true;
            e.target.nextElementSibling.firstElementChild.classList.add('add-border-plan-card');

            // updating masterObject simultaniously
            const price = e.target.getAttribute('data-price');
            const duration = document.getElementsByClassName('yearly-2month-offer')[0].getAttribute('data-duration');
            masterObject.planDuration = duration;
            masterObject.planPrice = parseInt(price);

        })
    });

    // listening to next step btn
    const nextBtnStep2 = document.getElementById('next-btn-step2');
    nextBtnStep2.addEventListener('click', (e) => {
        console.log(masterObject);
        step3();
    })
}



function step1() {
    highlightStep(1);

    // hide go back btn
    document.getElementById('go-back-step1').style.visibility = 'hidden';

    // check for previously filled values
    if (masterObject.userName !== "") {
        document.getElementById('user-name').value = masterObject.userName;
    }
    if (masterObject.userEmail !== "") {
        document.getElementById('user-email').value = masterObject.userEmail;
    }
    if (masterObject.userNumber !== "") {
        document.getElementById('user-phone').value = masterObject.userNumber;
    }

    // listening next-btn click
    const nextBtn = document.getElementById('next-btn-step1');

    nextBtn.addEventListener('click', validation);
}

step1();