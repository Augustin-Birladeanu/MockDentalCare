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
        title: "Chonky Dental Care", // Text to show on hover
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

document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.office-tour .imgcontainer img');
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeButton = document.querySelector('.close-button');

    galleryImages.forEach(image => {
        image.addEventListener('click', () => {
            modal.style.display = 'flex';
            modalImage.src = image.src;
            document.body.style.overflow = 'hidden';
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const fixedElement = document.getElementById('fixedServiceList');
    const footer = document.getElementById('testimonial');
    const header = document.querySelector('.header');
    const navHeight = header ? header.offsetHeight : 0;

    if (!fixedElement || !footer) {
        console.warn('One or more required elements for sticky behavior were not found. Please ensure #fixedServiceList and #footerSection exist.');
        return;
    }

    const startFixingAt = navHeight;

    const fixedElementHeight = fixedElement.offsetHeight;
    const buffer = 30;

    let stopFixingAt;

    function calculateStopPoint() {
        stopFixingAt = footer.offsetTop - fixedElementHeight - buffer;
    }

    calculateStopPoint();

    function handleScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollPosition > stopFixingAt) {
            fixedElement.classList.add('unfixed-bottom');
            fixedElement.style.top = (stopFixingAt + 'px');
            fixedElement.style.bottom = 'auto';
        } else if (scrollPosition >= startFixingAt) {
            fixedElement.classList.remove('unfixed-bottom');
            fixedElement.style.position = 'fixed';
            fixedElement.style.top = '50%';
            fixedElement.style.transform = 'translateY(-50%)';
            fixedElement.style.bottom = 'auto';
        } else {
             fixedElement.classList.remove('unfixed-bottom');
             fixedElement.style.position = 'fixed';
             fixedElement.style.top = '50%';
             fixedElement.style.transform = 'translateY(-50%)';
             fixedElement.style.bottom = 'auto';
        }
    }

    window.addEventListener('load', handleScroll);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
        calculateStopPoint();
        handleScroll();
    });
});