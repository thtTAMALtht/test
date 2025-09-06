// fetch categories
const fetchCategories =()=>{
    fetch('https://openapi.programming-hero.com/api/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}


//display categories
const displayCategories = (items)=>{
    const categoriesContainer = document.getElementById('Categories-container');
    // categoriesContainer.innerHTML = '';
    items.forEach(item => {
        console.log(item);
    const categoriesDiv = document.createElement('div');
    categoriesDiv.innerHTML = `
        <a class=" w-full flex justify-start hover:bg-teal-400 rounded-sm text-[#1F2937] cursor-pointer p-2 mb-1">${item.category_name}</a>
    `
    categoriesContainer.appendChild(categoriesDiv)
    });
}

fetchCategories()