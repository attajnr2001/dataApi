function chartJs() {
   const ctx = document.getElementById("myChart");
   const xlabels = [];
   const ylabels = [];

   function showChart() {
     getData();
     new Chart(ctx, {
       type: "bar",
       data: {
         labels: xlabels,
         datasets: [
           {
             label: "# of Votes",
             data: ylabels,
             borderWidth: 1,
           },
         ],
       },
       options: {
         scales: {
           y: {
             beginAtZero: true,
           },
         },
       },
     });
   }

   showChart();
   async function getData() {
     const response = await fetch("/resources/ZonAnn.Ts+dSST (1).csv");
     const data = await response.text();

     const table = data.split("\n").slice(1);
     table.forEach((row) => {
       const year = row.split(",")[0];
       xlabels.push(year);
       const temp = row.split(",")[1];
       ylabels.push(temp);
     });
   }
 }

 function leafletJs() {
   async function getCurrentPosition() {
     return new Promise((resolve, reject) => {
       if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(
           (position) => {
             const latitude = position.coords.latitude;
             const longitude = position.coords.longitude;
             resolve({ latitude, longitude });
           },
           (error) => {
             reject(error);
           }
         );
       } else {
         reject("Geolocation is not supported by this browser.");
       }
     });
   }

   async function getValue() {
     try {
       const position = await getCurrentPosition();
       const lat = position.latitude;
       const lon = position.longitude;

       return { lat, lon };
     } catch (error) {
       console.log(error);
     }
   }

   async function myPostion() {
     const position = await getValue();
     const map = L.map("map").setView([position.lat, position.lon], 13);
     L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
       maxZoom: 19,
       attribution:
         '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
     }).addTo(map);

     var marker = L.marker([position.lat, position.lon]).addTo(map);

     var circle = L.circle([position.lat, position.lon], {
       color: "red",
       fillColor: "#f03",
       fillOpacity: 0.5,
       radius: 500,
     }).addTo(map);

     var popup = L.popup()
       .setLatLng([position.lat, position.lon])
       .setContent("I am here")
       .openOn(map);
   }

   setInterval(() => {
     myPostion();
   }, 1000);
 }


 leafletJs();