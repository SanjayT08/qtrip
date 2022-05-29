
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it

  const urlParams = new URLSearchParams(search);
  for (const value of urlParams.values()) {
    return value;

  }
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data

  try {
    const res = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    const data = await res.json();
    return data;
  }
  catch(err) {
    return null 
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const dataContianer = document.getElementById("data");
   
  for (let element of adventures) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("col", "col-md-6", "col-lg-4", "mb-4");
    const card = `<div class="card tile" style="width: 18rem;">
    <a href="detail/?adventure=${element.id}" id=${element.id}>
    <img class="card-img-top activity-card-image" style="height: 400px; width: 300px" src="${element.image}" alt="Card image cap">
    <div class="category-banner">${element.category}</div>
    <div class="card-body">
      <div class="d-flex justify-content-between">
        <p>${element.name}</p>
        <p> &#8377; ${element.costPerHead}</p>
      </div>
      <div class="d-flex justify-content-between">
        <p>Duration</p>
        <p>${element.duration} Hour</p>
      </div>
     </div></a>
    </div>`;
    cardElement.innerHTML = card;
    dataContianer.appendChild(cardElement);
  }
}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list

return list.filter((item) => item.duration >= low && item.duration <= high)

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  
  return list.filter((item) => categoryList.includes(item.category))

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // let filterdlist ;
  // let filterDuration = filters.duration;
  // const filterDurationArr = filterDuration.split("-");
  let filteredList = [];
  if (filters["duration"].length > 0 && filters["category"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(list, parseInt(choice[0]), parseInt(choice[1]));
    filteredList = filterByCategory(filteredList, filters["category"]);
  }

  else if (filters["duration"].length > 0) {
    let choice = filters["duration"].split("-");
    filteredList = filterByDuration(
      list,
      parseInt(choice[0]),
      parseInt(choice[1])
    );
  }

  else if (filters["category"].length > 0) {
    filteredList = filterByCategory(list, filters["category"]);
  }

  else {
    filteredList = list;
  }
  return filteredList;
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters',JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  const filters = JSON.parse(localStorage.getItem('filters'))
  return filters;
  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  const catergorylist = document.getElementById('category-list');
 
  const catergoryArr = filters.category;
  
  catergoryArr.forEach((item)=> {
     const newdiv = document.createElement('div');
     newdiv.classList.add('category-filter')
     newdiv.innerText = item;
     catergorylist.appendChild(newdiv)
    
  })

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
