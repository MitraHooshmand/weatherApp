let myDate = new Date();
let weekDay = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Satur"];

//////// putting  0  befor minutes
if (myDate.getMinutes() < 10) {
  document.getElementById("date").innerHTML = `${
    weekDay[myDate.getDay()]
  } ${myDate.getHours()}:0${myDate.getMinutes()}`;
} else {
  document.getElementById("date").innerHTML = `${
    weekDay[myDate.getDay()]
  } ${myDate.getHours()}:${myDate.getMinutes()}`;
}
/////////////////////  Type City Name
function showCityTemp(response) {
  let h2 = document.querySelector("h2");
  let h3 = document.querySelector("h3");
  let showTemp = document.querySelector("#showTemp");
  let Precipitation = document.querySelector("#Precipitation");
  let Wind = document.querySelector("#Wind");
  h2.innerHTML = response.data.name;
  h3.innerHTML = response.data.weather[0].description;
  showTemp.innerHTML = Math.round(response.data.main.temp);
  Precipitation.innerHTML = response.data.main.humidity;
  Wind.innerHTML = Math.round(response.data.wind.speed);
  console.log(response.data);
}

function onLoadDataTemp(inputText) {
  let apiKey = "9a740d7fbaf516b932eb59f405516e16";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputText}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemp);
}

function fetchText(param) {
  param.preventDefault();
  let inputText = document.querySelector("#exampleDataList").value;
  onLoadDataTemp(inputText);
  //let h2 = document.querySelector("h2");
  // h2.innerHTML = inputText;
}
//////////////////// Current Temp Data
function showAllCurrentData(position) {
  // alert("bye");
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "9a740d7fbaf516b932eb59f405516e16";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemp);
}

function showCurrentlocationTemp(param) {
  param.preventDefault();
  //alert("hi");
  navigator.geolocation.getCurrentPosition(showAllCurrentData);
}
let flag = 0;
function chgToFahren(event) {
  if (flag == 0) {
    event.preventDefault();
    let tempPlaceholder = document.querySelector("#showTemp");
    let tofahrenheit = Math.round((tempPlaceholder.innerHTML * 9) / 5 + 32);
    tempPlaceholder.innerHTML = tofahrenheit;
    flag = 1;
  }
}
let faren = document.querySelector("#fahrenheit");
faren.addEventListener("click", chgToFahren);

function chgTocelsius(event) {
  if (flag == 1) {
    event.preventDefault();
    let tempPlaceholder = document.querySelector("#showTemp");
    let toCelsius = Math.round(((tempPlaceholder.innerHTML - 32) * 5) / 9);
    tempPlaceholder.innerHTML = toCelsius;
    flag = 0;
  }
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", chgTocelsius);
//////////////////// C|F  End

let searchBox = document.querySelector("#searchForm");
searchBox.addEventListener("submit", fetchText);

let currentTemp = document.querySelector(".currentTemp");
currentTemp.addEventListener("click", showCurrentlocationTemp);

//////////////////// C|F Start

onLoadDataTemp("Iran");
