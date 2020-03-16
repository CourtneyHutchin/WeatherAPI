window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimeZone = document.querySelector(".location-timezone");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      // This allows you to use the API
      const proxy = "https://cors-anywhere.herokuapp.com/";
      // This the the key that the website gives me
      const api = `${proxy}https://api.darksky.net/forecast/b50354eb1b315ad48d51d6a32d0822a7/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary } = data.currently;
          // SET DOM elems from the API
          temperatureDegree.textContent = temperature + " F";
          temperatureDescription.textContent = summary;
          locationTimeZone.textContent = data.timezone;

          if (temperature <= 50) {
            alert("Bundle up!")
          }

          if (temperature > 50) {
            alert("Tee shirt time!");
          }

        });
    });
  }
});
