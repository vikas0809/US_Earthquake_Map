

//L.geoJSON(data).addTo(map);

// Add a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
  // Define streetmap and darkmap layers
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

//let routeData="https://raw.githubusercontent.com/vikas0809/US_Earthquake_Map/Mapping_Single_Points/Simple_Map/static/js/torontoRoutes.json";
let neighbourhoodData="https://raw.githubusercontent.com/vikas0809/US_Earthquake_Map/Mapping_GeoJSON_LineStrings/Simple_Map/static/js/torontoNeighborhoods.json";
// Create a base layer that holds both maps.
let baseMaps = {
  Streets: streets,
  Sattelite : satteliteStreets
};

// Create the map object with a center and zoom level.
let map = L.map("map", {
  center: [43.7, -79.3],
  zoom: 10,
  layers: [satteliteStreets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 1,
  fillColor : "yellow"
  
}

// Grabbing our GeoJSON data.
d3.json(neighbourhoodData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data,{
  style: myStyle,
  onEachFeature: function(feature, layer) {
    console.log(layer);
    layer.bindPopup("<h2>"+"Neighbourhood: "+feature.properties.AREA_NAME
                    +"</h2><hr> Neighbourhood Code: "+feature.properties.AREA_S_CD
    );
   }
}).addTo(map);
});








 /*L.geoJson(data, {
  pointToLayer: function(feature, latlng) {
    console.log(feature);
    return L.marker(latlng).bindPopup("<h2>" + feature.properties.name + "</h2>" + "<hr>" +feature.properties.city+", "+feature.properties.country );
   }
}).addTo(map);

L.geoJSON(data, {
  onEachFeature: function(feature, layer) {
    console.log(layer);
    layer.bindPopup("<h2>"+"Airport Code: "+feature.properties.faa
                    +"</h2><hr> Airport Name: "+feature.properties.name
    );
   }
}).addTo(map);*/