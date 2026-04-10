import { db } from "./firebase.js";
import { collection,getDocs,deleteDoc,doc,updateDoc,addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let chart;

async function loadStats(){
 const u=await getDocs(collection(db,"users"));
 const p=await getDocs(collection(db,"products"));
 const o=await getDocs(collection(db,"orders"));
 usersCount.innerText="Users:"+u.size;
 productsCount.innerText="Products:"+p.size;
 ordersCount.innerText="Orders:"+o.size;

 const ctx=document.getElementById("chart");
 if(chart) chart.destroy();
 chart=new Chart(ctx,{type:"bar",
 data:{labels:["Users","Products","Orders"],
 datasets:[{data:[u.size,p.size,o.size]}]}});
}
loadStats();

window.loadUsers=async()=>{
 const snap=await getDocs(collection(db,"users"));
 content.innerHTML="";
 snap.forEach(u=>{
  const d=u.data();
  content.innerHTML+=`<div class="card">${d.email}
  <button onclick="banUser('${u.id}',${d.banned})">Ban</button></div>`;
 });
};

window.banUser=async(id,b)=>{
 await updateDoc(doc(db,"users",id),{banned:!b});
 loadUsers();
};

window.loadProducts=async()=>{
 const snap=await getDocs(collection(db,"products"));
 content.innerHTML="";
 snap.forEach(p=>{
  const d=p.data();
  content.innerHTML+=`<div class="card">${d.title}
  <button onclick="deleteProduct('${p.id}')">Delete</button></div>`;
 });
};

window.deleteProduct=async(id)=>{
 await deleteDoc(doc(db,"products",id));
 loadProducts();
};

window.loadOrders=async()=>{
 const snap=await getDocs(collection(db,"orders"));
 content.innerHTML="";
 snap.forEach(o=>{
  const d=o.data();
  content.innerHTML+=`<div class="card">${d.txid}</div>`;
 });
};

window.addProduct=async()=>{
 await addDoc(collection(db,"products"),{
  title:title.value,price:price.value,image:image.value,category:cat.value,uploader:"admin"
 });
 alert("Added");
};