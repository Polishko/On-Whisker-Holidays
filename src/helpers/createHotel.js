import fetch from "node-fetch";

const BASE_URL = "http://localhost:3000";

async function createHotel(hotelData) {
  try {
    const res = await fetch(`${BASE_URL}/hotels`, {
      method: "POST",
      body: JSON.stringify(hotelData),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      throw new Error("Failed to create hotel");
    }

    const data = await res.json();
    console.log("Hotel created successfully:", data);
  } catch (error) {
    console.error("There was an error creating the hotel:", error);
  }
}

// Update as necessary
const newHotel = {
  id: "Sunanini House",
  hotelName: "Sunanini House",
  country: "Bulgaria",
  countryCode: "🇧🇬",
  city: "Sapareva Banya",
  type: ["mountain", "nature"],
  position: {
    lat: 42.285136416470166,
    lng: 23.24898059723802,
  },
  img: "sunanini-main.jpg",
  web: "https://susanini.wordpress.com/",
  detail:
    "A cozy little house in Saparyeva Banya, situated at the foot of the mountain. Your furry friends will enjoy the big garden.",
  keywords: [
    "sunanini",
    "bulgaria",
    "sapareva",
    "saparyeva",
    "mountain",
    "nature",
    "house",
    "garden",
    "barbeque",
    "wifi",
    "parking",
    "airconditioner",
  ],
  facilities: ["wifi", "parking", "airconditioner"],
};

// Run the createHotel function
createHotel(newHotel);
// To run in the terminal: node createHotel.js
