var embedCode;
var username;
var frameWidth, frameHeight;
var initialRightContent = document.getElementById("initial-content");
var initialRightHeading = document.getElementById("initial-right-heading");
var initialEndForm = document.getElementById("end-form");
var previewFrame = document.getElementById("preview-frame");
var getCodeEl = document.getElementById("getcode");
var embedCodeEl = document.getElementById("embed-code");

var startGetCode = function() {
  username = document.getElementById("username-input").value;
  frameWidth = document.getElementById("width-input").value;
  frameHeight = document.getElementById("height-input").value;
  initialEndForm.style.display = "block";
  previewFrame.className = "preview-frame";
  embedCode = `<iframe src="https://locness3.github.io/scratch-profile-embed#${username}" width="${frameWidth}" height="${frameHeight}"></iframe>`;
  window.scrollTo(0, document.body.scrollHeight);
  initialRightHeading.textContent = "Preview";
  previewFrame.innerHTML = embedCode;
};

var endGetCode = function() {
  frameWidth = document.getElementById("width-input").value;
  frameHeight = document.getElementById("height-input").value;
  embedCode = `<iframe src="https://locness3.github.io/scratch-profile-embed#${username}" width="${frameWidth}" height="${frameHeight}"></iframe>`;
  embedCodeEl.textContent = embedCode;
  initialRightContent.style.display = "none";
  getCodeEl.style.display = "block";
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
