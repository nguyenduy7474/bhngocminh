$(document).ready(function () {
    khachhang()
})


function khachhang(){
    $.ajax({
        type: "POST",
        url: "/tatcadonhang",
        success: function(data){
            console.log(data)
            string = `<center>
            <table class="table table-striped" style="width: 100%">
              <thead>
                <tr>
                  <th width="12%">Tên Khách Hàng</th>
                  <th width="10%">Số Điện Thoại</th>
                  <th width="15%">Địa Chỉ</th>
                  <th width="10%">Ghi Chú</th>
                  <th width="16%">Đơn Hàng</th>
                  <th >Tổng</th>
                  <th >Ngày đặt hàng</th>
                  <th >Trạng Thái</th>
                  <th >Tùy chọn</th>
                </tr>
              </thead>
              <tbody>`

            for(var i=data.length - 1; i>=0; i--){
                var sothutu = data.length - i
                var cacsanpham = data[i].cacsanpham
                var tong = 0
                string += `
                                <tr>
                                  <td>`+ data[i].hoten +`</td>
                                  <td>`+ data[i].sodienthoai +`</td>
                                  <td>`+ data[i].diachi +`</td>
                                  <td>`+ data[i].ghichu +`</td>
                                  <td>
                                  `
                for(var j=0; j< cacsanpham.length; j++){
                    tong += cacsanpham[j].soluong * cacsanpham[j].giakhuyenmai
                    string += cacsanpham[j].masanpham + "-" + cacsanpham[j].tensanpham  + " x " + cacsanpham[j].soluong + "</br>"
                }
                tong = tong + parseInt(data[i].shipfee)
                
                data[i].tongtiensaugiamgia = parseInt(tong) - parseInt(data[i].sotiengiam)
                string += `</td>`
                if(data[i].magiamgia){
                  string += `<td><del>`+ Comma(tong) +`đ</del></br>` +
                              data[i].magiamgia + `-` + Comma(data[i].tongtiensaugiamgia) +
                            `</td>`
                }else{
                  string += `<td>`+ Comma(tong) +`đ</td>`
                }
                
                string += `<td>`+ data[i].ngaydathang +`</td>`

                if(data[i].tinhtrangdonhang == 0){
                    string += `<td>Đang xử lý</td>`
                }else{
                    string += `<td>Xử lý xong</td>`
                }
                string += `<td>
                        <button type="button" class="btn btn-success" onclick="xulyxong('`+ data[i]._id +`')">Xử lý xong</button>
                        </br></br><button type="button" class="btn btn-primary" onclick="inhoadon('`+ data[i]._id +`')">In Hóa Đơn</button>
                           </td>`
                                

                
            }
            string += `</tr>
                              </tbody>
                            </table>
                            </center>`
            $(".main").html(string)
        }
    })
}

function Comma(number) {
    number = '' + number;
    if (number.length > 3) {
        var mod = number.length % 3;
        var output = (mod > 0 ? (number.substring(0,mod)) : '');

        for (i=0 ; i < Math.floor(number.length / 3); i++) {
            if ((mod == 0) && (i == 0))
                output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
            else
                output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return (output);
    }
    else return number;
}

function xulyxong(iddonhang){
    $.ajax({
        type: "POST",
        url: "/xulyxong",
        data: {iddonhang: iddonhang},
        success: function(data){
            if(data == "success"){
                swal({
                    title: "Thành Công",
                    text: "Đã thay đổi trạng thái đơn hàng",
                    type: "info",
                    showConfirmButton: false,
                    timer: 3000
                }).then((result)=>{
                    location.reload();

                })
                .catch(timer => {
                    location.reload();
                }); 
                
            }else{
                swal({
                    title: "Phát sinh lỗi",
                    text: "Title đã được sử dụng",
                    type: "error",
                    showConfirmButton: false,    
                    timer: 3000
                }).then((result)=>{
                    // cho vào để ko báo lỗi uncaught
                })
                .catch(timer => {
                    // cho vào để ko báo lỗi uncaught
                }); 
                
            }
        }
    })
}

function inhoadon(iddonhang){
      $.ajax({
        type: "POST",
        url: "/laymotdonhang",
        data: {iddonhang: iddonhang},
        success: function(data){
            console.log(data)
            if(data){
              printDiv(data)
            }else{
                swal({
                    title: "Phát sinh lỗi",
                    text: "Title đã được sử dụng",
                    type: "error",
                    showConfirmButton: false,    
                    timer: 3000
                }).then((result)=>{
                    // cho vào để ko báo lỗi uncaught
                })
                .catch(timer => {
                    // cho vào để ko báo lỗi uncaught
                }); 
                
            }
        }
    })
}

function printDiv(data) {
    var string = `<h3>B&aacute;ch H&oacute;a Ngọc Minh</h3>
<h3>Địa Chỉ: 46/15 Cư X&aacute; Lữ Gia P15 Q11 Tp.Hcm .</h3>
<h3>Số Điện Thoại: 0971806636</h3>
<center>
<h2>H&oacute;a Đơn</h2>
</center>
<h3>Họ t&ecirc;n:&nbsp;`+ data.hoten +`</h3>
<h3>Địa Chỉ:&nbsp;`+ data.diachi +`</h3>
<h3>Số điện thoại:&nbsp;`+ data.sodienthoai +`</h3>
<table style="width: 576px;" border="1" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td >T&ecirc;n sản phẩm&nbsp; &nbsp; &nbsp;</td>
<td >&nbsp;Số lượng</td>
<td >&nbsp;Đơn gi&aacute;</td>
<td >&nbsp;Th&agrave;nh tiền&nbsp;</td>
</tr>`
    var tong = 0
    for(var i=0; i< data.cacsanpham.length; i++){
        tong += data.cacsanpham[i].giakhuyenmai * data.cacsanpham[i].soluong
        string += `<tr>
            <td >&nbsp;`+ data.cacsanpham[i].tensanpham +`</td>
            <td >&nbsp;`+ data.cacsanpham[i].soluong +`</td>
            <td >&nbsp;`+ data.cacsanpham[i].giakhuyenmai +`</td>
            <td >&nbsp;`+ data.cacsanpham[i].giakhuyenmai * data.cacsanpham[i].soluong +`</td>
            </tr>`
    }
        tong = parseInt(tong) + parseInt(data.shipfee)
        string += `<tr></tr>`
        string += `<tr>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;Phí Ship</td>
        <td >&nbsp;`+ data.shipfee +`</td>
        </tr>`
        if(data.magiamgia){
            tong = parseInt(tong) - parseInt(data.sotiengiam)
            string += `<tr>
                <td >&nbsp;</td>
                <td >&nbsp;</td>
                <td >&nbsp;Mã giảm giá</td>
                <td >&nbsp;`+ data.magiamgia + `-` + data.sotiengiam +`</td>
                </tr>`
                    string += `<tr>
            <td >&nbsp;</td>
            <td >&nbsp;</td>
            <td >&nbsp;Tổng</td>
            <td >&nbsp;`+ tong +`</td>
            </tr>`
        }else{
            string += `<tr>
            <td >&nbsp;</td>
            <td >&nbsp;</td>
            <td >&nbsp;Tổng</td>
            <td >&nbsp;`+ tong +`</td>
            </tr>`
        }
string += `</tbody></table>`
    window.frames["print_frame"].document.title = document.title;
    window.frames["print_frame"].document.body.innerHTML = string;
    window.frames["print_frame"].window.focus();
    window.frames["print_frame"].window.print();
}