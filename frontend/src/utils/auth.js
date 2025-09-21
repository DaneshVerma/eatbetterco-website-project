// utils/auth.js

export const login = ({ email }) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const user = users.find((u) => u.email === email);
  if (user) {
    localStorage.setItem("email", user.email);
    localStorage.setItem("name", user.name);
    return true; // login successful
  }
  return false; // user not found
};

export const signup = ({ email, name }) => {
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) return false; // already exists

  const newUser = { email, name };
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  // log in the user
  localStorage.setItem("email", email);
  localStorage.setItem("name", name);
  return true;
};

export const logout = () => {
  localStorage.removeItem("email");
  localStorage.removeItem("name");
};

export const isLoggedIn = () => {
  return !!localStorage.getItem("email") && !!localStorage.getItem("name");
};

export const getUser = () => {
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  return email && name ? { email, name } : null;
};
