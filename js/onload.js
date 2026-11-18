
const container = document.getElementById('refresh-container');
const indicator = document.getElementById('refresh-indicator');
const list = document.getElementById('content-list');

let startY = 0;
let currentY = 0;
let isPulling = false;
const pullThreshold = 80; // Distance in pixels required to trigger refresh

container.addEventListener('touchstart', (e) => {
  // Only trigger pull-to-refresh if the container is scrolled to the absolute top
  if (container.scrollTop === 0) {
    startY = e.touches[0].clientY;
    isPulling = true;
    indicator.style.transition = 'none'; // Disable animations during manual drag
  }
});

container.addEventListener('touchmove', (e) => {
  if (!isPulling) return;
  
  currentY = e.touches[0].clientY;
  const pullDistance = currentY - startY;

  // If dragging downward, reveal the indicator proportionally
  if (pullDistance > 0 && pullDistance < pullThreshold + 40) {
    e.preventDefault(); // Prevent default mobile browser elastic bounce
    const translateY = Math.min(-50 + pullDistance, 0); 
    indicator.style.transform = `translateY(${translateY}px)`;
  }
});

container.addEventListener('touchend', () => {
  if (!isPulling) return;
  isPulling = false;
  
  const pullDistance = currentY - startY;
  indicator.style.transition = 'transform 0.3s ease';

  if (pullDistance >= pullThreshold) {
    // Lock indicator in view during data refresh
    indicator.style.transform = 'translateY(0px)';
    simulateDataFetch();
  } else {
    // Snap back hidden if the threshold wasn't met
    indicator.style.transform = 'translateY(-50px)';
  }
  
  startY = 0;
  currentY = 0;
});

// Mocking an API data refresh
function simulateDataFetch() {
  setTimeout(() => {
    gasRefresh();
    // Hide indicator after completion
    indicator.style.transform = 'translateY(-50px)';

  }, 100); 
}


$(document).ready(function() {
  localStorage.clear();
  // login
  var access_token = '';
  // Parse query string to see if page request is coming from OAuth 2.0 server.
  var fragmentString = location.hash.substring(1);
  var params = {};
  var regex = /([^&=]+)=([^&]*)/g, m;
  while (m = regex.exec(fragmentString)) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  if (Object.keys(params).length > 0 && params['state'] && params['access_token']) {
    access_token = params['access_token'];
  }else{
    access_token = sessionStorage.getItem('access_token');
  }
  if (access_token !== null) {
    on();
    gasLogin(access_token);
  }else{
    off();
    createGLoginView();
  }
  
});
