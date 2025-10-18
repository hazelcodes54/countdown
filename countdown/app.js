const months = [
  "January",
  "February",
  "March", 
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4'); // Select the <h4> inside each .deadline-format

let futureDate = new Date(2024, 5, 9, 11, 30, 0); // Set future date (note: months are 0-indexed)
console.log(futureDate);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];
const date = futureDate.getDate();

const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year}, ${hours}:${minutes < 10 ? '0' : ''}${minutes}am`;

// future time in milliseconds
const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;

  if (t <= 0) {
    clearInterval(countdown);
    deadline.innerHTML = "<h4 class='expired'>The giveaway has ended!</h4>";
    return;
  }

  // 1s = 1000ms
  // 1 min = 60s
  // 1 hr = 60min
  // 1 day = 24hrs

  // values in ms
  const oneDay = 24 * 60 * 60 * 1000;  // This will give you how many ms is in one day
  const oneHour = 60 * 60 * 1000;      // This will give you how many ms in one hour
  const oneMinute = 60 * 1000;         // This will give you how many ms in a minute

  // calculate all values
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  // set values array
  const values = [days, hours, minutes, seconds];

  function format(item) {
    if (item < 10) {
      return `0${item}`;
    }
    return item;
  }
  
  items.forEach(function(item, index) {
    item.textContent = format(values[index]); 
  });
  if (t < 0) {
    clearInterval(countdown)
  }
}


getRemainingTime();
// Update the countdown every second
const countdown = setInterval(getRemainingTime, 1000);
