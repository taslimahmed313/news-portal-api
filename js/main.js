// Load News Categories.......................................................
const loadNewsCategories = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsCategories(data.data.news_category))
    .catch((error) => console.log(error));
};

// Display News Categories......................................................
const displayNewsCategories = (newses) => {
  const newsContainer = document.getElementById("news-container");
  newses.forEach((news) => {
    const newsSpan = document.createElement("span");
    newsSpan.classList.add("mx-3");
    newsSpan.innerHTML = `
            <span id="category" class="hover" onclick = "loadNewsDetails('${news.category_id}')">${news.category_name}</span>
        `;
    newsContainer.appendChild(newsSpan);
  });
};

// Load News Details.............................................................
const loadNewsDetails = (id) => {
  // Spinner Loading Start
  toggleSpinner(true);

  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayNewsDetails(data.data))
    .catch((error) => console.log(error));
};

// Display News Details..........................................................
const displayNewsDetails = (newses) => {
  // Sorting With View----------------------------------------------------------
  newses.sort((a, b) => {
    return b.total_view - a.total_view;
  });

  // Total News.................................................................
  const newsLength = document.getElementById("news-length");
  newsLength.innerText = `${newses.length} Newses found for This Category`;

  //   'No News found' -message...............................................
  const newsMessage = document.getElementById("no-news-message");
  if (newses.length === 0) {
    newsMessage.classList.remove("d-none");
  } else {
    newsMessage.classList.add("d-none");
  }

  //   Finds news Container------------------------------------------------------
  const newsDetailsContainer = document.getElementById(
    "news-details-container"
  );
  newsDetailsContainer.textContent = "";
  newses.forEach((news) => {
    const newsDiv = document.createElement("div");
    newsDiv.classList.add("col-lg-12", "card", "col-12");

    // Set The News With Inner HTML............................................
    newsDiv.innerHTML = `
    <div class="row g-0  align-items-center">
      <div class="col-md-4 col-lg-3">
        <img src="${
          news.thumbnail_url
        }" class="img-fluid w-100 height-control rounded-start" alt="...">
      </div>
      <div class="col-md-8 col-lg-9">
        <div class="card-body">
          <h6 class="card-title">${news.title}</h6>
          <p class="card-text" style="color: #776d6d">${news.details.slice(
            0,
            260
          )}...</p>
          <div class="d-flex align-items-center justify-content-between">
          <div>
          <div class="d-flex align-items-center">
          <div>
            <img class="img-thumbnail rounded-5 img-fluid img-size" src = "${
              news.author.img
            }">
          </div>
          <div class="ms-2">
            <p class="mb-0">${
              news.author.name ? news.author.name : "No Author Found"
            }
            </p>
          </div>
        </div>
      </div> 
      <div><i class="fa-regular fa-eye"></i><span class="ms-2">${
        news.total_view ? news.total_view : "No view"
      }</span>
      </div>
      <div class="d-none d-sm-block">
      <i class="fa-regular fa-star-half-stroke"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      </div>
      <div>
      <i class="fa-solid fa-arrow-right" style="color:tomato" data-bs-toggle="modal" data-bs-target="#newsModal" onclick = "loadNewsDetailsModal('${
        news._id
      }')"></i>
      </div>
      </div>
    </div>
    </div>
  </div> 
    `;
    newsDetailsContainer.appendChild(newsDiv);
  });

  // Spinner Loading Stope------------------------------------------------------
  toggleSpinner(false);
};

// Spinner Function--------------------------------------------------------------
const toggleSpinner = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};

// Load Modal News Details......................................................
const loadNewsDetailsModal = (id) => {
  const url = `https://openapi.programming-hero.com/api/news/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayModalNewsDetails(data.data))
    .catch((error) => console.log(error));
};

// Display Modal News Details...................................................
const displayModalNewsDetails = (newses) => {
  newses.forEach((news) => {
    console.log(news);
    const newsModalTitle = document.getElementById("newsModalLabel");
    newsModalTitle.innerText = `${news.title}`;
    const newsModalDetails = document.getElementById("news-details-modal");
    newsModalDetails.innerHTML = `
      <p>${news.details}</p>
        <div class="d-flex align-items-center justify-content-between">
          <div>
          <div class="d-flex align-items-center">
          <div>
            <img class="img-thumbnail rounded-5 img-fluid img-size" src = "${
              news.author.img
            }">
          </div>
          <div class="ms-2">
            <p class="mb-0">${
              news.author.name ? news.author.name : "No Author Found"
            }
            </p>
          </div>
        </div>
      </div> 
      <div><i class="fa-regular fa-eye"></i><span class="ms-2">${
        news.total_view ? news.total_view : "No view"
      }</span>
      </div>
      <div class="d-none d-sm-block">
      <i class="fa-regular fa-star-half-stroke"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      </div>
      </div>
    </div>
    `;
  });
};
loadNewsCategories();

// Go to Blog Page--------------------------------------------------------------
document.getElementById("move-to-blogs").addEventListener("click", function () {
  location.href = "http://127.0.0.1:5500/blog.html";
});
