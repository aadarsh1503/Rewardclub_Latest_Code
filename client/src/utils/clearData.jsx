export const clearData = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("userType");
  localStorage.removeItem("userId");
  localStorage.removeItem("user");
  // Clear any other data if needed
  // localStorage.clear(); // if you want to clear all
};