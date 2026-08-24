

async function getRecipe(recipe = 'corn') 
{
  loader(true)
  try {
  var response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/search?q=${recipe}&page=1&limit=25`
  );

  var resData = await response.json();
  console.log(resData);

  displayData(resData.results);
  }catch(err){
    console.log(`error ${err}`)
  }finally{
    loader(false)
  }
}

getRecipe();

function displayData(list) {
  console.log('display', list);

  var htmlMarkup;

  if (list.length > 0) {
    htmlMarkup = list.map(function (rec) {
      return `
        <div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="52772"
            >
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${rec.thumbnail}"
                  alt="Teriyaki Chicken Casserole"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrp-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${rec.category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                  ${rec.area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
             ${rec.name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                ${rec.instructions}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                                  ${rec.category}

                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                ${rec.area}
                  </span>
                </div>
              </div>
            </div>
      `;
    }).join('');
  }else{
      htmlMarkup = `<div class="flex flex-col items-center justify-center py-12 text-center">
            <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <i class="text-2xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-magnifying-glass" data-prefix="fas" data-icon="magnifying-glass" role="img" viewBox="0 0 512 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg></i>
            </div>
            <p class="text-gray-500 text-lg">No recipes found. Try a different search term.</p>
        </div>`
    }

  console.log(htmlMarkup);
  document.getElementById('recipes-grid').innerHTML = htmlMarkup
}
let searchInput = document.querySelector("#search-input");

searchInput.addEventListener("input", function () {
    let searchTerm = searchInput.value;
    getRecipe(searchTerm);
});
var loadingScreen = document.getElementById('app-loading-overlay')
function loader(isShown){
if(isShown){
  loadingScreen.style.display = 'flex'
}else {
    loadingScreen.style.display = 'none'
}
}