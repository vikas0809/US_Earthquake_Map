var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v12',
    accessToken: API_KEY
  });

  var satteliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-streets-v12',
    accessToken: API_KEY
  });


let earthquakeData="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Create a base layer that holds both maps.
let baseMaps = {
  Streets: streets,
  Sattelite : satteliteStreets
};

// Create the map object with a center and zoom level.
let map = L.map("map", {
    center: [43.7, -79.3],
    zoom: 4,
    layers: [streets]
  });

  // Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Grabbing our GeoJSON data.
d3.json(earthquakeData).then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into a function
  // to calculate the radius. 
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: "#ffae42",
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 5;
  }
  
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data,{
  pointToLayer: function(feature,latlng) {
    console.log(data);
    return L.circleMarker(latlng);
  },
  style:styleInfo
}).addTo(map);
});