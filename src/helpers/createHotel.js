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

module.exports = createHotel;
