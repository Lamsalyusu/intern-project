// test-socket.ts (temporary, not part of your real app)
import { io } from "socket.io-client";

const socket = io("http://localhost:3000/chat", {
  auth: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImE4ZmZlZGZjLWQzYTQtNDA1NS04YWIyLWRiYTFiMDI4ZTA4YSIsImVtYWlsIjoib3duZXIxNzg1ODM1MTI3QHRlc3QuY29tIiwiaWF0IjoxNzg1ODM1MTI4LCJleHAiOjE3ODU5MjE1Mjh9.Y-T_YBVWMKXJ4ZbRKgmYSqt5YNrL5WXm63dgTtllLng"}
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);
  socket.emit("join_task", { task_id: "YOUR_TASK_ID" });
});

socket.on("joined_task", (data) => console.log("Joined:", data));
socket.on("error", (err) => console.log("Error:", err));
socket.on("receive_message", (msg) => console.log("New message:", msg));

setTimeout(() => {
  socket.emit("send_message", { task_id: "YOUR_TASK_ID", body: "hello from test script" });
}, 1000);