const searchBar = document.querySelector(".searchbar");
const button = document.querySelector(".button");

button.addEventListener("click", (event) => {
  //   event.preventDefault();

  validateSearch();
});

function validateSearch() {
  if (!searchBar.value) {
    alert("INPUT CITY");
  } else {
    invalidcity();
  }
}

function invalidcity() {
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchBar.value}&appid=fb40243e0de2bac1da5495114cd49780`;

  fetch(URL)
    .then((data) => data.json())
    .then((data) => {
      if (data.cod === "400" || data.cod === "401" || data.cod === "404") {
        alert("INVALID CITY");
      } else {
        fetchData();
      }
    });
}

function fetchData() {
  const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchBar.value}&appid=fb40243e0de2bac1da5495114cd49780`;

  fetch(URL)
    .then((data) => data.json())
    .then((data) => {
      let card = document.querySelector(".card");
      if (!card.classList.contains("searched")) {
        card.classList.add("searched");
      }
      let secondsearch = document.querySelector(".secondSearch");
      if (secondsearch.classList.contains("hidden")) {
        secondsearch.classList.remove("hidden");
      }
      let img = document.querySelector(".img1");
      let iconCode = data.list[0].weather[0].icon;
      img.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

      let temp = document.querySelector(".temp");
      let tempData = Math.round(data.list[0].main.temp - 273.15);
      temp.innerHTML = `${tempData}&#176;C`;

      let city = document.querySelector(".city");
      let cityData = data.city.name;
      city.innerHTML = cityData;

      let desc = document.querySelector(".desc");
      let descData = data.list[0].weather[0].description;
      desc.innerHTML = descData;

      let futureWeather = data.list;
      let parent = document.querySelector(".Next3")
      parent.innerHTML = '';
      futureWeather.slice(1).forEach((item) => {
        let theTime = new Date(item.dt * 1000)
        let realtime = theTime.toString().slice(16, 21)
        let iconcode = item.weather[0].icon;
        let temp = Math.round(item.main.temp - 273.15);
        let div = document.createElement('div');
        div.classList.add('firstone', 'me-10');
        div.innerHTML = `
        <p class="firstonetime text-white">${realtime}</p>
        <img
            class="firstoneimg"
            src="https://openweathermap.org/img/wn/${iconcode}@4x.png"
            alt=""
            width="50px"
        />
        <p class="firstonetemp text-white">${temp}&#176;C</p>
    `;
        
        parent.appendChild(div)
    });
    });
}
