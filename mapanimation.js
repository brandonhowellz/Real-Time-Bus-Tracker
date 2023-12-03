function initMap() {
    // Boston coordinates
    const WashingtonDC = { lat: 38.889805, lng: -77.009056 };

    // Create a map centered at Boston
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: WashingtonDC,
        styles: [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
],
    });

    // Fetch bus data from the MBTA API
    fetchBusData(map);
}

function fetchBusData(map) {
    const mbtaApiKey = '';
    const mbtaApiUrl = `https://api.wmata.com/Bus.svc/json/jBusPositions?api_key=f4969b3ddf00476896f2e2b066e5d54b`;

    fetch(mbtaApiUrl)
        .then(response => response.json())
        .then(data => {
            // Process bus data and update marker positions
            updateBusMarkers(map, data.BusPositions);
        })
        .catch(error => {
            console.error('Error fetching bus data:', error);
        });
}

function updateBusMarkers(map, busData) {
    busData.forEach(bus => {
        const latLng = new google.maps.LatLng(bus.Lat, bus.Lon);

        // Create or update bus marker
        if (!bus.mark) {
            bus.mark = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: {
                    url: 'https://maps.google.com/mapfiles/ms/icons/bus.png',
                    scaledSize: new google.maps.Size(20, 20),
                },
            });
        } else if (bus.mark) {
            bus.mark.setPosition(latLng);
        }
    });

    // Schedule the next update
    setTimeout(() => fetchBusData(map), 10000); // Update every 10 seconds
}