const iconsEl = document.getElementById("icon-container");
const dateEl = document.getElementById("date");
const timeEl = document.getElementById("time");

const numbers = [...Array(16).keys()].map((x) => x + 1);
const shuffledNums = shuffle(numbers);

for (let i = 0; i < 16; i++) {
  const currentImg = document.createElement("img");
  currentImg.src = "icons/" + shuffledNums[i] + ".svg";

  iconsEl.appendChild(currentImg);
}

function shuffle(array) {
  let oldElement;
  for (let i = array.length - 1; i > 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    oldElement = array[i];
    array[i] = array[rand];
    array[rand] = oldElement;
  }
  return array;
}

function formatDate() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  const dayName = days[date.getDay()];

  let day = date.getDate();
  let suffix = "th";
  switch (day % 10) {
    case 1:
      if (day !== 11) suffix = "st";
      break;
    case 2:
      if (day !== 12) suffix = "nd";
      break;
    case 3:
      if (day !== 13) suffix = "rd";
      break;
  }

  return `${dayName}, ${date.toLocaleString("default", {
    month: "long",
  })} ${day}${suffix}`;
}

dateEl.innerHTML = formatDate();

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const amPm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = String(hours);

  timeEl.textContent = `${hours}:${minutes}:${seconds} ${amPm}`;
}

updateClock(); // Update clock immediately
setInterval(updateClock, 1000); // Update clock every second
