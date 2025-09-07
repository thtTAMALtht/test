//active category button
const removeAutoActive = () => {
    const remove = document.querySelectorAll('.auto-active');
    remove.forEach(rmv => rmv.classList.remove('active'))
}

//spinner
const showSpinner = (status)=>{
  if(status){
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('all-plants-container').classList.add('hidden');
  }else{
    document.getElementById('spinner').classList.add('hidden');
    document.getElementById('all-plants-container').classList.remove('hidden');
  }
}

//fetch categories
const fetchCategories = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}

//display categories
const displayCategories = (items) => {
    const categoriesContainer = document.getElementById('Categories-container');
    categoriesContainer.innerHTML = '';
    items.forEach(item => {
        const categoriesDiv = document.createElement('div');
        categoriesDiv.innerHTML = `
        <button onclick="loadTree(${item.id})" id="category-${item.id}" class="auto-active w-full flex justify-start rounded-sm text-[#1F2937] cursor-pointer p-2 mb-1">${item.category_name}</button>
    `
        categoriesContainer.appendChild(categoriesDiv)
    });
}

fetchCategories()

//fetch all plants

const fetchAllPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then(plant => displayAllPlants(plant.plants))
}

//display all plants

const displayAllPlants = (plants) => {
    const allPlantsContainer = document.getElementById('all-plants-container');
    allPlantsContainer.innerHTML = '';
    plants.forEach(plant => {
        const allPlantsDiv = document.createElement('div');
        allPlantsDiv.innerHTML = `
        <div class="p-4 bg-white rounded-lg flex flex-col justify-between h-full shadow-md">
              <div class="space-y-4 flex flex-col flex-1">
                <img class="w-full h-[300px] object-cover rounded-lg" src="${plant.image}" alt="card image">
                <h3 onclick="plantDetails(${plant.id})" class="font-semibold cursor-pointer">${plant.name}</h3>
                <p class="text-sm text-[#4C545F]">${plant.description}</p>
                <div class="flex justify-between items-center pb-4 mt-auto">
                  <button
                    class="bg-[#DCFCE7] rounded-full px-5 py-2 text-[#15803D]">${plant.category}
                  </button>
                  <h5>৳${plant.price}</h5>
                </div>
              </div>
              <div>
                <button class="cart-btn  w-full rounded-full bg-[#15803D] text-white p-3 cursor-pointer">Add to Cart
                  </button>
              </div>
          </div>
    `
        allPlantsContainer.appendChild(allPlantsDiv)
    });

}
fetchAllPlants()

//fetch Plants Detail
const plantDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
        .then(res => res.json())
        .then(details => displayPlantDetails(details.plants))
}

const displayPlantDetails = (plants) => {
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = `
    <div class="bg-white rounded-xl p-2 placeholder:flex flex-col justify-between h-full w-full">
                <div class="border border-green-200 rounded-xl p-4">
                    <div>
                        <h2 class="font-bold text-2xl pb-4">${plants.name}</h2>
                        <img class="w-full h-[300px] object-cover rounded-xl" src="${plants.image}" alt="">
                        <h3 class="pt-4"><span class = "font-bold">Category:</span> ${plants.category}</h3>
                        <h4 class="py-4"><span class = "font-bold">Price:</span> ৳${plants.price}</h4>
                        <p class=""><span class = "font-bold">Description:</span> ${plants.description}</p>
                    </div>
                </div>
            </div>
  `;

    document.getElementById('my_modal').showModal();

}

//fetch plants by its category id

const loadTree = (id) => {
   showSpinner(true)
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeAutoActive();
            const clickBtn = document.getElementById(`category-${id}`)
            clickBtn.classList.add('active')
            displaySpecifiqTree(data.plants)
            showSpinner(false);
        })
}

//display Specifiq Tree
const displaySpecifiqTree = (trees) => {
    const plantsConatiner = document.getElementById('all-plants-container');
    plantsConatiner.innerHTML = '';

    trees.forEach(tree => {
        const treeDiv = document.createElement('div');
        treeDiv.innerHTML = `
      <div class="p-4 bg-white rounded-lg flex flex-col justify-between h-full shadow-md">
              <div class="space-y-4">
                <img class="w-full h-[300px] object-cover rounded-lg" src="${tree.image}" alt="card image">
                <h3 onclick="plantDetails(${tree.id})" class="font-semibold cursor-pointer">${tree.name}</h3>
                <p class="text-sm text-[#4C545F]">${tree.description}</p>
                <div class="flex justify-between items-center pb-4">
                  <button
                    class="bg-[#DCFCE7] rounded-full px-5 py-2 text-[#15803D]">${tree.category}</button>
                  <h5>৳${tree.price}</h5>
                </div>
              </div>
              <div>
                <button
                  class="cart-btn w-full rounded-full bg-[#15803D] text-white p-3">Add to Cart</button>
              </div>
            </div>
    `
        plantsConatiner.appendChild(treeDiv)
        //  showSpinner(false)
    });
}

//add to cart start
let amount = 0;
const totalAmount = document.getElementById('total-amount');
const cartItems = document.getElementById('cart-items');
const totalAmountContainer = document.getElementById('total-amount-container');



document.getElementById('all-plants-container').addEventListener('click', function(e) {
  if (e.target.classList.contains('cart-btn')) {
    alert('item added successfully')
    totalAmountContainer.classList.remove('hidden');
    const treeCard = e.target.parentNode.parentNode;
    const treeName = treeCard.children[0].children[1].innerText;
    const treePriceText =treeCard.children[0].children[3].children[1].innerText;
    const treePrice = Number(treePriceText.replace('৳',''));
    

   const totalCartDiv = document.createElement('div');
    totalCartDiv.className = 'flex justify-between items-center p-4 rounded-lg bg-[#F0FDF4] mb-4';
   totalCartDiv.innerHTML = `
    <div>
        <h4 class="font-bold">${treeName}</h4>
        <p>৳ <span>${treePrice}</span></p>
    </div>
      <i class="fa-solid fa-xmark text-red-500 cursor-pointer remove-item"></i>
   
   `
    cartItems.appendChild(totalCartDiv)

    amount = amount + treePrice;
    totalAmount.innerText = amount;
  }
});

//remove cart items
cartItems.addEventListener('click',function(e){
  if(e.target.classList.contains('remove-item')){
    alert('item removed successfully');
    const cartItem = e.target.parentNode;
    const cartItemPrice = Number(cartItem.children[0].children[1].children[0].innerText);
     
    amount = amount - cartItemPrice;
     totalAmount.innerText = amount;
      cartItem.remove();
if(cartItems.children.length === 0){
    totalAmountContainer.classList.add('hidden');
    amount = 0;                                     // হিসাব রিসেট
    totalAmount.innerText = amount;
  }
  }
})


