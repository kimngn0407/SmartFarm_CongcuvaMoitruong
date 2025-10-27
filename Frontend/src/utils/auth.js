// auth.js
import jwtDecode from "jwt-decode";

// Lấy token từ localStorage và giải mã
export function getCurrentUser() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded; // ví dụ: { sub: ..., email: ..., role: "ADMIN" }
  } catch (err) {
    return null;
  }
}

export function getRole() {
  const user = getCurrentUser();
  return user?.role || null;
}
