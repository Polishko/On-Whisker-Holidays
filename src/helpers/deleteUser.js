import fetch from "node-fetch"; // allows fetchin in Node.js environment

const BASE_URL = "http://localhost:3000";

async function deleteUser(id) {
  try {
    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete user");
    }

    console.log(`User with ID ${id} deleted successfully`);
  } catch (error) {
    console.error("There was an error deleting the user:", error);
  }
}

const userIdToDelete = 1; // Change as required

deleteUser(userIdToDelete);

// run script from terminal: node deleteUser.js
