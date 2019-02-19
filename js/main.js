// Shows the presentation page if there's no hash
if (location.hash === "#" || location.hash === "") {
  location.href = "/landing";
}

// The variables
var oldHash = location.hash;
var avatar = document.getElementById("avatar");
var usernameLabel = document.getElementById("username");
var country = document.getElementById("country");
var bio = document.getElementById("bio");
var statusPar = document.getElementById("status-paragraph");
var viewProfile = document.getElementById("view-profile-link");
var username = location.hash.substr(1, location.hash.length);

var error = function(title, desc) {
  document.getElementById("error-title").textContent = title;
  document.getElementById("error-info").textContent = desc;
  document.getElementById("main").style.display = "none";
  document.getElementById("error").style.display = "block";
  endLoading();
}

var endLoading = function() {
  document.getElementById("loading").className = "finished";
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
req.open("GET", 'https://cors-anywhere.herokuapp.com/api.scratch.mit.edu/users/' + username);
req.send();
req.onreadystatechange = function() {

  if (req.status == 404) {
    error("User not found", "Make sure there isn't a typo.");
  }

  if (req.readyState === 4 && req.status === 200) {
    // Shows the country and avatar
    var parsedresp = JSON.parse(req.responseText);
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
    // Hides the loader
    endLoading();
  }};
  
