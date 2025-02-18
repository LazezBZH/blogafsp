const blogLoader = document.querySelector(".blog-loader");


window.addEventListener("load", initLoad);

let blogLoaded = sessionStorage.getItem("blogLoad") || false;

if (blogLoaded) {
  blogLoader.style.display = "none";

} else if (!blogLoaded) {
  blogLoader.style.display = "block";

}
function initLoad() {
  if (!blogLoaded) {
    stopLoader();
  }
}

function stopLoader() {
  setTimeout(() => {
    blogLoaded = true;
    blogLoader.style.display = "none";

    sessionStorage.setItem("blogLoad", blogLoaded);
  }, 2500);
}


