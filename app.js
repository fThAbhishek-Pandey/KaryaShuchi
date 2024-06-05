// ****** SELECT ITEMS **********

const subBtn = document.querySelector(".submit-btn");
const KaryaList = document.querySelector(".KaryaShuchi-list");
const form = document.querySelector(".KaryaShuchi-form");
const clear = document.querySelector(".clear-btn");
// console.log("clear :  ",clear);
// console.log(subBtn);
// console.log(KaryaList);
// console.log(myKarya);
// edit option

// ****** EVENT LISTENERS **********
form.addEventListener("submit",addItem);

// clear.addEventListener("click",myclear);
clear.addEventListener("click" ,AllClear);

// ****** FUNCTIONS **********

function addItem(evt){
  evt.preventDefault();
  // alert("I am clicked");
  // console.log("evt",evt);
  // console.log("evt val",evt.value);
  const karya = document.querySelector("#KaryaShuchi");
  // console.log("karya : ",karya);
  const value = karya.value;

  console.log("val : ",value);
  if(karya == null) {
    alert("you Don't Type any Task");
  }
  else{
    let key = new Date().getTime().toString();
    console.log(key);
    AddLS(key,value);
    console.log("Hello");
    console.log(karya);
  }
  displayItem();
}
function displayItem(){
  console.log("I am Display Item");
  const list = JSON.parse(localStorage.getItem("list"));
  // console.log(list);
  // console.log("typeof : ",typeof list);
  KaryaList.innerHTML="";
  list.forEach((item)=>{
        // console.log("item",item);
        // console.log("type of ",typeof item);
        //  console.log("key :" , `${item.id}`);
        //  console.log("value ; ", `${item.value}`);
  let newElement = document.createElement('article');
  newElement.classList.add("KaryaShuchi-item");
  newElement.innerHTML = `
  <div id=${item.id}>${item.value}</div>
  <ul>
  <li><button class ="update-btn"><i class="fa-solid fa-pen-to-square"></i></button></li>
  <li><button class ="delete-btn"><i class="fa-solid fa-delete-left "></i></button></li>
  </ul>`;
  KaryaList.appendChild(newElement);
  // console.log(KaryaList);
const delItem = document.querySelectorAll(".delete-btn");
delItem.forEach((item)=>{
  //  console.log("I am selected  to deleted");
   item.addEventListener('click',remove);
});

const update  = document.querySelectorAll(".update-btn");
update.forEach((item)=>{
        // console.log(item);
        item.addEventListener('click',updateItem);
});


// displayItem();
  });
    // 
}
function updateItem(curr){
  //  alert ("I am ready to Update");
   console.log("I am ready to Update");
   const currItem = curr.currentTarget.parentElement.parentElement.parentElement;
   currItem.firstElementChild.innerHTML = "I am going to update this content";
  //  console.log(currItem);
  //  console.log(currItem.firstElementChild);
   displayItem();
}
function remove(curr){
  console.log("I am ready to deleted");

  // alert( "The Item is going to deleted");
  // const myKarya = document.querySelectorAll(".KaryaShuchi-item");
  // console.log("myKarya :",myKarya);
  const karyaList = document.querySelector(".KaryaShuchi-list");
  // console.log(karyaList);
  const target = curr.currentTarget.parentElement.parentElement.parentElement;
   
  // karyaList.removeChild(target);
  if(KaryaList.children.length ==0){
    karyaList.classList.remove(".show-container");
  }
  // 
// console.log("going to delete Ls item");
 const targetID = target.firstElementChild.id;
 console.log("targetID : ",targetID);
 let list =  getLS ();
 localStorage.removeItem("list");
 list = list.filter ((item)=> item.id !== targetID);
 localStorage.setItem("list", JSON.stringify(list));
 displayItem();
}
// ****** LOCAL STORAGE **********
function AddLS (key,value){
  // console.log("Hi , I am Local Storage");
  // console.log(key);
  // console.log(value);
  const id = key;
  // console.log("id : ",id);
  // console.log("typeof id : ", id);
  const meraKarya = { 
    id ,value 
  }
   console.log("meraKarya :",typeof meraKarya)
  // console.log(meraKarya);
  let MeraKaryaList = getLS();
  MeraKaryaList.push(meraKarya);
  localStorage.setItem("list", JSON.stringify(MeraKaryaList));
         
}
function AllClear(evt){
  // alert("All Todos Is Deleted");
 //  console.log("All clear");
  const target =  evt.currentTarget.parentElement;
 //  console.log( "All clear target",target);
 //  console.log("I am clear");
  KaryaList.innerHTML="";
  localStorage.removeItem("list");
 //  console.log(KaryaList);
}
function getLS (){
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) :[];
}


// ****** SETUP ITEMS **********
displayItem();