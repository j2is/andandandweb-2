import axios from "axios";

export default async function request(request) {
  if (!request) {
    return { data: undefined, error: "no request" };
  }

  const data = request.data;

  return await axios({
    url: request.url,
    method: request.method || "post",
    data,
    withCredentials: true,
    headers: { Accept: "application/json", "Content-Type": "application/json" }
  })
    .then(d => {
      return { data: d.data, error: undefined };
    })
    .catch(error => {
      return { data: undefined, error };
    });
}
