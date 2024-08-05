// export const isTokenExpired = (token) => {
//   if (!token) return true;

//   const payload = JSON.parse(atob(token.split(".")[1]));
//   const expiry = payload.exp * 1000;
//   return Date.now() > expiry;
// };

export const isTokenExpired = (token) => {
  if (!token) {
    console.error("No token provided");
    return true;
  }

  console.log("Token received:", token);

  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      console.error("Invalid token format: Token should have three parts");
      return true;
    }

    const payloadPart = parts[1];
    console.log("Payload part:", payloadPart);

    if (!payloadPart) {
      console.error("Invalid token format: Missing payload");
      return true;
    }

    const payload = JSON.parse(atob(payloadPart));
    console.log("Decoded payload:", payload);

    if (!payload.exp) {
      console.error("Invalid token format: Missing expiration");
      return true;
    }

    const expiry = payload.exp * 1000; // Convert expiration time from seconds to milliseconds
    return Date.now() > expiry;
  } catch (error) {
    console.error("Failed to decode token or check expiration:", error);
    return true;
  }
};
