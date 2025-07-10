const showMenu = (toggleId, navId) =>{
   const toggle = document.getElementById(toggleId),
         nav = document.getElementById(navId)
   toggle.addEventListener('click', () =>{
       nav.classList.toggle('show-menu')
       toggle.classList.toggle('show-icon')
   })
}

showMenu('nav-toggle','nav-menu')



// This function will be called by the Google Maps API when it has loaded.
function initMap() {
    // 1. Define your office's exact Latitude and Longitude coordinates.
    //    You can get these by finding your location on Google Maps, right-clicking,
    //    and selecting "What's here?" or by using a lat/lng finder tool.
    const officeLatLng = { lat: 34.052235, lng: -118.243683 }; // Example: Los Angeles, CA

    // 2. Create the Map object.
    //    It needs to know which HTML element to render into (the 'map' div)
    //    and how to display (zoom level, center).
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16, // Zoom level (1 is world, higher is closer)
        center: officeLatLng, // Center the map on your office location
        mapTypeId: 'satellite', // 'roadmap', 'satellite', 'hybrid', 'terrain'
        disableDefaultUI: false // Set to true to hide controls like zoom buttons, street view pegman, etc.
    });

    // 3. Add a Marker to the map at your office location.
    const marker = new google.maps.Marker({
        position: officeLatLng, // Where to place the marker
        map: map, // The map instance to put the marker on
        title: "Your Dental Office Name", // Text to show on hover
        animation: google.maps.Animation.DROP // Optional: makes the marker drop onto the map
    });

    // Optional: Add an Info Window that pops up when the marker is clicked
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="font-family: Arial, sans-serif; padding: 5px;">
                <h3>Your Dental Office</h3>
                <p>123 Dental Street</p>
                <p>Cityville, State 12345</p>
                <p><a href="tel:+15551234567">Call Us: (555) 123-4567</a></p>
                <p><a href="https://www.google.com/maps/dir/?api=1&destination=${officeLatLng.lat},${officeLatLng.lng}" target="_blank">Get Directions</a></p>
            </div>
        `
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}