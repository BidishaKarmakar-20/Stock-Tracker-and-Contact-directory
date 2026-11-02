/* Connect & Stock — browser-based data storage using localStorage. */
"use strict";

const STORAGE_KEY = "connect-stock-v1";
const readData = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{"contacts":[],"products":[]}');
    return { contacts: Array.isArray(saved.contacts) ? saved.contacts : [], products: Array.isArray(saved.products) ? saved.products : [] };
  } catch {
    return { contacts: [], products: [] };
  }
};
let data = readData();

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  renderAll();
}
function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
}
function notify(message, error = false) {
  const el = document.getElementById("notice");
  el.textContent = message;
  el.className = `notice show ${error ? "error" : "success"}`;
  window.clearTimeout(notify.timer);
  notify.timer = window.setTimeout(() => { el.className = "notice"; }, 2800);
}
function showPage(name) {
  document.querySelectorAll(".page").forEach(p => p.classList.toggle("active", p.id === name));
  document.querySelectorAll(".nav-link").forEach(b => b.classList.toggle("active", b.dataset.page === name));
  document.getElementById("crumb").textContent = name === "overview" ? "Overview" : name === "contacts" ? "Contacts" : "Stock tracker";
  window.scrollTo({ top: 0, behavior: "smooth" });
}
document.querySelectorAll("[data-page]").forEach(b => b.addEventListener("click", () => showPage(b.dataset.page)));
document.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => showPage(b.dataset.go)));

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const contact = { name: form.get("name").trim(), phone: form.get("phone").trim(), email: form.get("email").trim() };
  if (!contact.name || !contact.phone) return notify("Name and phone number are required.", true);
  if (data.contacts.some(c => c.phone === contact.phone)) return notify("That phone number is already in the directory.", true);
  data.contacts.push(contact);
  event.currentTarget.reset();
  saveData();
  notify("Contact saved successfully.");
});

document.getElementById("productForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get("name").trim();
  const quantity = Number(form.get("quantity"));
  const price = Number(form.get("price"));
  if (!name || !Number.isInteger(quantity) || quantity < 0 || !Number.isFinite(price) || price < 0) return notify("Enter a valid product, quantity and price.", true);
  if (data.products.some(p => p.name.toLowerCase() === name.toLowerCase())) return notify("A product with that name already exists.", true);
  data.products.push({ name, category: form.get("category").trim(), quantity, price });
  event.currentTarget.reset();
  saveData();
  notify("Stock item saved successfully.");
});

document.getElementById("contactSearch").addEventListener("input", renderContacts);
document.getElementById("productSearch").addEventListener("input", renderProducts);

function renderContacts() {
  const query = document.getElementById("contactSearch").value.toLowerCase().trim();
  const contacts = data.contacts.filter(c => [c.name, c.phone, c.email].some(v => v.toLowerCase().includes(query)));
  document.getElementById("contactRows").innerHTML = contacts.length ? contacts.map(c => `
    <tr><td><span class="table-person"><span class="avatar">${escapeHTML(c.name.charAt(0).toUpperCase())}</span><b>${escapeHTML(c.name)}</b></span></td>
    <td>${escapeHTML(c.phone)}</td><td>${escapeHTML(c.email || "—")}</td>
    <td><button class="delete-link" data-delete-contact="${escapeHTML(c.phone)}">Delete</button></td></tr>`).join("") : '<tr><td colspan="4" class="empty">No matching contacts found.</td></tr>';
  document.getElementById("contactPill").textContent = `${data.contacts.length} contacts`;
  document.getElementById("recentContacts").innerHTML = data.contacts.slice(-4).reverse().map(c => `
    <div class="simple-row"><span class="avatar">${escapeHTML(c.name.charAt(0).toUpperCase())}</span><div><b>${escapeHTML(c.name)}</b><small>${escapeHTML(c.email || c.phone)}</small></div><span class="row-end">${escapeHTML(c.phone)}</span></div>`).join("") || '<p class="empty">No contacts yet. Add your first contact.</p>';
}
function renderProducts() {
  const query = document.getElementById("productSearch").value.toLowerCase().trim();
  const products = data.products.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
  document.getElementById("productRows").innerHTML = products.length ? products.map(p => `
    <tr><td><b>${escapeHTML(p.name)}</b></td><td>${escapeHTML(p.category || "—")}</td>
    <td><span class="stock-badge ${p.quantity <= 5 ? "low" : ""}">${p.quantity} units</span></td>
    <td>₹${p.price.toFixed(2)}</td><td><b>₹${(p.quantity * p.price).toFixed(2)}</b></td>
    <td><div class="actions"><form class="inline-form" data-adjust="${escapeHTML(p.name)}"><input type="number" name="change" placeholder="+/-" aria-label="Stock adjustment" required><button class="mini-btn">Update</button></form><button class="delete-link" data-delete-product="${escapeHTML(p.name)}">Delete</button></div></td></tr>`).join("") : '<tr><td colspan="6" class="empty">No matching stock items found.</td></tr>';
  document.getElementById("productPill").textContent = `${data.products.length} products`;
  document.getElementById("recentProducts").innerHTML = data.products.slice(-4).reverse().map(p => `
    <div class="simple-row"><span class="avatar product-avatar">▤</span><div><b>${escapeHTML(p.name)}</b><small>${escapeHTML(p.category || "Uncategorised")}</small></div><span class="quantity">${p.quantity} units</span></div>`).join("") || '<p class="empty">No products yet. Add your first stock item.</p>';
}
document.addEventListener("click", event => {
  const contactPhone = event.target.dataset.deleteContact;
  const productName = event.target.dataset.deleteProduct;
  if (contactPhone && confirm("Delete this contact?")) {
    data.contacts = data.contacts.filter(c => c.phone !== contactPhone);
    saveData(); notify("Contact deleted.");
  }
  if (productName && confirm("Delete this product?")) {
    data.products = data.products.filter(p => p.name !== productName);
    saveData(); notify("Stock item deleted.");
  }
});
document.addEventListener("submit", event => {
  const form = event.target.closest("[data-adjust]");
  if (!form) return;
  event.preventDefault();
  const change = Number(new FormData(form).get("change"));
  if (!Number.isInteger(change)) return notify("Enter a whole number.", true);
  const product = data.products.find(p => p.name === form.dataset.adjust);
  if (!product) return;
  if (product.quantity + change < 0) return notify("Stock quantity cannot become negative.", true);
  product.quantity += change;
  saveData(); notify("Stock quantity updated.");
});
function renderAll() {
  document.getElementById("contactCount").textContent = data.contacts.length;
  document.getElementById("productCount").textContent = data.products.length;
  document.getElementById("totalUnits").textContent = data.products.reduce((sum, p) => sum + p.quantity, 0);
  document.getElementById("lowStock").textContent = data.products.filter(p => p.quantity <= 5).length;
  renderContacts(); renderProducts();
}
renderAll();