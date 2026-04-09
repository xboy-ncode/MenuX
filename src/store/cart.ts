import { map, computed } from 'nanostores';
import type { CartItem, Product } from '../types';

export const $cart = map<Record<string, CartItem>>({});

export const addCartItem = (product: Product) => {
  const cart = $cart.get();
  const existing = cart[product._id];

  if (existing) {
    $cart.setKey(product._id, { ...existing, quantity: existing.quantity + 1 });
  } else {
    $cart.setKey(product._id, { ...product, quantity: 1 });
  }
};

export const removeCartItem = (id: string) => {
  const cart = $cart.get();
  const existing = cart[id];

  if (existing && existing.quantity > 1) {
    $cart.setKey(id, { ...existing, quantity: existing.quantity - 1 });
  } else {
    const newCart = { ...cart };
    delete newCart[id];
    $cart.set(newCart);
  }
};

export const $totalQuantity = computed($cart, cart =>
  Object.values(cart).reduce((sum, item) => sum + item.quantity, 0)
);

export const $totalPrice = computed($cart, cart =>
  Object.values(cart).reduce((sum, item) => sum + (item.price * item.quantity), 0)
);

export const getWhatsAppLink = (phoneNumber: string) => {
  const items = Object.values($cart.get());
  if (!items.length) return "#";

  const list = items.map(i => `• ${i.quantity}x ${i.name} ($${i.price * i.quantity})`).join('\n');
  const total = $totalPrice.get();

  const text = `🔥 *Pedido Perros y Hamburguesas Premium* 🔥\n\n${list}\n\n💰 *Total: ${total}*\n\nEspero datos de pago.`;
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
};

export const sendOrderToWebhook = async (customerPhone: string) => {
  const items = Object.values($cart.get()).map(item => ({
    sku: item.sku,
    name: item.name,
    quantity: item.quantity
  }));
  const total_price = $totalPrice.get();

  const webhookUrl = import.meta.env.PUBLIC_MAKE_WEBHOOK_URL;
  if (!webhookUrl) throw new Error("PUBLIC_MAKE_WEBHOOK_URL no está definida en las variables de entorno");

  const mensajeArmado = `🔥 *Pedido Perros Y Hamburguesas Premium* 🔥\n\n` +
    Object.values($cart.get()).map(i => `• ${i.quantity}x ${i.name}`).join('\n') +
    `\n\n💰 *Total: $${total_price}*`;

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      customer_phone: customerPhone,
      total_price: total_price,
      items: items,
      mensaje_whatsapp: mensajeArmado
    })
  });

  if (!response.ok) {
    throw new Error('Error al conectar con el servidor');
  }

  return await response.json();
};