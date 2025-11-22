// ===== Configurable default values =====
let statusText = "Pending";
let pid = "12345";
let uid = "user001";
let targetBaseURL = "https://mrinsightsolutions.com/completed"; // default target
const redirectDelay = 5000; // ms

// ===== Function to get URL parameters =====
function getParam(name, defaultValue) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name) || defaultValue;
}

// ===== Get values from URL =====
statusText = getParam("status", statusText);
pid = getParam("pid", pid);
uid = getParam("uid", uid);
targetBaseURL = getParam("target", targetBaseURL);

// ===== Set values in HTML =====
document.getElementById('status').innerText = statusText;
document.getElementById('pid').innerText = pid;
document.getElementById('uid').innerText = uid;

// ===== Fetch IP and Country using free API =====
fetch('https://ipapi.co/json/')
  .then(response => response.json())
  .then(data => {
    document.getElementById('ip').innerText = data.ip;
    document.getElementById('country').innerText = data.country_name;
  })
  .catch(err => {
    document.getElementById('ip').innerText = 'N/A';
    document.getElementById('country').innerText = 'N/A';
    console.error(err);
  });

// ===== Build final redirect URL =====
const finalRedirectURL = `${targetBaseURL}/uid=${uid}`;

// ===== Redirect after delay =====
setTimeout(() => {
  window.location.href = finalRedirectURL;
}, redirectDelay);
