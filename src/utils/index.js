function setStatus(data) {
    if (Array.isArray(data)) {
      //kiểm tra data là obj hay array
      data.forEach((obj) => {
        obj.status = obj.status.readInt8();
      });
    } else {
      data.status = data.status.readInt8();
    }
  }
  
function getCurDay() {
    const ngayHienTai = new Date();
    const ngay = ngayHienTai.getDate();
    const thang = ngayHienTai.getMonth() + 1; // Lưu ý rằng tháng bắt đầu từ 0
    const nam = ngayHienTai.getFullYear();
  
    // Định dạng chuỗi ngày tháng năm
    const ngayThangNam = `${nam}-${thang}-${ngay}`;
    return ngayThangNam;
  }

function Response(res,status, message, data) {
    return res.status(status).json({
      status: status,
      message:message,
      data: data,
    });
  }
  
  module.exports = {
    setStatus,
    getCurDay,
    Response
  };