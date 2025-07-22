const showMenu = (toggleId, navId) =>{
   const toggle = document.getElementById(toggleId),
         nav = document.getElementById(navId)
   toggle.addEventListener('click', () =>{
       nav.classList.toggle('show-menu')
       toggle.classList.toggle('show-icon')
   })
}

showMenu('nav-toggle','nav-menu')



function initMap() {
    const officeLatLng = { lat: 34.052235, lng: -118.243683 }; // Example: Los Angeles, CA
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 16, // Zoom level (1 is world, higher is closer)
        center: officeLatLng, // Center the map on your office location
        mapTypeId: 'satellite', // 'roadmap', 'satellite', 'hybrid', 'terrain'
        disableDefaultUI: false // Set to true to hide controls like zoom buttons, street view pegman, etc.
    });
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
    const testimonialsSection = document.getElementById('testimonial');

    if (!fixedElement || !testimonialsSection) {
        console.warn('Required elements for sticky behavior were not found.');
        return;
    }

    // The element will appear after scrolling past the header
    const buffer = 20; // Hides the element 20px before it touches the section

    let hideAt;

    function calculateHidePoint() {
        hideAt = testimonialsSection.offsetTop - window.innerHeight + buffer;
    }

    calculateHidePoint();

    function handleScroll() {
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollPosition < hideAt) {
            fixedElement.style.opacity = '1';
            fixedElement.style.visibility = 'visible';
            fixedElement.style.position = 'fixed';
            fixedElement.style.top = '50%';
            fixedElement.style.transform = 'translateY(-50%)';
        } else {
            fixedElement.style.opacity = '0';
            fixedElement.style.visibility = 'hidden';
        }
    }

    window.addEventListener('load', handleScroll);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
        calculateHidePoint();
        handleScroll();
    });
});