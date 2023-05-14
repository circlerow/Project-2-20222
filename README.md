# Project-2-20222
Tiến độ nghiên cứu môn học project 2
Đây là chương trình compiler code đơn giản
## Xây dựng chương trình compiler trên local
Sử dụng thư viện mã nguồn mở codemirror-5.65.12 để xây dựng chương trình compiler trên local<br>
[Codemirror](https://codemirror.net/)<br>
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
## Xây dựng hàng đợi 
Xây dựng hàng đợi để xác định thứ tự các lần compile tránh trường hợp nhiều người cùng compile cùng lúc.<br>
Xây dựng hàng đợi bằng thư viện Node Bull dựa trên nền tảng Redis<br>
[Thư viện Bull](https://optimalbits.github.io/bull/)<br>
### Tạo 1 hàng đợi mới<br>
`const myFirstQueue = new Bull('my-first-queue');`<br>
Một hàng đợi thường có 3 vai trò khác nhau : 1 nhà sản xuất công việc,1 người làm việc hoặc/và 1 bộ lắng nghe sự kiện<br>
Producer có thể thêm nhiều công việc vào hàng đợi ngay cả khi không có consumer tại thời điểm đó:Hàng đợi cung cấp giao tiếp không đồng bộ<br>
### Producers<br>
Có thể thêm công việc vào hàng đợi :<br>
```
const myFirstQueue = new Bull('my-first-queue');

const job = await myFirstQueue.add({
  foo: 'bar'
});
```
<br>
Công việc là 1 javascript object và có thể có bất kỳ thuộc tính nào bạn muốn.Oject này cần phải tuần tự hóa, cụ thể hơn là 1 chuỗi JSON,chính là cách lưu trữ trên Redis <br>

### Consumers<br>
Là một chương trình Node định nghĩa 1 hàm tiến trình để xử lí công việc<br>

```
const myFirstQueue = new Bull('my-first-queue');

myFirstQueue.process(async (job) => {
  return doSomething(job.data);
});
```
<br>
Tiến trình sẽ luôn được gọi mỗi khi consumer rảnh rỗi và có công việc cần xử lý trong hàng đợi.
Comsumers sẽ không thường xuyên trực tuyến nên có thể có nhiều công việc đang chờ trong hàng đợi,quy trinhg sẽ thực hiện từng công việc 1 cho đến khi hàng đợi rỗng<br>
Giá trị trả về được lưu trữ trong job object và có thể được truy cập sau này<br>
Đôi khi có thể cung cấp tiến độ công việc bên ngoài tiến trình bằng cách gọi job.progress() trong tiến trình<br>

```
myFirstQueue.process( async (job) => {
  let progress = 0;
  for(i = 0; i < 100; i++){
    await doSomething(job.data);
    progress += 10;
    job.progress(progress);
  }
});
``` 
<br>

### Listeners<br>
Listener có thể lắng nghe cục bộ hoặc toàn cục<br>
Có thể đính kèm 1 trình lắng nghe sự kiện cho 1 hàng đợi<br>
```
const myFirstQueue = new Bull('my-first-queue');

// Define a local completed event
myFirstQueue.on('completed', (job, result) => {
  console.log(`Job completed with result ${result}`);
})
```
### Job Lifecycle<br>
<br>

![Hình ảnh minh họa](./job-lifecycle.jpg)<br>




