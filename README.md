# Project-2-20222
Tiến độ nghiên cứu môn học project 2
Đây là chương trình compiler code đơn giản
## Xây dựng chương trình compiler trên local
Sử dụng thư viện mã nguồn mở codemirror-5.65.12 để xây dựng chương trình compiler trên local<br>
[Codemirror](https://codemirror.net/)<br>
Nguồn: [Youtube](https://youtu.be/doS4X0NKnJk)
## Lưu snapshot
Lịch sử các lần compile sẽ được lưu lại tại file temp bằng phương thức endpoint API
## Xây dựng hàng đợi 
Xây dựng hàng đợi để xác định thứ tự các lần compile tránh trường hợp nhiều người cùng compile cùng lúc.<br>
Xây dựng hàng đợi bằng thư viện Node Bull dựa trên nền tảng Redis<br>
[Bull](https://optimalbits.github.io/bull/)
Tạo 1 hàng đợi mới
`const myFirstQueue = new Bull('my-first-queue');`

