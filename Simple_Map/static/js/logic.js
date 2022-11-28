

//L.geoJSON(data).addTo(map);

// Add a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
  // Define streetmap and darkmap layers
  var lightmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v11',
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v10',
    accessToken: API_KEY
  });

let routeData="https://raw.githubusercontent.com/vikas0809/US_Earthquake_Map/Mapping_Single_Points/Simple_Map/static/js/torontoRoutes.json";
// Create a base layer that holds both maps.
let baseMaps = {
  Light: lightmap,
  Dark: darkmap
};

// Create the map object with a center and zoom level.
let map = L.map("map", {
  center: [44.0, -80.0],
  zoom: 4,
  layers: [lightmap]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}

// Grabbing our GeoJSON data.
d3.json(routeData).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data,{
  style: myStyle,
  onEachFeature: function(feature, layer) {
    console.log(layer);
    layer.bindPopup("<h2>"+"Airline: "+feature.properties.airline+" "+feature.properties.airline_id
                    +"</h2><hr> Destination: "+feature.properties.dst
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