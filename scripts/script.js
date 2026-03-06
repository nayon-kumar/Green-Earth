// For category
const loadCategories = async () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  try {
    const res = await fetch(url);
    const data = await res.json();
    displayCategories(data.categories);
  } catch (error) {
    console.error("Error: ", error);
  }
};
loadCategories();

const categoriesSelect = document.getElementById("categories");
const displayCategories = (categories) => {
  categoriesSelect.innerHTML = "";
  for (let category of categories) {
    const li = document.createElement("li");
    li.innerHTML = `
        <a>${category.category_name}</a>
    `;
    categoriesSelect.appendChild(li);
  }
};

// For tree
const loadingSpinner = document.getElementById("loadingSpinner");
const loadTrees = async () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  try {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
    const res = await fetch(url);
    const data = await res.json();
    loadingSpinner.classList.add("hidden");
    displayTrees(data.plants);
  } catch (error) {
    console.error("Error: ", error);
  }
};
loadTrees();

const treeSelect = document.getElementById("trees");
const displayTrees = (trees) => {
  treeSelect.innerHTML = "";
  for (let tree of trees) {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="bg-white rounded-lg p-4">
                    <img
                      class="rounded-2xl mx-auto h-48 object-cover w-full"
                      src="${tree.image}"
                      alt="${tree.name}"
                    />
                    <h4 class="font-semibold text-[20px] mt-3 mb-2">
                      ${tree.name}
                    </h4>
                    <p class="line-clamp-2">
                      ${tree.description}
                    </p>
                    <div class="flex justify-between items-center mt-2">
                      <p class="bg-[#DCFCE7] px-5 py-2 rounded-lg">
                        ${tree.category}
                      </p>
                      <p>৳ <span>${tree.price}</span></p>
                    </div>
                    <div class="text-center">
                      <button
                        class="mt-3 bg-[#15803D] text-white w-full py-3 rounded-full cursor-pointer"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
    `;
    treeSelect.appendChild(div);
  }
};
