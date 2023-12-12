import { API } from "@/common/api";

export async function getDoas(skip) {
  const data = await API.get(`doa/get-doa?skip=${skip}`);
  console.log(data);
  return data.data.data;
}

export async function deleteDoas(id) {
  const data = await API.delete(`doa/delete-doa?id=${id}`);
  return data;
}
