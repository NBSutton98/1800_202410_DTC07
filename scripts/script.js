//---------------------------------
// Your own functions here
//---------------------------------


//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
    firebase.auth().signOut().then(() => {
        window.location.assign("index.html");
        console.log("logging out user");
      }).catch((error) => {
        // An error happened.
      });
}

//---------------------------------
// Tooltip functionality
//---------------------------------
document.addEventListener('DOMContentLoaded', () => {
  console.log('Tooltip script loaded');

  const tooltips = document.querySelectorAll('.tooltip');
  console.log(`Found ${tooltips.length} tooltip(s)`);

  tooltips.forEach((tooltip) => {
    const img = tooltip.querySelector('img');
    const tooltipText = tooltip.querySelector('.tooltiptext');

    if (img) {
      console.log('Image element found:', img);

      img.addEventListener('load', () => {
        console.log('Image loaded successfully:', img.src);
      });

      img.addEventListener('error', () => {
        console.error('Image failed to load:', img.src);
      });
    } else {
      console.error('No image element found inside tooltip!');
    }

    tooltip.addEventListener('mouseenter', () => {
      console.log('Mouse entered tooltip');
      tooltipText.style.visibility = 'visible';
    });

    tooltip.addEventListener('mouseleave', () => {
      console.log('Mouse left tooltip');
      tooltipText.style.visibility = 'hidden';
    });
  });
});