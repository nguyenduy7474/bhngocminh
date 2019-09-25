$(document).ready(function () {
    laytatcasanpham()
})
var danhsachsanpham;
var arraysanphamdacheck = []

function laytatcasanpham(){
    $.ajax({
        type: "POST",
        url: "/laytatcasanpham",
        success: function(data){
            console.log(data)
            var sophantramgiam = 0
            var string = ""
            var giasanpham = 0
            var giakhuyenmai = 0
            danhsachsanpham = data
            string = `<center>
            <table class="table table-striped" style="width: 84%">
              <thead>
                <tr>
                  <th >STT</th>
                  <th >Tên Sản Phẩm</th>
                  <th >Mã Sản Phẩm</th>
                  <th >Giá Sản Phẩm</th>
                  <th >Giá Khuyến Mãi</th>
                  <th >Hình Ảnh</th>
                  <th >Tùy chọn</th>
                </tr>
              </thead>
              <tbody>`
            for(var i=data.length - 1; i>=0; i--){
                sophantramgiam = 100 - data[i].giakhuyenmai*100/data[i].giasanpham
                giasanpham = Comma(data[i].giasanpham)
                giakhuyenmai = Comma(data[i].giakhuyenmai)
                var sothutu = data.length - i

                string += `
                                <tr>
                                  <th scope="row">`+ sothutu +`</th>
                                  <td>`+ data[i].tensanpham +`</td>
                                  <td>`+ data[i].masanpham +`</td>
                                  <td>`+ giasanpham +`</td>
                                  <td>`+ giakhuyenmai +`</td>
                                  `
                                  
                string +=   `<td><img src="`+ data[i].image +`" style="width:80px;height:80px;"></td>`
                string += `<td>
                        <button type="button" class="btn btn-primary" id="editbdata" data-id="`+ data[i]._id +`" data-tensanpham="`+ data[i].tensanpham +`" data-masanpham="`+ data[i].masanpham +`" data-giasanpham="`+ data[i].giasanpham +`" data-giakhuyenmai="`+ data[i].giakhuyenmai +`" data-image="`+ data[i].image +`" data-toggle="modal" data-target="#myModalupdate">Edit</button>
                        <button type="button" class="btn btn-danger" onclick="XoaSanPham('`+ data[i]._id +`')">Delete</button>
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

$(document).on("click", "#editbdata", function () {
    let id = $(this).data('id')
    let tensanpham = $(this).data('tensanpham')
    let masanpham = $(this).data('masanpham')
    let giasanpham = $(this).data('giasanpham')
    let giakhuyenmai = $(this).data('giakhuyenmai')
    let image = $(this).data('image')

    $('#myModalupdate #idsanpham').val(id);
    $('#myModalupdate #tensanpham').val(tensanpham)
    $('#myModalupdate #masanpham').val(masanpham)
    $('#myModalupdate #giasanpham').val(giasanpham)
    $('#myModalupdate #giakhuyenmai').val(giakhuyenmai)
    
    $('#myModalupdate #image').val(image)
})

function SuaSanPham(){
    let data = {
        id: $('#myModalupdate #idsanpham').val(),
        tensanpham: $('#myModalupdate #tensanpham').val().trim(),
        masanpham: $('#myModalupdate #masanpham').val().trim(),
        giasanpham: $('#myModalupdate #giasanpham').val().trim(),
        giakhuyenmai: $('#myModalupdate #giakhuyenmai').val().trim(),
        image: $('#myModalupdate #image').val().trim(),
    }
    $.ajax({
        url:'/suasanpham',
        method:'post',
        async:false,
        data: data,
        success: function(data){
            console.log(data)
            if(data == "success"){
                swal({
                    title: "Cập nhật thành công",
                    text: "Nội dung này đã được lưu lại",
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

function XoaSanPham(idsanpham){
    swal({
        title: 'Bạn muốn xóa ?',
        text: "Mọi thông tin sẽ biến mất",
        type: 'warning',
        buttons : {
              cancel: {
                text: "Cancel",
                value: null,
                visible: true,
                className: "",
                closeModal: true,
              },
              confirm: {
                text: "OK",
                value: true,
                visible: true,
                className: "",
                closeModal: true
              }
            }
    }).then((result) => {
        if(result){
            $.ajax({
                url:'/xoasanpham',
                method:'post',
                data: {id: idsanpham},
                success: function(data){
                    if(data == "success"){
                        swal({
                            title: "Cập nhật thành công",
                            text: "Nội dung này đã được lưu lại",
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
    })
}

function Xoaupdatemodal(){
    $('#myModalupdate #idsanpham').val("");
    $('#myModalupdate #tensanpham').val("");
    $('#myModalupdate #masanpham').val("");
    $('#myModalupdate #giasanpham').val("");
    $('#myModalupdate #giakhuyenmai').val("");
    
    $('#myModalupdate #image').val("");
}

function showhinhanh() {
    console.log($("#image"))
    var src = $("#image")[0].value
    $("#anhdemo").prop("src", src)
    $("#anhdemo").show()
}

function magiamgia(){
    $.ajax({
        url:'/danhsachmagiamgia',
        method:'post',
        success: function(data){
            string = `<center>
            <table class="table table-striped" style="width: 100%">
              <thead>
                <tr>
                  <th >STT</th>
                  <th >Mã Giảm Giá</th>
                  <th >Số tiền giảm</th>
                  <th >Tùy chọn</th>
                </tr>
              </thead>
              <tbody>`
            for(var i=0; i< data.length; i++){
                var sothutu = parseInt(i) + 1
                string += `
                                <tr>
                                  <th scope="row">`+ sothutu +`</th>
                                  <td>`+ data[i].magiamgia +`</td>
                                  <td>`+ data[i].sotiengiam +`</td>
                                  `           
                string += `<td>
                        <button type="button" class="btn btn-danger" onclick="XoaMaGiamGia('`+ data[i]._id +`')">Xóa</button>
                           </td>`
   
            }
            string += `</tr>
                              </tbody>
                            </table>
                            </center>`
            $("#danhsachmagiamgia").html(string)
        }
    })
}

function taomagiamgia(){
    $.ajax({
        url:'/taomagiamgia',
        method:'post',
        data: {magiamgia: $("#magiamgia").val(), sotiengiam: $("#sotiengiam").val()},
        success: function(data){
            if(data == "success"){
                swal({
                    title: "Cập nhật thành công",
                    text: "Nội dung này đã được lưu lại",
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

function XoaMaGiamGia(idmagiamgia) {
    $.ajax({
        url:'/xoamagiamgia',
        method:'post',
        data: {idmagiamgia: idmagiamgia},
        success: function(data){
            if(data == "success"){
                swal({
                    title: "Cập nhật thành công",
                    text: "Nội dung này đã được lưu lại",
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

function donggia() {
    var checkcheck = 0
    string = `<center>
    <table class="table table-striped" style="width: 100%">
      <thead>
        <tr>
          <th >Chọn</th>
          <th >Tên Sản Phẩm</th>
          <th >Mã Sản Phẩm</th>
          <th >Giá Sản Phẩm</th>
          <th >Giá Khuyến Mãi</th>
        </tr>
      </thead>
      <tbody>`
    for(var i=0; i<danhsachsanpham.length; i++){
        if(danhsachsanpham[i].donggia != 0){
            arraysanphamdacheck.push(danhsachsanpham[i]._id)
            if(checkcheck == 0){
                $("#apdung").prop('checked', true);
                $("#tiendonggia").val(danhsachsanpham[i].donggia)
                checkcheck = 1
            }
            string+= `<tr>
                    <td><input type="checkbox" class="checksanpham" value="`+ danhsachsanpham[i]._id +`" checked></td>`
        }else{
            if(checkcheck == 0){
                $("#apdung").prop('checked', false);
            }
            string+= `<tr>
                    <td><input type="checkbox" class="checksanpham" value="`+ danhsachsanpham[i]._id +`"></td>`
        }
        giasanpham = Comma(danhsachsanpham[i].giasanpham)
        giakhuyenmai = Comma(danhsachsanpham[i].giakhuyenmai)
        string += `
                          <td>`+ danhsachsanpham[i].tensanpham +`</td>
                          <td>`+ danhsachsanpham[i].masanpham +`</td>
                          <td>`+ giasanpham +`</td>
                          <td>`+ giakhuyenmai +`</td>
                          `
    }
    string += `</tr>
                      </tbody>
                    </table>
                    </center>`

    $("#danhsachdonggia").html(string)
}

function Apdungdonggia() {
    if($("#apdung:checkbox:checked").length > 0){
        var arraysanpham = []
        var checked = $(".checksanpham:checkbox:checked")
        if(checked.length == 0){
            swal({
                title: "Phát sinh lỗi",
                text: "Phải chọn ít nhật một sản phẩm cho chiến dịch",
                type: "error",
                showConfirmButton: false,    
                timer: 3000
            }).then((result)=>{
                // cho vào để ko báo lỗi uncaught
            })
            .catch(timer => {
                // cho vào để ko báo lỗi uncaught
            });
            return
        }
        for(var i=0; i<checked.length; i++){
            arraysanpham.push(checked[i].value)
        }
        let data = {
            donggia: $("#tiendonggia").val(),
            arraysanpham: arraysanpham,
            arraysanphamdacheck: arraysanphamdacheck
        }
        
        $.ajax({
            url:'/apdungdonggia',
            method:'POST',
            data: data,
            success: function(data){
                if(data == "success"){
                    swal({
                        title: "Cập nhật thành công",
                        text: "Nội dung này đã được lưu lại",
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
    }else{
        $.ajax({
            url:'/xoaapdungdonggia',
            method:'POST',
            success: function(data){
                if(data == "success"){
                    swal({
                        title: "Cập nhật thành công",
                        text: "Nội dung này đã được lưu lại",
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
}