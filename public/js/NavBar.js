const arrows = document.querySelectorAll(".arrow");

arrows.forEach((arrow) => {
  arrow.addEventListener("click", (e) => {
    const arrowParent = e.target.closest(".arrow").parentElement.parentElement;
    arrowParent.classList.toggle("showMenu");
  });
});

const sidebar = document.querySelector(".sidebar");
const sidebarBtn = document.querySelector(".bx-menu");

sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

function getOption() {
  selectElement = document.querySelector("#filter");
  output = selectElement.value;
  console.log("SElECted val", output);
  document.getElementById("drop-val").value = output;

  // console.log(document.getElementById("drop-val").value);
}

function alertBox(text) {
  alert(text);
}

// For clientViewRequest..
function getOption() {
  selectElement = document.querySelector('#filter');
  output = selectElement.value;
  console.log("SElECted val", output);
  document.getElementById("drop-val").value = output;

  console.log(document.getElementById("drop-val").value);
}