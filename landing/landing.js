Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
// Based off https://stackoverflow.com/a/8876069/10074924
var getViewportWidth = function() { return Math.max(document.documentElement.clientWidth, window.innerWidth || 0); }

var modalOverlay = document.getElementById("modal-overlay");
var embedCode;
var username;
var frameWidth, frameHeight;
var initialRightContent = document.getElementById("initial-content");
var initialRightHeading = document.getElementById("initial-right-heading");
var initialEndForm = document.getElementById("end-form");
var previewFrame = document.getElementById("preview-frame");
var getCodeEl = document.getElementById("getcode");
var embedCodeEl = document.getElementById("embed-code");

var showModalOverlay = function() {
  modalOverlay.className = "modal-overlay show";
}

var hideModalOverlay = function() {
  modalOverlay.className = "modal-overlay";
}

var showChangelogModalOverlay = function() {
  if (viewportWidth <= 490) {
    showModalOverlay();
  }
}

var startGetCode = function() {
  username = document.getElementById("username-input").value;
  if (username === "") {
    /*document.getElementById('username-alert').style.opacity = 1;
    document.getElementById('username-alert').style.background = "#00000000";*/
    document.getElementById("username-alert").classList.add("active");
    document.getElementById("username-alert").setAttribute("aria-hidden", "true");
  }
  else {
    /*document.getElementById('username-alert').style.opacity = 0;
    document.getElementById('username-alert').style.background = "#5901e6";*/
    document.getElementById("username-alert").classList.remove("active");
    document.getElementById("username-alert").setAttribute("aria-hidden", "false");
    frameWidth = document.getElementById("width-input").value;
    frameHeight = document.getElementById("height-input").value;
    initialEndForm.style.display = "block";
    previewFrame.className = "preview-frame";
    embedCode = `<iframe src="https://locness3.github.io/scratch-profile-embed/#${username}" width="${frameWidth}" height="${frameHeight}" style="border: 1px solid grey; border-radius: 5px;"></iframe>`;
    window.scrollTo(0, document.body.scrollHeight);
    initialRightHeading.textContent = "Preview";
    previewFrame.innerHTML = embedCode;
  }

};

var endGetCode = function() {
  frameWidth = document.getElementById("width-input").value;
  frameHeight = document.getElementById("height-input").value;
  embedCode = `<iframe src="https://locness3.github.io/scratch-profile-embed/#${username}" width="${frameWidth}" height="${frameHeight}" style="border: 1px solid grey; border-radius: 5px;"></iframe>`;
  embedCodeEl.textContent = embedCode;
  initialRightContent.style.display = "none";
  getCodeEl.style.display = "block";
}

var copyCodeToClipboard = function(trigger) {
  var tempInputEl = document.createElement("input");
  tempInputEl.value = document.getElementById("embed-code").textContent;
  tempInputEl.id = "temp-input-el";
  document.body.appendChild(tempInputEl);
  document.getElementById("temp-input-el").select();
  document.execCommand("copy");
  document.body.removeChild(document.getElementById("temp-input-el"));
  trigger.textContent = "Copied!";
  window.setTimeout(function() {trigger.textContent = "Copy"}, 2000);
}

var backToStart = function() {
  getCodeEl.style.display = "none";
  initialRightContent.style.display = "block";
}


document.getElementById("username-input").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    startGetCode();
  }
});

document.getElementById("end-form").addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
    startGetCode();
  }
})
