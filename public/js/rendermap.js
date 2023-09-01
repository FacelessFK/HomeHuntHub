let map = L.map("map").setView([51.505, -0.09], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap"
}).addTo(map);

var greenIcon = L.icon({
    iconUrl: "../img/house-building-icon.png",

    iconSize: [20, 20], // size of the icon
    shadowSize: [50, 64], // size of the shadow

    shadowAnchor: [4, 62], // the same for the shadow
    popupAnchor: [-3, -10] // point from which the popup should open relative to the iconAnchor
});

var marker = L.marker([51.5, -0.09], { icon: greenIcon }).addTo(map);
marker.bindPopup("<b>2,100</b><br>فروش").openPopup();
var popup = L.popup()
    .setLatLng([51.513, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map);
