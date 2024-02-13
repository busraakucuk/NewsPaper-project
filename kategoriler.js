let apikey = "0620b201d60f4a6cb9cbaf7ed62b6a66";
let apiUrl = `https://newsapi.org/v2/top-headlines?country=tr&apiKey=${apikey}`;

let pushNews = document.querySelector(".kategori-haber-liste");

const kategoriButtons = [...document.querySelectorAll(".filtre-button")];
const kategoriBaslik = document.querySelector(".kategori-ismi");

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-icon");

async function getNews(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    // Catch error here
  }
}

async function kategoriHaberGir(apiUrl) {
  const altNews = await getNews(apiUrl);
  let altNewsSliced = altNews.articles;
  pushNews.innerHTML = "";
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
kategoriHaberGir(apiUrl);

function kategoriBaslikDegis(item) {
  kategoriBaslik.innerText = item.innerText;
}

kategoriButtons.forEach((item) => {
  item.addEventListener("click", () => {
    kategoriBaslikDegis(item);
    kategoriHaberGir(
      `https://newsapi.org/v2/top-headlines?country=tr&category=${item.innerText}&apiKey=${apikey}`
    );
  });
});

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
