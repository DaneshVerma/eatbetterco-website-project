export const login = (email) => {
  localStorage.setItem('user', JSON.stringify({ email }));  
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export const isLoggedIn = () => {
  return !!localStorage.getItem('user');
};
