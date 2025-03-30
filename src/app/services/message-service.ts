import axios from "axios";
import { Message } from "../interfaces/server/message";

export const sendMessage = ({
  message,
  chatId,
}: {
  message: string;
  chatId: string;
}) => {
  return axios.post(
    "/api/messages/sendMessage",
    { chatId, content: message },
    { withCredentials: true }
  );
};

export const getMessages = ({ chatId }: { chatId: string }) => {
  return axios.post(
    "/api/messages/getMessages",
    { chatId },
    { withCredentials: true }
  );
};
