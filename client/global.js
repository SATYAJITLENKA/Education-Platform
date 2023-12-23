
function toggleMenu() {
    console.log("click");
    var navLinks = document.getElementsByClassName("nav-link");

  }

  document
    .getElementById("toggleButton")
    .addEventListener("click", function () {
      var menu = document.getElementById("slideMenu");
      menu.style.left = menu.style.left === "0px" ? "-250px" : "0px";
    });