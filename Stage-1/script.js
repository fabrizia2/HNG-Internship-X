// JavaScript to update the current day and UTC time 
function updateCurrentDayAndTime() {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date();
    const currentDay = daysOfWeek[date.getUTCDay()];

    const currentUTCTime = date.toISOString().substr(11, 12);
    document.getElementById("currentDayOfTheWeek").textContent = currentDay;
    document.getElementById("currentUTCTime").textContent = currentUTCTime;
}

setInterval(updateCurrentDayAndTime, 100); // Update every 100 milliseconds (0.1 seconds)

// Call the function initially
updateCurrentDayAndTime();

// Get references to DOM elements
const body = document.querySelector("body"),
  
  modeSwitch = document.querySelector(".mode-switch");

// check if the mode is already set to "Dark Mode" in localStorage
if (localStorage.getItem("mode") === "Dark Mode") {
  // add "dark" class to body and set modeSwitch text to "Light Mode"
  body.classList.add("dark");
  modeSwitch.textContent = "Light Mode";
}

// add a click event listener to modeSwitch
modeSwitch.addEventListener("click", () => {
  // toggle the "dark" class on the body element
  body.classList.toggle("dark");
  // check if the "dark" class is currently present on the body element
  const isDarkMode = body.classList.contains("dark");
  // set modeSwitch text based on "dark" class presence
  modeSwitch.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
  // set localStorage "mode" item based on "dark" class presence
  localStorage.setItem("mode", isDarkMode ? "Dark Mode" : "Light Mode");
});