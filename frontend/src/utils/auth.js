import api from "../config/axiosConfig";
// utils/auth.js
function saveSession({ token, user }) {
  if (token) localStorage.setItem("token", token);
  if (user) localStorage.setItem("user", JSON.stringify(user));
  // notify app about auth change
  window.dispatchEvent(
    new CustomEvent("auth:changed", { detail: { isLoggedIn: true, user } })
  );
}

export async function signup({ email, password, name }) {
  const { data } = await api.post("/user/register", {
    email,
    password,
    name,
  });
  saveSession({ token: data.token, user: data.user });
  return data;
}

export async function login({ email, password }) {
  const { data } = await api.post("/user/login", { email, password });
  console.log(data);
  saveSession({ token: data.token, user: data.user });
  return data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // notify app about auth change
  window.dispatchEvent(
    new CustomEvent("auth:changed", {
      detail: { isLoggedIn: false, user: null },
    })
  );
}

export function isLoggedIn() {
  return !!localStorage.getItem("token");
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getUser() {
  const raw = localStorage.getItem("user");
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function getMe() {
  const { data } = await api.get("/user/me");
  if (data?.user) localStorage.setItem("user", JSON.stringify(data.user));
  return data.user;
}
