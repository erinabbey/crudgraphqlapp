const TOKEN_KEY = "token";
const USER_NAME = "username";
export function saveTokens(tokens) {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
}
export function saveUsername(username) {
  localStorage.setItem(USER_NAME, JSON.stringify(username));
}

export function getTokens() {
  return JSON.parse(localStorage.getItem(TOKEN_KEY));
}
export function getUsername() {
  return JSON.parse(localStorage.getItem(USER_NAME));
}

export function deleteTokens() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_NAME);
}
