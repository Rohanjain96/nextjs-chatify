import axios from "axios";

export const getChats = () => {
  return axios.get("/api/chats/fetchChats", { withCredentials: true });
};
