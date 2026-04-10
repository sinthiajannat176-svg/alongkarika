import { db } from "./firebase.js";
import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

async function loadProducts(){
 const snap=await getDocs(collection(db,"products"));
 let html="";
 snap.forEach(p=>{
  const d=p.data();
  html+=`<div class="card"><img src="${d.image}"><h3>${d.title}</h3><p>${d.price}</p>
  <button onclick="buy('${p.id}')">Buy</button></div>`;
 });
 document.getElementById("products").innerHTML=html;
}
loadProducts();

window.buy=async function(id){
 const txid=prompt("Pay 01720550715\nEnter TXID");
 if(!txid) return alert("TXID required");
 await addDoc(collection(db,"orders"),{productId:id,txid:txid,user:"customer"});
 alert("Order placed");
};