const productos = [
  { id: 1, nombre: "perfume 50ml", precio: 25000, img: "https://via.placeholder.com/150" },
  { id: 2, nombre: "Cuaderno A5", precio: 8000, img: "https://via.placeholder.com/150" },
  { id: 3, nombre: "Estuche lápices", precio: 15000, img: "https://via.placeholder.com/150" },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const contenedor = document.getElementById("productos");
const modal = document.getElementById("modalCarrito");
const lista = document.getElementById("listaCarrito");
const total = document.getElementById("total");
const badge = document.getElementById("contadorCarrito");

function renderProductos() {
  productos.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${p.img}">
      <h3>${p.nombre}</h3>
      <p>$${p.precio.toLocaleString()}</p>
      <input type="number" id="cant-${p.id}" min="1" value="1" style="width:60px">
      <button class="btn" onclick="agregar(${p.id})">Agregar</button>`;
    contenedor.appendChild(div);
  });
}

function agregar(id) {
  const cant = parseInt(document.getElementById("cant-"+id).value);
  const prod = productos.find(p=>p.id===id);
  const existe = carrito.find(i=>i.id===id);
  if(existe){ existe.cantidad+=cant; } else { carrito.push({...prod, cantidad:cant}); }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
}

function actualizarContador(){
  const totalItems = carrito.reduce((acc, item)=>acc+item.cantidad,0);
  badge.style.display = totalItems>0 ? "inline-block" : "none";
  badge.textContent = totalItems;
}

document.getElementById("verCarrito").onclick = ()=>{
  modal.style.display="flex";
  mostrarCarrito();
};

document.getElementById("cerrarModal").onclick = ()=> modal.style.display="none";
document.getElementById("vaciarCarrito").onclick = ()=>{ carrito=[]; localStorage.setItem("carrito","[]"); mostrarCarrito(); actualizarContador(); };

function mostrarCarrito(){
  lista.innerHTML="";
  let totalCompra=0;
  carrito.forEach(item=>{
    totalCompra += item.precio*item.cantidad;
    lista.innerHTML += <p>${item.nombre} x${item.cantidad} = $${(item.precio*item.cantidad).toLocaleString()}</p>;
  });
  total.textContent = totalCompra.toLocaleString();
}

document.getElementById("pagarNequi").onclick = ()=>{
  alert("Simulación de pago con Nequi.\nGracias por tu compra 💖");
  carrito=[];
  localStorage.setItem("carrito","[]");
  mostrarCarrito();
  actualizarContador();
  modal.style.display="none";
};

renderProductos();
actualizarContador();
