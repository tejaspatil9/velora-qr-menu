"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

/* ================= CONFIG ================= */

const WHATSAPP_NUMBER = "917420096566"; // change if needed

/* ================= MAIN PAGE ================= */

export default function MenuPage() {
  const [table, setTable] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("velora_table");
    if (saved) setTable(Number(saved));
  }, []);

  if (!table) return <TableSelection onSelect={setTable} />;

  return <Menu table={table} />;
}

/* ================= TABLE SELECTION ================= */

function TableSelection({ onSelect }) {
  return (
    <main className="min-h-screen bg-white text-black flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <h1 className="text-lg font-medium mb-2">Select Your Table</h1>
        <p className="text-sm text-gray-500 mb-8">
          Please choose your table number
        </p>

        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 15 }, (_, i) => i + 1).map((t) => (
            <button
              key={t}
              onClick={() => {
                localStorage.setItem("velora_table", t.toString());
                onSelect(t);
              }}
              className="py-4 rounded-lg border border-gray-300 text-sm font-medium hover:bg-black hover:text-white transition"
            >
              Table {t}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}

/* ================= MENU ================= */

const categories = ["Starters", "Main Course", "Drinks"];

function Menu({ table }) {
  const searchParams = useSearchParams();

  const [active, setActive] = useState("Starters");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [orderNote, setOrderNote] = useState("");

  const startersRef = useRef(null);
  const mainRef = useRef(null);
  const drinksRef = useRef(null);

  /* ---------- AUTO SCROLL FROM LANDING ---------- */
  useEffect(() => {
    const cat = searchParams.get("category");
    if (!cat) return;
    scrollTo(cat);
  }, [searchParams]);

  function scrollTo(cat) {
    setActive(cat);
    const map = {
      Starters: startersRef,
      "Main Course": mainRef,
      Drinks: drinksRef,
    };
    map[cat]?.current?.scrollIntoView({ behavior: "smooth" });
  }

  function getItem(id) {
    return cart.find((c) => c.id === id);
  }

  function addItem(item) {
    setCart((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }

  function updateQty(id, delta) {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, qty: p.qty + delta } : p
        )
        .filter((p) => p.qty > 0)
    );
  }

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalAmount = cart.reduce((s, i) => s + i.qty * i.price, 0);

  function generateWhatsappText() {
    let text = `🪑 Table ${table}\n\n🧾 Order:\n`;
    cart.forEach((item) => {
      text += `• ${item.name} x${item.qty} — ₹${item.price * item.qty}\n`;
    });
    if (orderNote) text += `\n📝 Note: ${orderNote}\n`;
    text += `\n💰 Total: ₹${totalAmount}`;
    return encodeURIComponent(text);
  }

  return (
    <main className="min-h-screen bg-white text-black px-4 pb-36">

      {/* HEADER */}
      <header className="sticky top-0 bg-white z-20 pt-5 pb-4 border-b flex justify-between">
        <div>
          <h1 className="text-base font-medium">Velora Menu</h1>
          <p className="text-xs text-gray-500">Table {table}</p>
        </div>

        <button
          onClick={() => {
            localStorage.removeItem("velora_table");
            location.reload();
          }}
          className="text-xs underline"
        >
          Change
        </button>
      </header>

      {/* CATEGORY BAR */}
      <div className="mt-5 mb-8 flex gap-3 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => scrollTo(cat)}
            className={`px-4 py-2 rounded-full text-sm ${
              active === cat ? "bg-black text-white" : "border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* MENU SECTIONS */}
      <div className="space-y-20">

        <div ref={startersRef}>
          <Category title="Starters">
            <Dish
              id="cs"
              name="Crispy Starters"
              description="Lightly seasoned and perfectly fried."
              price={280}
              img="/menu/sample.jpg"
              cartItem={getItem("cs")}
              onAdd={addItem}
              onQty={updateQty}
            />
          </Category>
        </div>

        <div ref={mainRef}>
          <Category title="Main Course">
            <Dish
              id="mc"
              name="Signature Main Dish"
              description="Chef curated premium flavours."
              price={420}
              img="/menu/sample.jpg"
              cartItem={getItem("mc")}
              onAdd={addItem}
              onQty={updateQty}
            />
          </Category>
        </div>

        <div ref={drinksRef}>
          <Category title="Drinks">
            <Dish
              id="dr"
              name="Refreshing Beverage"
              description="Crafted in-house."
              price={220}
              img="/menu/sample.jpg"
              cartItem={getItem("dr")}
              onAdd={addItem}
              onQty={updateQty}
            />
          </Category>
        </div>

      </div>

      {/* FLOATING CART */}
      {totalItems > 0 && (
        <div className="fixed bottom-4 left-4 right-4">
          <button
            onClick={() => setShowCart(true)}
            className="w-full bg-black text-white py-4 rounded-xl"
          >
            {totalItems} items · ₹{totalAmount} — View Cart
          </button>
        </div>
      )}

      {/* CART MODAL */}
      {showCart && (
        <div className="fixed inset-0 bg-black/40 flex items-end z-50">
          <div className="bg-white w-full rounded-t-2xl p-5 max-h-[85vh] overflow-y-auto">

            <div className="flex justify-between mb-4">
              <h2 className="font-medium">Your Order</h2>
              <button onClick={() => setShowCart(false)}>✕</button>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="border-b pb-3 mb-3">
                <div className="flex justify-between">
                  <p>{item.name}</p>
                  <p>₹{item.price * item.qty}</p>
                </div>

                <div className="flex gap-3 mt-2">
                  <button onClick={() => updateQty(item.id, -1)}>−</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)}>+</button>
                </div>
              </div>
            ))}

            <textarea
              placeholder="Order note (optional)"
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              className="w-full border p-2 text-sm rounded-md"
            />

            <div className="mt-4 font-medium">
              Total: ₹{totalAmount}
            </div>

            <div className="mt-4 space-y-3">
              <button
                onClick={() => setShowCart(false)}
                className="w-full bg-black text-white py-3 rounded-lg"
              >
                Show Order to Waiter
              </button>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${generateWhatsappText()}`}
                target="_blank"
                className="block text-center border border-black py-3 rounded-lg"
              >
                Send Order via WhatsApp
              </a>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}

/* ================= COMPONENTS ================= */

function Category({ title, children }) {
  return (
    <div>
      <h2 className="text-sm text-gray-600 mb-6">{title}</h2>
      <div className="space-y-8">{children}</div>
    </div>
  );
}

function Dish({
  id,
  name,
  description,
  price,
  img,
  cartItem,
  onAdd,
  onQty,
}) {
  return (
    <div className="flex gap-4 border-b pb-4">
      <div className="relative w-20 h-20 rounded overflow-hidden">
        <Image src={img} alt={name} fill className="object-cover" />
      </div>

      <div className="flex-1">
        <div className="flex justify-between">
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-gray-500">{description}</p>
          </div>
          <p className="text-sm">₹{price}</p>
        </div>

        {!cartItem ? (
          <button
            onClick={() => onAdd({ id, name, description, price })}
            className="mt-2 border px-4 py-1 rounded-full text-xs"
          >
            Add
          </button>
        ) : (
          <div className="mt-2 flex gap-3 items-center">
            <button onClick={() => onQty(id, -1)}>−</button>
            <span>{cartItem.qty}</span>
            <button onClick={() => onQty(id, 1)}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}
