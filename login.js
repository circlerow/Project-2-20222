// import controller from "./controller.js";


// document.querySelector('form').addEventListener('submit', function (e) {
//     e.preventDefault(); // Ngăn chặn việc gửi form mặc định

//     // Lấy giá trị tên đăng nhập và mật khẩu
//     var username = document.getElementById('username').value;
//     var password = document.getElementById('password').value;

//     const rowCount = controller.logindata(username, password)

//     if (rowCount > 0) {
//         console.log("check:", rowCount)
//         alert('Đăng nhập thành công!');
//         window.open("../index.html", "_parent");
//         // Thực hiện các hoạt động sau khi đăng nhập thành công
//     } else {
//         alert('Tên đăng nhập hoặc mật khẩu không chính xác!');
//         // Xử lý khi đăng nhập không thành công
//     }
// });
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Ngăn chặn việc gửi form mặc định

    // Lấy giá trị tên đăng nhập và mật khẩu
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Kiểm tra tên đăng nhập và mật khẩu
    if (username === 'admin' && password === '1') {

        alert('Đăng nhập thành công!');
        window.open("../index", "_parent");
        // Thực hiện các hoạt động sau khi đăng nhập thành công
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không chính xác!');
        // Xử lý khi đăng nhập không thành công
    }
});