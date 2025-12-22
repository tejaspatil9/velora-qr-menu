"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="w-full bg-[#0f0f0f] text-white">

      {/* ================= HERO SECTION ================= */}
      <div className="w-full h-screen flex flex-col items-center justify-center relative">

        {/* CURVED VIDEO FRAME */}
        <div
          className="relative w-[92%] h-[82vh] overflow-hidden"
          style={{ borderRadius: "48px 48px 140px 140px" }}
        >
          <video
            src="/velora-hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h1
              className="font-serif tracking-[0.18em] leading-tight"
              style={{ fontSize: "36px" }}
            >
              Where Flavours
              <br />
              Meet Elegance
            </h1>

            <p className="mt-6 text-[#d9c9a6] text-sm tracking-wide leading-relaxed">
              Rooftop Dining • Crafted Experiences
            </p>
          </div>
        </div>

        <div className="absolute bottom-6 text-[#e3d3b0] text-xs tracking-widest opacity-80">
          SCROLL
        </div>
      </div>

      {/* ================= CATEGORY SECTION ================= */}
      <div className="px-4 py-20">
        <h2
          className="font-serif tracking-widest mb-10 text-center"
          style={{ fontSize: "22px" }}
        >
          MENU CATEGORIES
        </h2>

        <div className="flex gap-6 overflow-x-auto pb-2">

          <Link href="/menu?category=Starters">
            <CategoryCard
              image="/categories/starters.jpeg"
              title="Starters"
            />
          </Link>

          <Link href="/menu?category=Main Course">
            <CategoryCard
              image="/categories/mains.jpeg"
              title="Main Course"
            />
          </Link>

          <Link href="/menu?category=Pizza">
            <CategoryCard
              image="/categories/pizza.jpeg"
              title="Pizza"
            />
          </Link>

          <Link href="/menu?category=Desserts">
            <CategoryCard
              image="/categories/desserts.jpeg"
              title="Desserts"
            />
          </Link>

          <Link href="/menu?category=Beverages">
            <CategoryCard
              image="/categories/beverages.jpeg"
              title="Beverages"
            />
          </Link>

        </div>
      </div>

      {/* ================= SPECIALITY SECTION ================= */}
      <div className="px-4 py-20">
        <h2
          className="font-serif tracking-widest mb-10 text-center"
          style={{ fontSize: "22px" }}
        >
          OUR SPECIALITY
        </h2>

        <div className="flex gap-5 overflow-x-auto pb-2">
          <SpecialityCard
            image="/spec-1.jpeg"
            title="Signature Dishes"
            desc="Curated flavours crafted by our chefs"
          />
          <SpecialityCard
            image="/spec-2.jpeg"
            title="Rooftop Ambience"
            desc="Open skies, warm lights, elegant vibes"
          />
          <SpecialityCard
            image="/spec-3.jpeg"
            title="Crafted Beverages"
            desc="Handcrafted cocktails & brews"
          />
          <SpecialityCard
            image="/spec-4.jpeg"
            title="Live Events"
            desc="Music nights & curated experiences"
          />
        </div>
      </div>

      {/* ================= CONTACT SECTION ================= */}
      <div className="px-4 py-20 bg-[#0b0b0b]">
        <h2
          className="font-serif tracking-widest mb-12 text-center"
          style={{ fontSize: "22px" }}
        >
          CONTACT
        </h2>

        <div className="max-w-md mx-auto space-y-7 text-center">
          <a
            href="https://maps.google.com/?q=Velora+Pune"
            target="_blank"
            className="block bg-[#151515] rounded-xl p-7 transition-all duration-300 active:scale-[0.97]"
          >
            <p className="text-[#e3d3b0] text-xs tracking-widest mb-2">
              LOCATION
            </p>
            <p className="text-sm text-gray-300">
              Velora Rooftop Restaurant, Pune
            </p>
          </a>

          <div className="bg-[#151515] rounded-xl p-7">
            <p className="text-[#e3d3b0] text-xs tracking-widest mb-2">
              TIMINGS
            </p>
            <p className="text-sm text-gray-300">
              Everyday · 12:00 PM – 11:30 PM
            </p>
          </div>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            className="block bg-[#1f3d2b] rounded-xl p-7 transition-all duration-300 active:scale-[0.97]"
          >
            <p className="text-[#cfe8d9] text-xs tracking-widest mb-2">
              WHATSAPP
            </p>
            <p className="text-sm text-white">
              Chat with us on WhatsApp
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ================= CATEGORY CARD ================= */
function CategoryCard({ image, title }) {
  return (
    <div className="min-w-[340px] bg-[#151515] rounded-xl overflow-hidden transition-transform duration-300 active:scale-[0.96] cursor-pointer">
      <img
        src={image}
        alt={title}
        className="w-full h-[420px] object-cover"
      />
      <div className="py-3 px-2 text-center">
        <p className="text-sm tracking-wide">{title}</p>
      </div>
    </div>
  );
}

/* ================= SPECIALITY CARD ================= */
function SpecialityCard({ image, title, desc }) {
  return (
    <div className="min-w-[220px] bg-[#151515] rounded-xl overflow-hidden transition-transform duration-300 active:scale-[0.97]">
      <img
        src={image}
        alt={title}
        className="w-full h-[320px] object-cover"
      />
      <div className="p-4">
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
