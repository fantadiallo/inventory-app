export function logoutUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("business_code");
}
