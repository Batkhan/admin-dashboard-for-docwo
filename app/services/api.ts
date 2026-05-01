import type { User, UsersResponse } from "../types/user";

const BASE_URL = "https://dummyjson.com";

export async function getUsers(limit: number, skip: number, search: string = ""): Promise<UsersResponse> {
  const url = search
    ? `${BASE_URL}/users/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`
    : `${BASE_URL}/users?limit=${limit}&skip=${skip}`;
    
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export async function getUserById(id: string): Promise<User> {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }
  return response.json();
}
