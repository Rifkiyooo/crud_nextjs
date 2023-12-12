import { API } from "@/common/api";
import { Router } from "next/router";

export async function getUsers(skip) {
  const data = await API.get(`users/get-user?skip=${skip}`);
  console.log(data.data);
  return data.data.data;
}

export async function deleteUsers(id) {
  const data = await API.delete(`/delete-product?id=${id}`);
  return data.data.data;
}

export async function getDoa(skip) {
  const data = await API.get(`doa/get-doa?skip=${skip}`);
  console.log(data.data);
  return data.data.data;
}

export async function addDoa(params) {
  const response = await API.post(`doa/add-doa`, params);
  if (response.status >= 200 && response.status < 300) {
    console.log(response.data);
    return response.data.data;
    Router.reload();
  } else {
    console.error("Error:", response);
    throw new Error(`Request failed with status code ${response.status}`);
  }
}

export async function editDoa(id, params) {
  const response = await API.post(`doa/edit-doa/${id}`, params);
  if (response.status >= 200 && response.status < 300) {
    console.log(response.data);
    return response.data.data;
  } else {
    console.error("Error:", response);
    throw new Error(`Request failed with status code ${response.status}`);
  }
}
