// The variables
var oldHash = location.hash;
var avatar = document.getElementById("avatar");
var usernameLabel = document.getElementById("username");
var country = document.getElementById("country");
var bio = document.getElementById("bio");
var statusPar = document.getElementById("status-paragraph");
var viewProfile = document.getElementById("view-profile-link");
var username = location.hash.substr(1, location.hash.length);
// Shows the presentation page if there's no hash
if (location.hash === "#" || location.hash === "") {
  location.href = "presentation.html";
} 
// Reload the page on hash change
window.onhashchange = function() {
  if (location.hash !== oldHash) {
    location.reload();
  }
};
// Set the title, the shown username and make the link go to the enterd username
usernameLabel.textContent = username;
document.title = username;
viewProfile.href = "https://scratch.mit.edu/users/" + username;

// Do the request 
var req = new XMLHttpRequest();
req.open("GET", 'https://api.scratch.mit.edu/users/' + username);
req.send();
req.onreadystatechange = function() {

  if (req.readyState === 4 && req.status === 200) {
    // Shows the country and avatar
    parsedresp = JSON.parse(req.responseText);
    country.textContent = parsedresp.profile.country;
    avatar.alt = username + "'s avatar";
    avatar.src = "https://cdn2.scratch.mit.edu/get_image/user/" + parsedresp.id + "_90x90.png";
    avatar.className = "";
    // Shows the "About me" if it's not empty
    if(parsedresp.profile.bio !== "") {
      bio.textContent = parsedresp.profile.bio;
      
    }
    // Otherwise, it shows "Not specified"
    else {
      bio.innerHTML = "<em>Not specified</em>";
    }
    // Shows the "What I'm working on" if it's not empty
    if(parsedresp.profile.status !== "") {
      statusPar.textContent = parsedresp.profile.status;
    }
    // Otherwise, it shows "Not specified"
    else {
      statusPar.innerHTML = "<em>Not specified</em>";
    } 

  }};
  
