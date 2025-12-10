const baseUrl1 = import.meta.env.VITE_BASE_URL_REWARDCLUB;
export const clearData = () => {
  localStorage.removeItem("authToken");
  // Clear any other data if needed
  // localStorage.clear(); // if you want to clear all
  window.location.href = `${baseUrl1}/login`;
};