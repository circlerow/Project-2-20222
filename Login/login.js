document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Ngăn chặn việc gửi form mặc định

    // Lấy giá trị tên đăng nhập và mật khẩu
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Kiểm tra tên đăng nhập và mật khẩu
    if (username === 'admin' && password === '1') {

        alert('Đăng nhập thành công!');
        window.location.href = window.location.href.replace('/Login/login.html', '/index.html');
        // Thực hiện các hoạt động sau khi đăng nhập thành công
    } else {
        alert('Tên đăng nhập hoặc mật khẩu không chính xác!');
        // Xử lý khi đăng nhập không thành công
    }
});
