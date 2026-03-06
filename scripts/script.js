const categoriesSelect = document.getElementById("categories");
const treeSelect = document.getElementById("trees");
const loadingSpinner = document.getElementById("loadingSpinner");
const all = document.getElementById("all");

// For all trees btn
all.addEventListener("click", () => {
  const allButtons = document.querySelectorAll("#categories li, #all");

  allButtons.forEach((item) => {
    item.classList.remove("bg-[#15803D]");
    item.classList.remove("text-white");
  });

  all.classList.add("bg-[#15803D]");
  all.classList.add("text-white");
  loadTrees();
});

// For loading
const showLoading = () => {
  loadingSpinner.classList.remove("hidden");
};
const hideLoading = () => {
  loadingSpinner.classList.add("hidden");
};

// For toggle btn
const selectCategory = async (id, btn) => {
  const allButtons = document.querySelectorAll("#categories li, #all");

  allButtons.forEach((item) => {
    item.classList.remove("bg-[#15803D]");
    item.classList.remove("text-white");
  });

  btn.classList.add("bg-[#15803D]");
  btn.classList.add("text-white");
  treeSelect.innerHTML = "";
  showLoading();
  const res = await fetch(
    `https://openapi.programming-hero.com/api/category/${id}`,
  );
  const data = await res.json();
  hideLoading();
  displayTrees(data.plants);
};

// For category (Load category data)
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

// Display all categories
const displayCategories = (categories) => {
  categoriesSelect.innerHTML = "";
  for (let category of categories) {
    const li = document.createElement("li");
    li.classList.add("rounded-lg");
    li.innerHTML = `
        <a>${category.category_name}</a>
    `;
    li.onclick = () => selectCategory(category.id, li);
    categoriesSelect.appendChild(li);
  }
};

// For tree (Load tree data)
const loadTrees = async () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  try {
    showLoading();
    const res = await fetch(url);
    const data = await res.json();
    hideLoading();
    displayTrees(data.plants);
  } catch (error) {
    console.error("Error: ", error);
  }
};
loadTrees();

// Display All trees
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
