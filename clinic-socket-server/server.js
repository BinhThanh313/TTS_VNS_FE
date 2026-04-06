const { Server } = require("socket.io");

const io = new Server(3000, {
  cors: { origin: "*" }, // Cho phép React gọi vào thoải mái
});

// Nơi lưu trữ hàng đợi (RAM)
let queues = {};

io.on("connection", (socket) => {
  console.log("⚡ Giao diện đã kết nối:", socket.id);

  // 1. Khi có người vào phòng (Bác sĩ, Tivi)
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`[${socket.id}] tham gia phòng: ${roomId}`);
    
    // TRỌNG TÂM: Gửi ngay danh sách hiện tại cho người vừa vào!
    if (queues[roomId]) {
      socket.emit("update-queue", queues[roomId]);
    }
  });

  // 2. Lễ tân thêm bệnh nhân
  socket.on("add-patient", ({ roomId, patient }) => {
    if (!queues[roomId]) queues[roomId] = [];
    queues[roomId].push(patient);
    console.log(`Lễ tân cấp số ${patient.stt} cho ${patient.name}`);
    
    // Báo cho tất cả mọi người trong phòng biết
    io.to(roomId).emit("update-queue", queues[roomId]);
  });

  // 3. Bác sĩ gọi số
  socket.on("call-next", (roomId) => {
    if (queues[roomId] && queues[roomId].length > 0) {
      const nextPatient = queues[roomId].shift(); // Rút người đầu tiên ra
      console.log(`[🔊] Đang gọi số ${nextPatient.stt}`);
      
      // Báo Tivi đọc tên
      io.to(roomId).emit("patient-calling", nextPatient);
      // Báo Bác sĩ cập nhật lại danh sách (đã bị trừ đi 1 người)
      io.to(roomId).emit("update-queue", queues[roomId]);
    }
  });
});

console.log("🚀 Server Socket đang chạy tại cổng 3000...");