// const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
// const API_URL_POPULAR =
//   "https://kinopoiskapiunofficial.tech/api/v2.9/films/top?type=TOP_100_POPULAR_FILMS&page=1";
// const API_URL_SEARCH =
//   "https://kinopoiskapiunofficial.tech/api/v3.1/films/search-by-keyword?keyword=";

// getMovies(API_URL_POPULAR);

// async function getMovies(url) {
//   const resp = await fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       "X-API-KEY": API_KEY,
//     },
//   });
//   const respData = await resp.json();

//   main(respData);
//   showMovies(respData);
// }

// async function geMoviesPaginet(currentPage) {
//   const resp = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${currentPage}`, {
//     headers: {
//       "Content-Type": "application/json",
//       "X-API-KEY": API_KEY,
//     },
//   });
//   const respData = await resp.json();

//   showMovies(respData);
// }

// function getClassByRate(vote) {
//   if (vote >= 7) {
//     return "green";
//   } else if (vote > 5) {
//     return "orange";
//   } else {
//     return "red";
//   }
// }

// function showMovies(data) {
//   const moviesEl = document.querySelector(".movies");

//   // Очищаем предыдущие фильмы
//   document.querySelector(".movies").innerHTML = "";

//   data.films.forEach(movie => {
//     const movieEl = document.createElement("div");
//     movieEl.classList.add("movie");
//     movieEl.innerHTML = `
//         <div class="movie__cover-inner">
//         <img
//           src="${movie.posterUrlPreview}"
//           class="movie__cover"
//           alt="${movie.nameRu}"
//         />
//         <div class="movie__cover--darkened"></div>
//       </div>
//       <div class="movie__info">
//         <div class="movie__title">${movie.nameRu}</div>
//         <div class="movie__category">${movie.genres.map(
//           genre => ` ${genre.genre}`
//         )}</div>
//         ${
//           movie.rating &&
//           `
//         <div class="movie__average movie__average--${getClassByRate(
//           movie.rating
//         )}">${movie.rating}</div>
//         `
//         }
//       </div>
//         `;
//     moviesEl.appendChild(movieEl);
//   });
// }

// const form = document.querySelector("form");
// const search = document.querySelector(".header__search");

// form.addEventListener("submit", e => {
//   e.preventDefault();

//   const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
//   if (search.value) {
//     getMovies(apiSearchUrl);

//     search.value = "";
//   }
// });
// // пагінація  _____________________________________________________

// async function main(postsData) {
//   // const postsData = respData

//   let currentPage = 0;
//   let rows = 20;

//   function displayPagination(arrData) {
//     const paginationEl = document.querySelector('.pagination');
//     const pagesCount = 35;
//     const ulEl = document.createElement("ul");
//     ulEl.classList.add('pagination__list');

//     for (let i = 0; i < pagesCount; i++) {
//       const liEl = displayPaginationBtn(i+1);

//       ulEl.appendChild(liEl)
//     }
//     paginationEl.appendChild(ulEl)

//   }

//   function displayPaginationBtn(page) {
//     const liEl = document.createElement("li");
//     liEl.classList.add('pagination__item')
//     liEl.innerText = page

//     liEl.addEventListener('click', () => {
//       currentPage = page
//       if (currentPage == page) liEl.classList.add('pagination__item--active');
//       console.log("liEl.addEventListener  currentPage:", currentPage)
//     //   // displayList(postsData, rows, currentPage)
//     //   // showMovies(data)
//       let currentItemLi = document.querySelector('li.pagination__item--active');
//       currentItemLi.classList.remove('pagination__item--active');

//       liEl.classList.add('pagination__item--active');

//           if (currentPage) {
//             geMoviesPaginet(currentPage);
//           }
//     })

//     return liEl;
//   }

//   displayPagination(postsData, rows);

// }

// --------------------------
const API_KEY = "?api_key=fd87aef18dfd3a2446d882cb85b7272d";
const BASE_URL = "https://api.themoviedb.org/3";
const MAIN_PAGE_URL = "/trending/all/day";
const SEARCH_MOVIE_URL = "/search/movie";

const fetchFirstLoadMovies = async page => {
  const response = await fetch(
    `${BASE_URL}${MAIN_PAGE_URL}${API_KEY}&page=${page}&include_adult=false`
  );
  const firstLoadMovies = await response.json();
  console.log("fetchFirstLoadMovies  firstLoadMovies:", firstLoadMovies);
  showMovies(firstLoadMovies);
  return firstLoadMovies;
};

// fetchFirstLoadMovies(1)
function showMovies(data) {
  const moviesEl = document.querySelector(".movies");
  console.log("showMovies  moviesEl:", data);

  // Очищаем предыдущие фильмы
  document.querySelector(".movies").innerHTML = "";

  data.results.forEach(movie => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <div class="movie__cover-inner">
        <img
          src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
          class="movie__cover"
          alt="${movie.title}"
        />
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${
          movie.title ? movie.title : movie.name
        }</div>
        </div>
        ${
          movie.vote_average &&
          `
        <div class="movie__average movie__average--${getClassByRate(
          movie.vote_average
        )}">${Math.round(movie.vote_average)}</div>
        `
        }
      </div>
        `;
    moviesEl.appendChild(movieEl);
  });
}

function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

// pagination-------------------

const ul = document.querySelector("ul");
let allPages = 15;

function elem(allPages, page) {
  let li = "";

  let beforePages = page - 1;
  let afterPages = page + 1;
  let liActive;

  if (page > 1) {
    li += `<li class="btn" onclick="elem(allPages, ${
      page - 1
    })" ><i class="fas fa-angle-left"></i></li>`;
  }

  for (let pageLength = beforePages; pageLength <= afterPages; pageLength++) {
    if (pageLength > allPages) {
      continue;
    }
    if (pageLength == 0) {
      pageLength = pageLength + 1;
    }

    if (page == pageLength) {
      liActive = "active";
    } else {
      liActive = "";
    }

    li += `<li class="numb ${liActive}" onclick="elem(allPages, ${pageLength})" ><span>${pageLength}</span></li>`;
  }

  if (page < allPages) {
    li += `<li class="btn" onclick="elem(allPages, ${
      page + 1
    })" ><i class="fas fa-angle-right"></i></li>`;
  }

  ul.innerHTML = li;
  fetchFirstLoadMovies(page);
  // seach-----------------
  const form = document.querySelector("form");
  const search = document.querySelector(".header__search");

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (search.value) {
      fetchInputMovieTitle(page, search.value);
      search.value = "";
    }
  });
}

elem(allPages, 1);

// seach-----------------
// const form = document.querySelector("form");
// const search = document.querySelector(".header__search");

// form.addEventListener("submit", e => {
//   e.preventDefault();
//   if (search.value) {
//     fetchInputMovieTitle(1,search.value)
//     search.value = "";
//   }
// });

const fetchInputMovieTitle = async (page, movieTitle) => {
  const response = await fetch(
    `${BASE_URL}${SEARCH_MOVIE_URL}${API_KEY}&query=${movieTitle}&page=${page}&include_adult=false`
  );
  const responseObject = await response.json();
  showMovies(responseObject);
};
