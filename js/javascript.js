let myDate = new Date();
let weekDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
function forcastDate(timeZoneForcast){
  let dayarrayForcast = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return dayarrayForcast[new Date(timeZoneForcast*10000).getDay()];
}
function ForcastData(responseForcast) {
 // console.log(responseForcast.data);
  let forcastPlaceHolder = document.querySelector("#forcastData");
  let forcastMakeData = `<div class="row">`;
  let days = responseForcast.data.daily;
  days.forEach((day, index) => {
    console.log(day);
    forcastMakeData +=
     
      `<div class="col-4"><p class="nextDays">${forcastDate(day.dt)}</p></div>
            <div class="col-4">
              <p class="nextDays">
                <span class="weather-forcast-max"> ${Math.round(
                  day.temp.max
                )}°</span> |<span  class="weather-forcast-min" > ${Math.round(
        day.temp.min
      )}°</span>
              </p>
            </div>
            <div class="col-4">
              <p class="nextDays">
                <img src="http://openweathermap.org/img/wn/${
                  day.weather[0].icon
                }.png" class="forcastImage">
              </p>
            </div>`;
  });
  forcastMakeData = forcastMakeData + `</div >`;
  forcastPlaceHolder.innerHTML = forcastMakeData;
}

function forcastApiSet(lat, lon) {
  let latForcast = lat;
  let lonForcast = lon;
  let apiKey = "9a740d7fbaf516b932eb59f405516e16";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latForcast}&lon=${lonForcast}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(ForcastData);
}

function showCityTemp(response) {
  //console.log(`http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`);

  let h2 = document.querySelector("h2");
  let country = document.querySelector("#showCountry");
  let h3 = document.querySelector("h3");
  let showTemp = document.querySelector("#showTemp");
  let Precipitation = document.querySelector("#Precipitation");
  let Wind = document.querySelector("#Wind");
  let icon = document.querySelector("#imgIcon");
  country.innerHTML = ` ${response.data.sys.country}`;
  h2.innerHTML = `${response.data.name},`;
  h3.innerHTML = response.data.weather[0].description;
  showTemp.innerHTML = Math.round(response.data.main.temp);
  Precipitation.innerHTML = response.data.main.humidity;
  Wind.innerHTML = Math.round(response.data.wind.speed);
  icon.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  ////// line below sending lat & lon of this city to a function to get the forcast API
  forcastApiSet(response.data.coord.lat, response.data.coord.lon);
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
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "9a740d7fbaf516b932eb59f405516e16";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemp);
  //console.log(`${lat}aaaaa`);
  //console.log(`${lon}aaaaa`);
}

function showCurrentlocationTemp(param) {
  param.preventDefault();
  navigator.geolocation.getCurrentPosition(showAllCurrentData);
}
let flag = 0;
function chgToFahren(event) {
  if (flag == 0) {
    event.preventDefault();
    let tempPlaceholder = document.querySelector("#showTemp");
    let tofahrenheit = Math.round((tempPlaceholder.innerHTML * 9) / 5 + 32);
    tempPlaceholder.innerHTML = tofahrenheit;
    faren.classList.add("active");
    celsius.classList.remove("active");
    flag = 1;
  }
}

function chgTocelsius(event) {
  if (flag == 1) {
    event.preventDefault();
    let tempPlaceholder = document.querySelector("#showTemp");
    let toCelsius = Math.round(((tempPlaceholder.innerHTML - 32) * 5) / 9);
    tempPlaceholder.innerHTML = toCelsius;
    faren.classList.remove("active");
    celsius.classList.add("active");
    flag = 0;
  }
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", chgTocelsius);

let faren = document.querySelector("#fahrenheit");
faren.addEventListener("click", chgToFahren);
////////////////////

let searchBox = document.querySelector("#searchForm");
searchBox.addEventListener("submit", fetchText);

let currentTemp = document.querySelector(".currentTemp");
currentTemp.addEventListener("click", showCurrentlocationTemp);

////////////////////

onLoadDataTemp("Iran");
//ForcastData();
