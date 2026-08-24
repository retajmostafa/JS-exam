async function getRecipe(recipe = 'corn') {
  var response = await fetch(
    `https://nutriplan-api.vercel.app/api/meals/search?q=${recipe}&page=1&limit=25`
  );

  var resData = await response.json();
  console.log(resData);

  displayData(resData.results);
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
  }

  console.log(htmlMarkup);
  document.getElementById('recipes-grid').innerHTML = htmlMarkup
}
let searchInput = document.querySelector("#search-input");

searchInput.addEventListener("input", function () {
    let searchTerm = searchInput.value;
    getRecipe(searchTerm);
});z