var map,
  lat,
  lng;

$(function() {

  function enlazarMarcador(e) {
    var newLat = e.latLng.lat();
    var newLng = e.latLng.lng();
    drawRoute([newLat, newLng]);
  };

  function drawRoute(coords) {
    var newLat = coords[0],
      newLng = coords[1];
    if (!lat && !lng) {
      lat = newLat;
      lng = newLng;
    }
    // muestra ruta entre marcas anteriores y actuales
    map.drawRoute({
      origin: [
        lat, lng
      ], // origen en coordenadas anteriores
      // destino en coordenadas del click o toque actual
      destination: [
        newLat, newLng
      ],
      travelMode: 'driving',
      strokeColor: '#000',
      strokeOpacity: 0.6,
      strokeWeight: 5
    });
    lat = newLat; // guarda coords para marca siguiente
    lng = newLng;
    addMark([lat, lng]);
  }

  function addMark(coords) {
    var lat = coords[0],
      lng = coords[1];
    map.addMarker({
      lat: lat,
      lng: lng
    }); // marcador en [lat, lng]
    savePoint(lat, lng);
  }

  function compactRoute() {
    var originPoint = route.pop();
    var endPoint = route.shift();
    route = [originPoint, endPoint];
    addMark(originPoint);
    drawRoute(endPoint);
  }

  function initializeMap(position) {
    function drawMap(lat, lng) {
      map = new GMaps({ // muestra mapa centrado en coords [lat, lng]
        el: '#map',
        lat: lat,
        lng: lng,
        click: enlazarMarcador,
        tap: enlazarMarcador
      });
    }
    var lastRoute = getRoute();
    if (lastRoute.length) {
      lat = lastRoute[0][0]; // guarda coords en lat y lng
      lng = lastRoute[0][1];
      drawMap(lat, lng);
      addMark([lat, lng]);
      lastRoute.forEach(function(point) {
        drawRoute(point);
      });
    } else {
      lat = position.coords.latitude; // guarda coords en lat y lng
      lng = position.coords.longitude;
      drawMap(lat, lng);
      addMark([lat, lng]);
    }
  }

  function geolocalizar() {
    GMaps.geolocate({
      success: initializeMap,
      error: function(error) {
        alert('Geolocalización falla: ' + error.message);
      },
      not_supported: function() {
        alert("Su navegador no soporta geolocalización");
      }
    });
  };

  geolocalizar();
  $('.compact-action').on('click', function() {
    if (window.confirm('Are yo sure?')) {
      map.removePolylines();
      map.removeMarkers();
      compactRoute();
    }
  });
  $('.reset-action').on('click', function() {
    if (window.confirm('Are yo sure?')) {
      map.removePolylines();
      map.removeMarkers();
      route = [];
      lat = null, long = null;
    }
  });

});

/* Persistent model */
var route = [];

function savePoint(lat, lng) {
  route.push([lat, lng]);
  localStorage.setItem('gPoint', JSON.stringify(route));
}

function getRoute() {
  if (localStorage.gPoint) {
    return JSON.parse(localStorage.gPoint);
  } else {
    //localStorage.gPoint = [];
    return [];
  }
}
