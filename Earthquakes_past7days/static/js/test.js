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

  var dark = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/dark-v11',
    accessToken: API_KEY
  });

  //Reterive the required json data
  let earthquakeData="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  let techtonicData="https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
  let majorEQdata="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

// Create a base layer that holds both maps.
let baseMaps = {
  Streets: streets,
  Sattelite : satteliteStreets,
  Dark: dark
};
// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();
let techtonicPlates = new L.layerGroup();
let majorEQ = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
  Earthquakes: earthquakes,
  TechtonicPlates : techtonicPlates,
  MajorEarthquaks: majorEQ
};

// Create the map object with a center and zoom level.
let map = L.map("map", {
    center: [43.7, -79.3],
    zoom: 4,
    layers: [streets]
  });

  // Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps,overlays).addTo(map);

// Create a legend control object.
let legend = L.control({
  position: "bottomright"
});

// Then add all the details for the legend.
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
  const magnitudes = [0, 1, 2, 3, 4, 5, 6];
  const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c",
    "#8B0000"
  ];
  // Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    div.innerHTML +=
    "<i style='background: " + colors[i] +"; fontcolor: "+colors[i] + "'  >  </i> " +
    magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
}
  return div;
};

legend.addTo(map);



// This function determines the color of the circle based on the magnitude of the earthquake.

//The scope of this fuction is changed and declared outside d3.json
// to reuse the code for other functions
function getColor(magnitude) {

  if (magnitude > 6) {
    return "#8B0000";
  }
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
}
// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.

//The scope of this fuction is changed and declared outside d3.json
// to reuse the code for other functions
function getRadius(magnitude) {
  if (magnitude === 0) {
    return 1;
  }
  return magnitude * 5;
}
// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius. 

//The scope of this fuction is changed and declared outside d3.json
// to reuse the code for other functions
function styleInfo(mag) {
  console.log(mag);
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(mag),
    color: "#000000",
    radius: getRadius(mag),
    stroke: true,
    weight: 0.5
  };
}


// Grabbing our GeoJSON earthquake data.
d3.json(earthquakeData).then(function(data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into a function
  // to calculate the radius. 

// Creating a GeoJSON layer with the retrieved data.
var magdata=0;
L.geoJSON(data,{
  
  pointToLayer: function(feature,latlng) {
    return L.circleMarker(latlng);
  },
 
  onEachFeature: function(feature,layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    magdata=feature.properties.mag;
  },
  style:styleInfo(magdata )
}).addTo(earthquakes);

earthquakes.addTo(map);
});

//creating the style for techtonic plates

let lineStyle = {
  color: "red",
  weight: 3,
  
}
  // 3. Use d3.json to make a call to get our Tectonic Plate geoJSON data.
  d3.json(techtonicData).then(function(data) {
    L.geoJSON(data,{
      pointToLayer: function(feature,latlng) {
        return L.polyline(latlng);
      },
      style:lineStyle
    }).addTo(techtonicPlates);

    techtonicPlates.addTo(map);
  });

// Grabbing our GeoJSON major earthquakes  data.
  d3.json(majorEQdata).then(function(data) {
    var magdata=0;
    L.geoJSON(data,{
      pointToLayer: function(feature,latlng) {
        return L.circleMarker(latlng);
      },
      
      onEachFeature: function(feature,layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        magdata=feature.properties.mag;
      },
      style:styleInfo(magdata )
    }).addTo(majorEQ);

    majorEQ.addTo(map);
  })

