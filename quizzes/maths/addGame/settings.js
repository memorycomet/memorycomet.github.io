var settingsDiv = document.getElementById("container-settings");

function toggleSettings() {
        if (settingsDiv.style.display === "none" || settingsDiv.style.display === "") {
            settingsDiv.style.display = "block";
            setTimeout(function() {
                settingsDiv.style.opacity = "1"; // Fade in the container
            }, 10); // Adding a small delay for smoother animation
        } else {
            settingsDiv.style.opacity = "0"; // Fade out the container
            setTimeout(function() {
                settingsDiv.style.display = "none";
            }, 300); // Wait for the animation to finish before hiding the container
        }
    } 