import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const handleSend = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user?.firstName,
      lastName: user?.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  const fetchChatMessages = async () => {
    try {
      const response = await fetch(BASE_URL + "/chats/" + targetUserId, {
        credentials: "include",
      });
      const { data = null, error = null } = await response.json();
      if (data) {
        console.log(data);

        const sanatizedMessages = data?.messages?.map((message) => ({
          _id: message._id,
          firstName: message?.sender?.firstName,
          lastName: message?.sender?.lastName,
          text: message?.text,
          senderId: message?.sender?._id,
        }));
        console.log(sanatizedMessages);

        setMessages(sanatizedMessages || []);
      } else if (!response.ok || error) {
        throw new Error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!user) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      userId,
      targetUserId,
    });
    socket.on("receiveMessage", ({ firstName, lastName, text }) => {
      setMessages((messages) => [
        ...messages,
        { _id: userId, firstName, lastName, text },
      ]);
    });
    return () => socket.disconnect();
  }, [userId, targetUserId]);

  return (
    <div className="w-3/4 mx-auto border border-gray-500 mt-5 h-[70vh] flex flex-col">
      <div className="p-5 flex-1 overflow-y-scroll">
        {/* display messages */}
        {messages?.map((message) => {
          const {
            firstName = "",
            lastName = "",
            _id,
            text,
            senderId,
          } = message;

          return (
            <div
              key={_id}
              className={`chat ${
                senderId === userId ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-header">
                {firstName + " " + lastName}
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">{text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}
        {/* <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
              />
            </div>
          </div>
          <div className="chat-header">
            Anakin
            <time className="text-xs opacity-50">12:46</time>
          </div>
          <div className="chat-bubble">I hate you!</div>
          <div className="chat-footer opacity-50">Seen at 12:46</div>
        </div> */}
      </div>
      <div className="p-5 border-t border-gray-600 flex gap-2">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-full"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
