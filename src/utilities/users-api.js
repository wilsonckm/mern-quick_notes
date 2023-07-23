import sendRequest from "./send-request";

const BASE_URL = "/api/users";

export async function signUp(userData) {
  return sendRequest(BASE_URL, "Post", userData);
}

export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, "POST", credentials);
}

//get request- no payload needed
export async function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}
