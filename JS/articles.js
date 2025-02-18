const main = document.getElementById("root");
const select = document.querySelector("select");
const artTitle = document.querySelector(".title");
const html = document.querySelector("html");

let thisH2 = "";
let datajson = "/dataFr.json";

function initBlog() {
  setLang2();
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

      if (!sessionStorage.getItem("month")) {
        sessionStorage.setItem("month", "voirtous");
      }
      if (!sessionStorage.getItem("order")) {
        sessionStorage.setItem("order", "new");
      }
      if (!sessionStorage.getItem("ind")) {
        sessionStorage.setItem("ind", 1);
      }

      let order = "";
      let tag = "";
      let ind = "";
      order = sessionStorage.getItem("order");
      tag = sessionStorage.getItem("month");
      ind = sessionStorage.getItem("ind");

      const order1 = document.querySelector(".order1");
      const order2 = document.querySelector(".order2");

      if (order == "new") {
        order2.style.display = "none";
        order1.style.display = "initial";
      } else {
        order1.style.display = "none";
        order2.style.display = "initial";
      }

      list.build(list.all);
      list.listenForFilteringAndReordering(order, tag, ind);

      let optionHtml = "";

      let options = ["-- -- --", tous];

      for (let i = 0; i < json.articles.length; i++) {
        let onetag = json.articles[i].tagArr[1];

        options.push(onetag);
      }
      let setOptions = [];
      setOptions = [...new Set(options)];

      for (let i = 0; i < setOptions.length; i++) {
        let option = setOptions[i];
        let optionValue = setOptions[i].replace(/ /g, "").toLowerCase();

        optionHtml += `<option name="${i}" value=${optionValue} >${option} `;
        select.innerHTML = optionHtml;
      }
      for (let i = 0; i < select.options.length; i++) {
        if (i === parseInt(ind)) {
          select.selectedIndex = i;
          break;
        }
      }
    });
}
function setLang2() {
  const chosenLang = localStorage.getItem("lang");

  if (chosenLang === "fr") {
    datajson = "/dataFr.json";
  } else if (chosenLang === "en") {
    datajson = "/dataEn.json";
  }
}
setLang2();
