import axios from "axios";
export default async function getRequest(request) {
  try {
    const data = await axios.get(request.url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      auth: {
        username: request.username,
        password: request.password
      }
    });
    return data;
  } catch (error) {
    console.log(error);
    return { data: undefined, error: "N'a pas pu se connecter" };
  }
}
