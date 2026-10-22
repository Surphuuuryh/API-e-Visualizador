console.log("Unholy");
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4343",
  headers: {
    "Content-Type": "application/json",
  },
});

const idInput = document.querySelector("#input01") as HTMLInputElement;
const nameInput = document.querySelector("#input02") as HTMLInputElement;

const getButton = document.querySelector("#button01") as HTMLButtonElement;
const putButton = document.querySelector("#button02") as HTMLButtonElement;
const patchButton = document.querySelector("#button03") as HTMLButtonElement;
const deleteButton = document.querySelector("#button04") as HTMLButtonElement;

const ulElement = document.querySelector("#ul01") as HTMLUListElement;

let id = idInput.value;
let name = nameInput.value;

getButton.addEventListener("click", async (event) => {
  event.preventDefault();
  console.log("Holy");
  try {
    const response =
      await api.get<{ id: number; name: string }[]>("/api/users");
    let responsed = response.data;
    console.log(responsed);
    ulElement.innerHTML = "";
    responsed.forEach((user) => {
      let texto = "Id: " + user.id.toString() + " / Name: " + user.name;
      let liElement = document.createElement("li");
      liElement.textContent = texto;
      ulElement.append(liElement);
    });
  } catch (error) {
    console.log("Error fetching users:", error);
  }
});

putButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const currentName = nameInput.value;

  try {
    const response = await api.put(`/api/users?name=${currentName}`);
    console.log("Put Response:", response.data);
  } catch (error) {
    console.log("Error fetching users:", error);
  }
});

patchButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const currentId = idInput.value;
  const currentName = nameInput.value;

  try {
    const response = await api.patch(
      `/api/users?id=${currentId}&newName=${currentName}`,
    );
    console.log("Patch Response:", response.data);
  } catch (error) {
    console.log("Error fetching users:", error);
  }
});

deleteButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const currentId = idInput.value;

  try {
    const response = await api.delete(`/api/users?id=${currentId}`);
    console.log("Delete Response:", response.data);
  } catch (error) {
    console.log("Error fetching users:", error);
  }
});
