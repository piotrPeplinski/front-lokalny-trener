function decodeJWT(token: string): Record<string, any> | null {
  try {
    const payload = token.split(".")[1]; // Get the payload part of the token
    const decoded = atob(payload); // Decode from Base64
    return JSON.parse(decoded); // Parse JSON
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

export { decodeJWT };
