import { API } from "../api";

export async function getProducts (skip)  {
  const data = await API.get(`/get-products?skip=${skip}`)
  return data;
}

export async function getProduct(id) {
  const data = await API.get(`/products/${id}`)
  return data;
}

export async function addDoa(params) {
  const data = await API.post(`/doa/add-doa`, params)
  return data;
}

export async function editDoa(id,params) {
  const data = await API.put(`/edit-doa?id=${id}`, params)
  return data;
}

export async function deleteProduct(id) {
  const data = await API.delete(`/delete-product?id=${id}`)
  return data;
}