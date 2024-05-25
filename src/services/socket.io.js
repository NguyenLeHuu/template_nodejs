// socketManager.js
const initializeSocket = (io) => {
    let loggedInUsers = [];
    io.on("connection", function (socket) {
      // console.log(socket.id);
  
      //login
      socket.on("login", (data) => {
        const user = { account_id: data?.account_id, socket_id: socket.id };
        const foundElement = loggedInUsers.find(
          (element) =>
            element.account_id === user.account_id &&
            element.socket_id === user.socket_id
        );
        if (!foundElement) {
          loggedInUsers.push(user);
        }
        console.log(loggedInUsers);
      });
  
      //chat
      socket.on("client-sent-message", (data) => {
        socket.emit("server-send-data_seft", data);
        for (const value of loggedInUsers) {
          if (
            value.account_id === data.user2 &&
            io.of("/").sockets.has(value.socket_id)
          ) {
            io.to(value.socket_id).emit("server-send-data", data); //gửi tới 1 thằng
            //io.sockets.emit("server-send-data", data); tắt cả socket
            //socket.broadcast.emit("server-send-data", data); tắt cả trừ th gửi
            // io.sockets.emit("server-send-data", data);
          }
        }
      });
  
      //quýet check-in : bên app bảo gửi tới
      socket.on("scan-check-in", (data) => {
        //trong data bắt buộc có booking_id
        //mặc định 1 staff làm công việc check-in có account "staff"
        for (const value of loggedInUsers) {
          if (
            value.account_id === "staff" &&
            io.of("/").sockets.has(value.socket_id)
          ) {
            io.to(value.socket_id).emit("server-scan-check-in", data); //gửi tới màn hình máy tính của staff
  
            //bên phía long: bắt sự kiện -> data.booking_id -> hiện popup để có thể gán bác sĩ, check-in...
          }
        }
      });
  
      //confirm check-in : bên staff long gửi tới
      socket.on("confirm-check-in", (data) => {
        for (const value of loggedInUsers) {
          if (io.of("/").sockets.has(value.socket_id)) {
            //t1: gửi tới khách hàng
            if (value.account_id === data.customer_id) {
              io.to(value.socket_id).emit("server-confirm-check-in", data);
              //bên phía bảo: bắt sự kiện render lại
            } //t2: gửi tới bác sĩ phụ trách
            if (value.account_id === data.veterinarian_id) {
              io.to(value.socket_id).emit("server-confirm-check-in", data);
              //bên phía long( bs phụ trách màn hình chờ khám): bắt sự kiện render lại
            }
          }
        }
      });
  
      socket.on("start-exam", (data) => {
        for (const value of loggedInUsers) {
          if (io.of("/").sockets.has(value.socket_id)) {
            //t1: gửi tới khách hàng
            if (value.account_id === data.customer_id) {
              io.to(value.socket_id).emit("server-start-exam", data);
            }
          }
        }
      });
  
      //lúc tạo phiếu
      socket.on("create-service-form", (data) => {
        for (const value of loggedInUsers) {
          if (io.of("/").sockets.has(value.socket_id)) {
            //t1: gửi tới khách hàng
            if (value.account_id === data.customer_id) {
              io.to(value.socket_id).emit("server-create-service-form", data);
              //bên phía bảo: bắt sự kiện render lại
            }
          }
        }
      });
  
      //thanh toán tiền
      socket.on("complete-payment", (data) => {
        for (const value of loggedInUsers) {
          if (io.of("/").sockets.has(value.socket_id)) {
            //t1: gửi tới khách hàng
            if (value.account_id === data.customer_id) {
              io.to(value.socket_id).emit("server-complete-payment", data);
              //bên phía bảo: bắt sự kiện render lại
            } //t2: gửi tới bác sĩ phụ trách
            if (value.account_id === data.veterinarian_id) {
              io.to(value.socket_id).emit("server-complete-payment", data);
              //bên phía long bắt sự kiện render lại
            } //t3: gửi tới bác sĩ nhỏ
            if (data.vet.includes(value.account_id)) {
              //vet là ds cac veterinarian_id cua bs con cua sf
              io.to(value.socket_id).emit("server-complete-payment", data);
              //bên phía long bắt sự kiện render lại
            }
          }
        }
      });
  
      //theo dõi tiến trình
      socket.on("sfd-status-change", (data) => {
        for (const value of loggedInUsers) {
          if (io.of("/").sockets.has(value.socket_id)) {
            //t1: gửi tới khách hàng
            if (value.account_id === data.customer_id) {
              io.to(value.socket_id).emit("sfd-status-change", data);
              //bên phía bảo: bắt sự kiện render lại
            } //t2: gửi tới bác sĩ phụ trách
            if (value.account_id === data.veterinarian_id) {
              io.to(value.socket_id).emit("sfd-status-change", data);
              //bên phía long bắt sự kiện render lại
            }
          }
        }
      });
  
      // console.log(io.sockets.adapter.rooms);
      socket.on("disconnect", () => {
        socket.disconnect();
        const myArray = loggedInUsers.filter(
          (item) => item.socket_id !== socket.id
        );
        loggedInUsers = myArray;
        console.log("🔥: A user disconnected");
        console.log(loggedInUsers);
      });
    });
  };
  module.exports = initializeSocket;