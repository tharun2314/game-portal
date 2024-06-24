// authService.js

// Example function to check if the user is authenticated
export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    // Check if a token exists and is not expired
    return token !== null && !isTokenExpired();
  };
  
  // Example function to get token expiration time
  export const getTokenExpiration = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
  
    try {
      const { exp } = JSON.parse(atob(token.split(".")[1]));
      return exp * 1000; // Convert to milliseconds
    } catch (error) {
      console.log("Error parsing token payload:", error);
      return null;
    }
  };
  
  // Example function to check if token is expired
  export const isTokenExpired = () => {
    const expiration = getTokenExpiration();
    return expiration && Date.now() >= expiration;
  };
  
  // Example function to log out the user
  export const logout = () => {
    localStorage.removeItem("token");
    // Optionally perform any additional cleanup or redirect
  };
  