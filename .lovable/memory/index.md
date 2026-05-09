Anulakshmi Divine Pooja Store - saffron/gold/white spiritual ecommerce site

## Design System
- Primary: saffron (24 95% 53%)
- Accent: gold (43 96% 56%)
- Background: warm white (39 100% 99%)
- Fonts: Playfair Display (display), Source Sans 3 (body)
- Custom tokens: --saffron, --gold, --temple-brown, --cream
- Page backgrounds: page-bg-shop (golden gradient + mandala), page-bg-pooja (saffron + circles), page-bg-contact (warm + floral)

## Architecture
- CartContext for client-side cart state
- AuthContext for Supabase auth
- Static product data in src/data/products.ts with badge field (bestseller/new/limited)
- DB tables: orders, order_items, wishlist (all with RLS)
- Pages: Index, Products, ProductDetail, Cart, Checkout, OrderSuccess, Orders, PoojaBooking, Contact, Auth

## Features
- Full checkout flow: shipping form, UPI/Card/NetBanking payment, coupon codes
- Order management: order history, cancel orders, delivery status tracking
- Product badges: Best Seller, New Arrival, Limited Stock
- Sorting: price asc/desc, rating
- Price range filter
- Estimated delivery dates
- Custom spiritual product images (generated, stored in src/assets/products/)
