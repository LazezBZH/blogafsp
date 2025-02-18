class MyArticles {
  constructor() {
    this.all = [];
    this.listToDisplay = [];
  }
  add(art) {
    this.all.push(art);
  }
  build() {
    this.displayArticles(this.listToDisplay);
  }
  displayArticles(arts) {
    let html = "";

    for (let i = 0; i < arts.length; i++) {
      let art = new Article(arts[i]);
      html += art.render();
    }
    main.innerHTML = html;
  }

  listenForFilteringAndReordering(order, tag,ind) {
    let orders = document.getElementsByClassName("order");
    const select = document.querySelector("select");


    tag = sessionStorage.getItem("month") || "tous";
 ind= sessionStorage.getItem("ind") || 2;
    sessionStorage.setItem("month", tag);
    sessionStorage.setItem("ind", ind);
    order = sessionStorage.getItem("order") || "new";
    sessionStorage.setItem("order", order);
 

    this.order = order;
    this.tag = tag;
    this.ind=ind;
    this.filter(this.tag);
    this.reorder(this.order);

   
    

    select.addEventListener("change", (e) => {
      tag = e.target.value;
      ind= select.selectedIndex;

      sessionStorage.setItem("month", tag);
      sessionStorage.setItem("ind", ind);
      this.tag = tag;
      this.filter(this.tag);
    });

    for (let el of orders) {
      el.addEventListener("click", (e) => {
        order = e.target.getAttribute("data-order");
        for (let elt of orders) {
          elt.style.display = "initial";
        }
        e.target.style.display = "none";
        this.order = order;
        this.reorder(order);
      });
    }
  }

  filter(tag) {
    const artTitle = document.querySelector(".title");
    let number = "";

    if (tag && tag != "voirtous" && tag != "seeall" && tag != "------") {
      this.listToDisplay = this.all.filter((art) => art.tagArr.includes(tag));

      number = this.listToDisplay.length;
      artTitle.innerHTML = `<h2>${h21} <class="red">${number}</span> articles</h2>`;
      if (number === 0) {
        this.listToDisplay = [];
        artTitle.innerHTML = `<h2 class="error">${h22}</h2>`;
      } else {
    
        this.listToDisplay = this.all.filter((art) => art.tagArr.includes(tag));

        thisH2 = this.listToDisplay[0].tagArr[1];
        if(number==1){ artTitle.innerHTML = `<h2> ${h23b}  article ${h24} <span class="tag">${thisH2}</span></h2>`;}else{ artTitle.innerHTML = `<h2> ${h23} <span class="red">${number}</span> articles ${h24} <span class="tag">${thisH2}</span></h2>`;}
       
      }
    } else {
      this.listToDisplay = this.all;

      number = this.listToDisplay.length;

      artTitle.innerHTML = `<h2>${h21} <span class="red">${number}</span> articles</h2>`;
    }

    this.build(this.listToDisplay);
  }

  reorder(order) {
    let methodName = "reorderBy" + ucfirst(order);

    this[methodName]();

    this.build(this.listToDisplay);
  }
  reorderByNew() {
    this.listToDisplay = this.listToDisplay.sort((a, b) => {
      sessionStorage.setItem("order", "new");
      return b.id - a.id;
    });
  }
  reorderByOld() {
    this.listToDisplay = this.listToDisplay.sort((a, b) => {
      sessionStorage.setItem("order", "old");
      return a.id - b.id;
    });
  }
  displayOneArticle(article) {
    let htmlOne = "";

    let art = new Article(article);
    htmlOne += art.renderOne();

    main.innerHTML = htmlOne;
  }
}
