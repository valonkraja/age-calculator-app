const dayLabel = document.querySelector(".day-label");
const monthLabel = document.querySelector(".month-label");
const yearLabel = document.querySelector(".year-label");

const errorDay = document.querySelector(".error-day");
const errorMonth = document.querySelector(".error-month");
const errorYear = document.querySelector(".error-year");

const dayVal = document.querySelector(".day-val");
const monthVal = document.querySelector(".month-val");
const yearVal = document.querySelector(".year-val");

const btn = document.querySelector(".arrow");

const days = document.querySelector(".days");
const months = document.querySelector(".months");
const years = document.querySelector(".years");

const millsToDays = (mills) => Math.floor(mills / (1000 * 60 * 60 * 24));

const leapYear = (year) => {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  else {
    return false;
  }
};

const validDay = function (day, month, year) {
  const daysInMonth = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31,
  };
  leapYear(year) ? (daysInMonth[2] = 29) : daysInMonth;

  if (day > daysInMonth[month]) return false;

  return true;
};

const clearErrors = function () {
  errorDay.innerHTML = "";
  errorMonth.innerHTML = "";
  errorYear.innerHTML = "";
  days.innerHTML = "- - ";
  months.innerHTML = "- - ";
  years.innerHTML = "- - ";
  dayLabel.classList.remove("error");
  monthLabel.classList.remove("error");
  yearLabel.classList.remove("error");
};

btn.addEventListener("click", function () {
  clearErrors();
  let day = +dayVal.value;
  let month = +monthVal.value;
  let year = +yearVal.value;

  console.log(day, month, year);

  if (year < 100) {
    errorYear.innerHTML = "Year must be over 100";
    yearLabel.classList.add("error");
    return false;
  }

  if (month > 12 || isNaN(month)) {
    errorMonth.innerHTML = "Must be a valid month";
    monthLabel.classList.add("error");
    return false;
  }

  if (!validDay(day, month, year)) {
    errorDay.innerHTML = "Must be a valid day";
    dayLabel.classList.add("error");
    return false;
  }

  let date = new Date(`${month}-${day}-${year}`);

  if (isNaN(date.getTime())) {
    errorDay.innerHTML = "Invalid date";
    dayLabel.classList.add("error");
    return false;
  }

  let currentDate = new Date();

  let difference = millsToDays(currentDate - date);
  console.log(difference);
  if (difference > 0) {
    let yearDifference = Math.floor(difference / 365);
    let monthDifference = Math.floor((difference - yearDifference * 365) / 30);
    let dayDifference =
      difference - (yearDifference * 365 + monthDifference * 30);

    days.innerHTML = dayDifference + " ";
    months.innerHTML = monthDifference + " ";
    years.innerHTML = yearDifference + " ";
  } else {
    yearLabel.classList.add("error");
    errorYear.innerHTML = "Must be in the past";
  }
});
