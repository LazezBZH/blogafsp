const main = document.getElementById("root");

const artTitle = document.querySelector(".title_fullH2");
const fullArticle = document.getElementById("full-article");
const html = document.querySelector("html");

let thisH2 = "";
let tag = query("article");

function initBlog() {
  setLang3();
  fetch(datajson)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("HTTP error, status = " + response.status);
      }
      return response.json();
    })
    .then(function (json) {
      let list = new MyArticles();
      for (let i = 0; i < json.articles.length; i++) {
        let art = new Article(json.articles[i]);
        list.add(art);
      }

      let listToDisplay = "";

      function displayList() {
        if (tag) {
          listToDisplay = list.all.filter((art) => art.id == tag);
          if (listToDisplay.length === 0) {
            listToDisplay = [];
            artTitle.innerHTML = `<h2 class="error">${h22}</h2>`;
          } else {
            thisH2 = listToDisplay[0].artDate;
            artTitle.innerHTML = `<h2> ${h25} &nbsp; <span class="tag">${thisH2}</span></h2>`;
          }
          list.displayOneArticle(listToDisplay[0]);
        } else {
          artTitle.innerHTML = `<h2 class="error">${h22}</h2>`;
        }
      }
      displayList();

      let num = tag;
      const left = document.querySelector(".left-blog");
      const right = document.querySelector(".right-blog");
      left.addEventListener("click", goPrevious);
      right.addEventListener("click", goNext);
      if (num < 35) {
        left.style.display = "none";
      } else {
        left.style.display = "initial";
      }

      if (num > json.articles.length + 32) {
        right.style.display = "none";
      } else {
        right.style.display = "initial";
      }

      function goPrevious() {
        num--;

        window.location.href = "/blog/article.html?article=" + num;
      }
      function goNext() {
        num++;

        window.location.href = "/blog/article.html?article=" + num;
      }
    });
}

function setLang3() {
  const chosenLang = localStorage.getItem("lang");

  if (chosenLang === "fr") {
    datajson = "/dataFr.json";
  } else if (chosenLang === "en") {
    datajson = "/dataEn.json";
  }
}

setLang3();
