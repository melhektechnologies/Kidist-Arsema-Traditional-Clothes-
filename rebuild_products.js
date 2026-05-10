const fs = require('fs');
let html = fs.readFileSync('kidist-arsema.html', 'utf8');

const PRODUCTS = [
  { id: 1, img: "photos/photo_12_2026-05-10_14-19-11.jpg", name: "Addis Gold Kemis", price: "ETB 4,800", badge: "badge-new", badgeText: "New" },
  { id: 2, img: "photos/photo_13_2026-05-10_14-19-11.jpg", name: "Royal Green Shamma", price: "ETB 3,840", orig: "ETB 4,800", badge: "badge-new", badgeText: "New" },
  { id: 3, img: "photos/photo_14_2026-05-10_14-19-11.jpg", name: "Cream Ceremony Dress", price: "ETB 6,200", badge: "badge-new", badgeText: "New" },
  { id: 4, img: "photos/photo_15_2026-05-10_14-19-11.jpg", name: "Men's Coffee Gabi", price: "ETB 3,600", badge: "badge-new", badgeText: "New" },
  { id: 5, img: "photos/photo_16_2026-05-10_14-19-11.jpg", name: "Bridal White Kemis", price: "ETB 8,500", badge: "badge-new", badgeText: "New" },
  { id: 6, img: "photos/photo_17_2026-05-10_14-19-11.jpg", name: "Men's Ceremony Suit", price: "ETB 5,200", badge: "badge-new", badgeText: "New" },
  { id: 7, img: "photos/photo_18_2026-05-10_14-19-11.jpg", name: "Tilet Gold Edition", price: "ETB 4,200", orig: "ETB 5,000", badge: "badge-sale", badgeText: "Sale" },
  { id: 8, img: "photos/photo_19_2026-05-10_14-19-11.jpg", name: "Modern Habesha Kemis", price: "ETB 3,900", badge: "badge-new", badgeText: "New" }
];

let productsHTML = '<div class="products-grid">';
PRODUCTS.forEach(p => {
  const escName = p.name.replace(/'/g, "\\'");
  productsHTML += `
    <div class="product-card reveal" data-product-id="${p.id}" onclick="openQuickView(${p.id})">
      <div class="product-img-wrap">
        <img src="${p.img}" class="product-img" alt="${p.name}" loading="lazy">
        <div class="product-badges"><span class="badge ${p.badge}">${p.badgeText}</span></div>
        <div class="product-actions">
          <button class="action-btn" onclick="addToCart('${escName}','${p.price}','${p.img}')">Add to Bag</button>
          <button class="action-btn action-btn-icon" onclick="openQuickView(${p.id})" title="Quick View">👁</button>
          <button class="action-btn action-btn-icon" title="Wishlist">♡</button>
        </div>
      </div>
      <div class="product-name">${p.name}</div>
      <div class="product-price">
        <span class="price-current">${p.price}</span>
        ${p.orig ? `<span class="price-original">${p.orig}</span>` : ''}
      </div>
      <div class="product-rating"><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span></div>
    </div>`;
});
productsHTML += '</div>';

// Replace the entire products-grid section
html = html.replace(/<div class="products-grid">[\s\S]*?<\/div>[\s\S]*?<\/section>/, productsHTML + '\n</section>');

fs.writeFileSync('kidist-arsema.html', html, 'utf8');
console.log('✅ Rebuilt products grid with correct Quick View buttons.');
