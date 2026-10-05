let cities = [
  {
    arabicname: "القصيم",
    name: "Al Qassim",
  },
  {
    arabicname: "الدمام",
    name: "Dammam",
  },
  {
    arabicname: "الرياض",
    name: "Riyadh",
  },
  {
    arabicname: "جدة",
    name: "Jeddah",
  },
  {
    arabicname: "مكة المكرمة",
    name: "Makkah",
  },
  {
    arabicname: "المدينة المنورة",
    name: "Madinah",
  },
  {
    arabicname: "الطائف",
    name: "Taif",
  },
  {
    arabicname: "تبوك",
    name: "Tabuk",
  },
  {
    arabicname: "حائل",
    name: "Hail",
  },
  {
    arabicname: "جازان",
    name: "Jazan",}
];
for (let city of cities) {
  let option = `
  <option >${city.arabicname}</option>
  
  `;
  document.getElementById("cities").innerHTML += option;
}
document.getElementById("cities").addEventListener("change", function () {
  document.getElementById("city").innerHTML = this.value
  let cityName = "";
  for (let city of cities) {
    if (city.arabicname == this.value) {
      cityName = city.name;
    }
  }
  getPrayerTimes(cityName);

  console.log(this.value);
});

function getPrayerTimes(cityName) {
  let params = {
    city: cityName,
    country: "SA",
  };
  axios
    .get("https://api.aladhan.com/v1/timingsByCity", {
      params: params,
    })
    .then((response) => {
      const timings = response.data.data.timings;
      fillTimeFORPrayer("fajr", timings.Fajr);
      fillTimeFORPrayer("sunrise", timings.Sunrise);
      fillTimeFORPrayer("dhuhr", timings.Dhuhr);
      fillTimeFORPrayer("asr", timings.Asr);
      fillTimeFORPrayer("maghrib", timings.Maghrib);
      fillTimeFORPrayer("isha", timings.Isha);

      const readableDate = response.data.data.date.readable;
      const weekday = response.data.data.date.hijri.weekday.ar;
      document.getElementById("date").textContent =
        `${weekday} - ${readableDate}`;
    })
    .catch((error) => {
      console.error(error);
    });
}
getPrayerTimes("Riyadh");

function fillTimeFORPrayer(id, time) {
  document.getElementById(id).innerHTML = time;
}
