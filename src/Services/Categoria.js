import http from "../Routes/http-common";
const create = (data) => {
  return http.post("/categorias/create", data);
};
const getAll = () => {
  return http.get("/categorias/get");
};
export default {
  getAll,
  create,
};
