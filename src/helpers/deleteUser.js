async function deleteUser(id) {
  try {
    const { default: fetch } = await import("node-fetch");

    const BASE_URL = "http://localhost:3000";

    const res = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete user");
    }
    console.log(`User with id ${id} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

module.exports = deleteUser;
