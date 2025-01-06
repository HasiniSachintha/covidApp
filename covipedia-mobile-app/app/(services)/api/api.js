import axios from "axios";

const BASE_URL = "192.168.94.123:8000/api";

export const registerUser = async (user) => {
  console.log(user);
  const response = await axios.post(
    `${BASE_URL}/users/register`,
    user,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
export const loginUser = async (user) => {
  const response = await axios.post(
    `${BASE_URL}/users/login`,
    user,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
