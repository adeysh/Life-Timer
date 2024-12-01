const cog = document.getElementById("cog");
const dateInputDiv = document.getElementById("date");
const submitBtn = document.getElementById("submit");
let showAge = document.getElementById("showAge");
let showAgeContainer = document.getElementById("container");

cog.addEventListener("click", () => {
    if (dateInputDiv.style.display === "none") {
        dateInputDiv.style.display = "block";
        dateInputDiv.value = "";
        submitBtn.style.display = "none";
    } else {
        dateInputDiv.style.display = "none";
        submitBtn.style.display = "none";
    }
});

dateInputDiv.addEventListener("change", () => {
    if (dateInputDiv.value) {
        submitBtn.style.display = "block";
    } else {
        submitBtn.style.display = "none";
    }
});

function calculateAge() {
    DateOfBirth = new Date(dateInputDiv.value);

    // get dob details
    const getBirthYear = DateOfBirth.getFullYear();
    const getBirthMonth = DateOfBirth.getMonth() + 1;
    const getBirthDate = DateOfBirth.getDate();
    const getBirthHours = DateOfBirth.getHours();
    const getBirthMinutes = DateOfBirth.getMinutes();
    const getBirthSeconds = DateOfBirth.getSeconds();

    console.log(getBirthYear, "-years", getBirthMonth, "months-", getBirthDate, "days ", getBirthHours, "hours:", getBirthMinutes, "minutes:", getBirthSeconds);

    // get current date details
    const getCurrentYear = new Date().getFullYear();
    const getCurrentMonth = new Date().getMonth() + 1;
    const getCurrentDate = new Date().getDate();
    const getCurrentHours = new Date().getHours();
    const getCurrentMinutes = new Date().getMinutes();
    const getCurrentSeconds = new Date().getSeconds();

    console.log(getCurrentYear, "years-", getCurrentMonth, "months-", getCurrentDate, "days ", getCurrentHours, "hours:", getCurrentMinutes, "minutes:", getCurrentSeconds);

    // seconds diff calculate
    let diffSeconds = getCurrentSeconds - getBirthSeconds;
    let borrowMinutes = 0;
    if (diffSeconds < 0) {
        diffSeconds += 60;
        borrowMinutes = 1;
    }

    // minutes diff calculate
    let diffMinutes = getCurrentMinutes - getBirthMinutes - borrowMinutes;
    let borrowHours = 0;
    if (diffMinutes < 0) {
        diffMinutes += 60;
        borrowHours = 1;
    }

    // hours diff calculate
    let diffHours = getCurrentHours - getBirthHours - borrowHours;
    let borrowDays = 0;
    if (diffHours < 0) {
        diffHours += 24;
        borrowDays = 1;
    }

    // date diff calculate
    let diffDate = getCurrentDate - getBirthDate - borrowDays;
    let borrowMonths = 0;

    if (diffDate < 0) {
        previousMonth = new Date(getCurrentYear, getCurrentMonth - 1, 0);
        diffDate += previousMonth.getDate();
        borrowMonths = 1;
    }

    // months diff calculate
    let diffMonths = getCurrentMonth - getBirthMonth - borrowMonths;
    let borrowYears = 0;
    if (diffMonths < 0) {
        diffMonths += 12;
        borrowYears = 1;
    }

    // years diff calculate
    const diffYears = getCurrentYear - getBirthYear - borrowYears;

    return {
        diffYears: diffYears,
        diffMonths: diffMonths,
        diffDate: diffDate,
        diffHours: diffHours,
        diffMinutes: diffMinutes,
        diffSeconds: diffSeconds,
    };
}

function updateAge() {
    let calculatedAge = calculateAge();

    console.log(calculatedAge.diffYears, "years-", calculatedAge.diffMonths, "months-", calculatedAge.diffDate, "days ", calculatedAge.diffHours, "hours:", calculatedAge.diffMinutes, "minutes:", calculatedAge.diffSeconds);

    // Clear the previous age display
    let existingAgeElement = document.getElementById("age");
    let existingAgeDetail = document.getElementById("ageDetail");
    if (existingAgeElement || existingAgeDetail) {
        existingAgeElement.remove();
        existingAgeDetail.remove();
    }


    const age = document.createElement("div");
    age.setAttribute("id", "age");
    age.style.width = "700px";
    age.style.height = "100px";
    age.style.display = "flex";
    age.style.alignItems = "center";
    age.style.justifyContent = "center";

    let ageText = document.createElement("h1");
    ageText.style.fontSize = "80px";
    ageText.style.color = "white";
    ageText.style.letterSpacing = "14px";
    ageText.innerText = `${calculatedAge.diffYears}.${calculatedAge.diffMonths}.${calculatedAge.diffDate}.${calculatedAge.diffHours}:${calculatedAge.diffMinutes}:${calculatedAge.diffSeconds}`;
    age.appendChild(ageText);
    showAgeContainer.appendChild(age);

    const ageDetail = document.createElement("h1");
    ageDetail.setAttribute("id", "ageDetail");
    ageDetail.innerText = "Years Months Days Hours Minutes Seconds";
    ageDetail.style.fontSize = "30px";
    ageDetail.style.wordSpacing = "26px";
    showAgeContainer.appendChild(ageDetail);
}

submitBtn.addEventListener("click", function submitDOB() {
    showAge.innerText = "How Much Life Journey Covered, Till Now!!";
    updateAge();
    setInterval(updateAge, 1000);
});


