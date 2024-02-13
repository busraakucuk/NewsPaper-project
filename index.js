let apikey = "0620b201d60f4a6cb9cbaf7ed62b6a66";
let apiUrl = `https://newsapi.org/v2/top-headlines?country=tr&apiKey=${apikey}`;

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-icon");

let slider = document.querySelector(".slider");
let baslik = document.querySelector(".baslik");
let yazar = document.querySelector(".yazar");
let tarih = document.querySelector(".tarih");

let pushNews = document.querySelector(".alt-haberler-liste");

const slideButtons = [...document.querySelectorAll(".slide-but")];

async function getNews(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    // Catch error here
  }
}

async function basla(url) {
  const newsArray = await getNews(url);

  let title = "";
  let publisher = "";
  let date = "";

  title = newsArray.articles[0].title;
  publisher = newsArray.articles[0].author;
  date = newsArray.articles[0].publishedAt;

  let maxlength = 80;
  if (title.length > maxlength) {
    let newText = title.substring(0, maxlength - 1) + "...";
    title = newText;
  }
  baslik.innerText = title;
  yazar.innerText = publisher;
  tarih.innerText = date;
  baslik.setAttribute("href", newsArray.articles[0].url);
}
basla(apiUrl);

async function altHaberGir() {
  const altNews = await getNews(apiUrl);
  let altNewsSliced = altNews.articles.slice(3, 24);

  altNewsSliced.forEach((item) => {
    if (item.title.length > 60) {
      item.title = item.title.substring(0, 60) + "...";
    }
    pushNews.innerHTML += `
    <li class="alt-haber">
    <div class="alt-haber-container">
    <a href="${item.url}" class="alt-haber-baslik">${item.title}</a>
    <h3 class="haber-icerigi">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, voluptatem.
    </h3>
    <h5 class="alt-yazar">${item.author}</h5>
    <h6 class="alt-tarih">${item.publishedAt}</h6>
    <button class="haber-buton">
    <a href="${item.url}" class="haber-link">Habere Git</a>
    </button>
    </div>
    </li>`;
  });
}

async function icerikDegis(sayi) {
  const newsArray = await getNews(apiUrl);

  let title = "";
  let publisher = "";
  let date = "";

  title = newsArray.articles[sayi].title;
  publisher = newsArray.articles[sayi].author;
  date = newsArray.articles[sayi].publishedAt;

  let maxlength = 80;
  if (title.length > maxlength) {
    let newText = title.substring(0, maxlength - 1) + "...";
    title = newText;
  }
  baslik.innerText = title;
  yazar.innerText = publisher;
  tarih.innerText = date;
  baslik.setAttribute("href", newsArray.articles[sayi].url);
}
icerikDegis(0);

slideButtons.forEach((item) => {
  item.addEventListener("click", () => {
    let sayi = item.innerHTML - 1;
    icerikDegis(sayi);
  });
});

altHaberGir();

let a = 1;
const interval = setInterval(() => {
  if (a > 2) {
    a = a % 3;
  }
  icerikDegis(a);
  a++;
}, 3000);

async function aramaYap(keyword) {
  if (keyword.length != 0) {
    let url = `https://newsapi.org/v2/top-headlines?country=tr&q=${keyword}&apiKey=${apikey}`;
    const arananHaberler = await getNews(url);
    let arananListesi = ``;
    arananHaberler.articles.forEach((item) => {
      if (item.title.length > 60) {
        item.title = item.title.substring(0, 60) + "...";
      }
      arananListesi += `
      <li class="alt-haber">
      <div class="alt-haber-container">
      <a href="${item.url}" class="alt-haber-baslik">${item.title}</a>
      <h3 class="haber-icerigi">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, voluptatem.
      </h3>
      <h5 class="alt-yazar">${item.author}</h5>
      <h6 class="alt-tarih">${item.publishedAt}</h6>
      <button class="haber-buton">
      <a href="${item.url}" class="haber-link">Habere Git</a>
      </button>
      </div>
      </li>`;
    });
    document.querySelector("main").innerHTML = `<div class="alt-haberler">
        <p class="editor-pick">${keyword} ile ilgili haberler</p>
        <ul class="alt-haberler-liste">${arananListesi}</ul>
      </div>`;
    document.querySelector("footer").style.display = "none";
  }
}

searchButton.addEventListener("click", () => {
  aramaYap(searchInput.value);
});
