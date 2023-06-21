# Mark Exam Web
Tiến độ nghiên cứu môn học project 2
Đây là web phục vụ chấm điểm bài tập lập trình của sinh viên
## Xây dựng chương trình compiler trên local
Sử dụng thư viện mã nguồn mở codemirror-5.65.12 để xây dựng chương trình compiler trên local<br>
[Codemirror](https://codemirror.net/)<br>
Client sẽ nhận dữ liệu được nhập vào từ người dùng qua phần editor và gửi lên sever dưới dạng chuỗi JSON để xử lý theo phương thức POST<br>
Sau khi nhận được dữ liệu từ client,sever sẽ xử lý dữ liệu bằng thư viện Codemirror và trả về kết quả cho client<br>
Nguồn: [Youtube](https://youtu.be/doS4X0NKnJk)
## Lưu snapshot
Lịch sử các lần compile sẽ được lưu lại tại file temp bằng phương thức endpoint API và xóa các file đã compile trước đó nếu cần thiết<br>

```
app.get("/",function (req,res){ //app.get dùng để lấy dữ liệu từ form
    compiler.flush(function () { //compiler.flush dùng để xóa các file đã compile
        console.log("deleted") //in ra màn hình console
    })
    res.sendFile("G:/Web Project/Simple-Compiler/index.html")//res.sendFile dùng để gửi file index.html
})
```
Hàm flush sẽ được sửa lại
```
exports.flush = function (fn) {
	path = './temp/';
	fs.readdir(path, function (err, files) {
		if (!err) {
			for (var i = 0; i < files.length; i++) {

				fs.unlinkSync(path + files[i]);

			}
		}
	});
	fn();
}
```
## Tìm hiểu về Redis<br>
### Cài đặt Redis
Cài đặt redis từ [trang chủ](https://github.com/MicrosoftArchive/redis/releases).
Huớng dẫn cài đặt chi tiết tại [đây](https://stackjava.com/redis/huong-dan-cai-dat-redis-server-tren-windows.html).<br>
Hệ thống được sử dựng thông qua cổng: 127.0.0.1:6379<br>
#### Sử dụng redis trong Nodejs thông qua thư viện [node-redis](https://github.com/redis/node-redis#installation)
##### Cài đặt
`npm install redis`<br>
##### Cách sử dụng

### Sử dụng docker để cài đặt redis 
Hướng dẫn cách sử dụng tại [đây](https://topdev.vn/blog/cai-dat-redis-su-dung-docker/).<br>
Sử dụng Docker Desktop và RedisInsight

## Bắt đầu xây dựng chương trình với các chức năng
#### Tạo trang đăng nhập
Tạo giao diện đăng nhập,2 trường nhập là username và password<br>
Phân luồng đăng nhập khác nhau giữa admin và user<br>
Khi đăng nhập với tài khoản Admin sẽ được chuyển đến trang admin.Còn khi đăng nhập với tài khoản người dùng sẽ chuyển đến giao diện làm bài tập<br>
Sau đó với quyền truy cập khác nhau sẽ có các chức năng riêng<br>
Phía dưới giao diện đăng nhập sẽ có nút chuyển sang giao diện đăng ký.Ở trang đăng kí người dùng có quyền tạo thêm tài khoản người dùng khác để truy cập vào hệ thống<br>
Dữ liệu này sẽ được cập nhật vào DB để phục vụ các lần truy cập sau<br>

#### Giao diện Admin
Giao diện admin sẽ có các chức năng sau:<br>
- Xem danh sách sinh viên<br>
- Chỉnh sửa bài tập:<br>
    Ở đây admin có quyền xem danh sách bài tập và chọn bài tập để chỉnh sửa thông tin bài tập đó.Sau đó dữ liệu bài tập sẽ được cập nhật vào DB và sau đó sẽ phục vụ cho các lần truy cập sau<br>
- Thêm bài tập:<br>
    Ở đây admin có quyền thêm bài tập mới vào hệ thống.Sẽ bao gồm các trường thông tin như tiêu đề,nội dung bài tập,độ khó,thời gian giới hạn,input và output bài tập.Dữ liêu này sẽ cập nhật lên cơ sở dữ liệu và xuất hiện trong danh sách bài tập sau này<br>
-Bao gồm button logout để quay lại trang đăng nhập<br>

#### Giao diện sinh viên
Khi truy cập vào giao diện sinh viên sẽ hiện ra danh sách bài tập mà sinh viên đó có thể làm<br>
Mỗi bài tập sẽ có nút làm bài.Khi nhấn vào sẽ chuyển đến giao diện làm bài tương ứng với bài tập đó<br>
Ở giao diện làm bài sẽ có các trường thông tin như tiêu đề,nội dung bài tập,độ khó,thời gian giới hạn,input và output mẫu<br>
Sinh viên sẽ chọn mục ngôn ngữ sử dụng.Sau đó nhập bài giải vào mục input và nhấn nút submit để nộp bài<br>
Sau đó dữ liệu sẽ được gửi lên server để biên dịch và chạy chương trình.Sau đó trả về kết quả và so sánh với output kì vọng<br>
Kết quả sẽ có 3 trường hợp:<br>
- Kết quả đúng<br>
- Kết quả sai<br>
- Kết quả chạy quá thời gian<br>
Sau đó sẽ có nút trở về danh sách bài tập để sinh viên có thể chọn bài tập khác để làm<br>
#### Thêm dữ liệu vào DB
Sử dụng createPool của mysql2/promise để thêm dữ liệu vào DB<br>
Sau đó bắt 2 luồng dữ liệu vào DB<br>
Luồng thứ nhất là input,lấy từ request của client<br>
Luồng thứ 2 là output,lấy từ dữ liệu sau khi biên dịch<br>




## Demo chương trình
### Login,Singup
##### Login
![image](demo/login.png)<br>
##### Signup
![image](demo/signup.png)<br>
### Admin
##### Giao diện Admin
![image](demo/admin.png)<br>
##### Sửa đổi bài tập
![image](demo/update-exercise.png)<br>
##### Danh sách sinh viên
![image](demo/list-user.png)<br>
##### Sửa đổi chi tiết bài tập
![image](demo/update-exsercise-detail.png)<br>
##### Thêm bài tập
![image](demo/create-exercise.png)<br>
### User
##### Trình biên dịch bài tập
![image](demo/compiler.png)<br>
##### Danh sách bài tập
![image](demo/list-exercise.png)<br>
##### Chấm điểm bài tập đúng
![image](demo/mark-exercise.png)<br>
##### Nộp bài tập
![image](demo/solve-exercise.png)<br>
##### Kết quả bài tập sai
![image](demo/wrong.png)<br>
##### Kết quả bài tập quá thời gian
![image](demo/timelimit.png)<br>
