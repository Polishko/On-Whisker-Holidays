// export const isTokenExpired = (token) => {
//   if (!token) return true;

//   const payload = JSON.parse(atob(token.split(".")[1]));
//   const expiry = payload.exp * 1000;
//   return Date.now() > expiry;
// };

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) {
      console.error("Invalid token format: Missing payload");
      return true;
    }

    const payload = JSON.parse(atob(payloadPart));

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
