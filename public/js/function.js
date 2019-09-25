var sanphamdachon = []
var danhsachsanpham = []



$(document).ready(function () {

    $("#btn-close").click(function(){
        $(".widget_shopping_cart").css({
            "width": "0"
        })
        $(".wrapper").css({
            "filter": "blur(0)"
        });
    });
    $(".btn-cart-item-header").click(function(){
        $(".widget_shopping_cart").css({
            "width": "400px"
        })
        $(".wrapper").css({
            "filter": "blur(3px)"
        });
        
    });

    laytatcasanpham()

    $("#btn-close").click(function () {
        $(".widget_shopping_cart").css({
            "width": "0"
        })
        $(".wrapper").css({
            "filter": "blur(0)"
        });
    });

    $(".btn-cart-item-header").click(function () {
        opensidebar();
        addDataIcon();
    });
    $(document).on('click', '.btn-remove-cart-item', function () {
        var masp = $(this).attr("data-product-id");
        $('.cart-item').each(function (i) {
            if (masp == $(this).attr('data-product-id')) {
                xoagiohang(masp);
                $(this).remove();
                
            }
            addCartTotal();
            addDataIcon();
        });
    })

})

function themsanpham(msp){
    var spvuachon
    danhsachsanpham.forEach((values) => {
        if(values.masanpham == msp){
            spvuachon = values
        }
    })
    $("#cart-list").empty();
    var ketqua = themvaogiohang(spvuachon);
    sanphamdachon.forEach(function (values, key, giohang) {
        $("#cart-list").append(
            '<li data-product-id="' + values.masanpham + '" class="cart-item p-0 m-0 position-relative" style="height: 100px"> ' +
            '   <button data-product-id="' + values.masanpham + '" class="btn-remove btn-remove-cart-item position-absolute">X</button>' +
            '   <div class="cart-item-thumnail position-absolute">' +
            '       <img class="ml-1" src="' + values.image + '" alt="">' +
            '    </div>' +
            '   <div class="cart-item-title">' +
            '       <a href="#">' + values.tensanpham + '</a>' +
            '   </div>' +
            '   <div class="quantity" style="padding-left: 35%"> ' +
            '   <button class="btn btn-success btn-number" onclick="giamsoluong(\''+ values.masanpham +'\')">-</button>' +
            '   <input type="text" id="quantity-item-'+ values.masanpham +'" class="quantity-item" min="1" max="9999" name="quantity" value="'+values.soluong+'" title="SL" size="4" inputmode="numeric" onchange="soluongmathang(\''+ values.masanpham +'\')">' +
            '     <button class="btn btn-success btn-number" onclick="tangsoluong(\''+ values.masanpham +'\')">+</button>' +
            '       <span class="Price-amount-item">' + Comma(values.giakhuyenmai) + '</span>' +
            '       <span class="Price-currencySymbol-item">₫</span>' +
            '   </div>' +
            '</li>'
        )
    })  
    opensidebar();
}

function laytatcasanpham(){
    $.ajax({
        type: "POST",
        url: "/laytatcasanpham",
        success: function(data){
            var sophantramgiam = 0
            var string = ""
            var giasanpham = 0
            var giakhuyenmai = 0
            danhsachsanpham = data
            for(var i=0; i<data.length; i++){
                sophantramgiam = 100 - data[i].giakhuyenmai*100/data[i].giasanpham
                giasanpham = Comma(data[i].giasanpham)
                if(data[i].donggia != 0){
                    giakhuyenmai = Comma(data[i].donggia)
                    data[i].giakhuyenmai = data[i].donggia
                }else{
                    giakhuyenmai = Comma(data[i].giakhuyenmai)
                }   
                
                string += `<div class="col-6 col-md-3 col-lg-3" onclick="themsanpham('`+ data[i].masanpham +`')">
                            <div class="col-inner">
                                <div class="badge-container">
                                    <div class="badge-square">
                                        <div class="badge-inner secondary on-sale"><span
                                                class="onsale">-`+ sophantramgiam +`%</span></div>
                                    </div>
                                </div>
                                <div class="product-small">
                                    <div>
                                        <img src="`+ data[i].image + `" width="200" height="250"
                                            alt="">
                                    </div>
                                    <div class="box-text text-center">
                                        <div class="title-wrapper">
                                            <p class="product-title">`+ data[i].tensanpham +`</p>
                                        </div>
                                        <div class="price-wrapper"> <span class="price"><del><span
                                                        class="woocommerce-Price-amount">`+ giasanpham +`<span
                                                            class="woocommerce-Price-currencySymbol">₫</span></span></del>
                                                <ins class="text-decoration-none"><span
                                                        class="woocommerce-Price-amount">`+ giakhuyenmai +`<span
                                                            class="woocommerce-Price-currencySymbol">₫</span></span></ins></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>` 
                
            }
            $("#listsanpham").html(string)
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

function themvaogiohang(sanpham) {
    var kiemtra = true;
    var kiemtrathemthanhcong = false;

    sanphamdachon.forEach(function (values) {
        if (sanpham.masanpham == values.masanpham) {
            values.soluong++;
            kiemtra = false;
            kiemtrathemthanhcong = true;
        }
    })
    if (kiemtra) {
        sanpham.soluong = 1
        sanphamdachon.push(sanpham)
        kiemtrathemthanhcong = true;
    }
    var ketqua;
    sanphamdachon.forEach(function (values) {
        if (sanpham.masanpham == values.masanpham) {
            ketqua = values;
        }
    })
    if (kiemtrathemthanhcong) {
         return ketqua;
         }
    else return null;
}
function xoagiohang(masp) {
    sanphamdachon.forEach(function (values, key, giohang) {
        if (masp == values.masanpham) {
            sanphamdachon.splice(key, 1);
        }
    })
}
function tongtien() {
    var tongtien = 0;
    sanphamdachon.forEach(function (values) {
        tongtien += values.giakhuyenmai * values.soluong;
    })

    return tongtien;
}
function addCartTotal(sotiengiam, magiamgia) {  
        
        if(sotiengiam){

            var tongtiensaugiam = tongtien() - parseInt(sotiengiam)
            $('.Price-amount').each(function(){
                $(this).html("<del>" + Comma(tongtien()) + "</del>  " + Comma(tongtiensaugiam) + "đ");
            })
            $("#magiamgiasave").val(magiamgia)
            $("#tongtiensaugiamgia").val(tongtiensaugiam)  
        }else{
            $('.Price-amount').each(function(){
                $(this).html(Comma(tongtien()) + "đ");
            })

        }

}
function addDataIcon(){
    $(".fa-shopping-cart").attr("data-cart-icon",parseInt(sanphamdachon.length))
}
function opensidebar(){  
            $(".widget_shopping_cart").css({
                "width": "400px"
            })
            $(".wrapper").css({
                "filter": "blur(3px)"
            });
            addCartTotal();
            addDataIcon();
}

$(document).keyup(function(e) {
    if (e.key === "Escape") {
        $(".widget_shopping_cart").css({
            "width": "0"
        })
        $(".wrapper").css({
            "filter": "blur(0)"
        });
    }
});

function soluongmathang(msp){
    var id = "#quantity-item-" + msp
    var soluong = $(id)[0].value
    for(var i=0; i<sanphamdachon.length; i++){
        if(sanphamdachon[i].masanpham == msp){
            sanphamdachon[i].soluong = soluong
        }
    }
    addCartTotal()
}

function tangsoluong(msp){
    var id = "#quantity-item-" + msp
    var soluong = $(id)[0].value
    $(id)[0].value = parseInt(soluong) + 1
    soluongmathang(msp)
}

function giamsoluong(msp){
    var id = "#quantity-item-" + msp
    var soluong = $(id)[0].value
    if(soluong > 1){
        $(id)[0].value = parseInt(soluong) - 1
    }
    soluongmathang(msp)
}

function DatHang(){
    var check = 0
    if(!$("#hoten").val()){
        check = 1
        $("#yeucauhoten").html(" Bạn hãy nhập họ tên")
    }

    if(!$("#sdt").val()){
        check = 1
        $("#yeucausdt").html(" Bạn hãy nhập số điện thoại")
    }

    if(!$("#diachi").val()){
        check = 1
        $("#yeucaudiachi").html(" Bạn hãy nhập địa chỉ")
    }

    if(!$("#email").val()){
        check = 1
        $("#yeucauemail").html(" Bạn hãy nhập email")
    }


    if(check == 0){
        let data = {
            hoten: $('#ThanhToan #hoten').val().trim(),
            sdt: $('#ThanhToan #sdt').val().trim(),
            diachi: $('#ThanhToan #diachi').val().trim(),
            email: $('#ThanhToan #email').val().trim(),
            ghichu: $('#ThanhToan #ghichu').val().trim(),
            cacsanpham: sanphamdachon,
            magiamgia: $('#magiamgiasave').val().trim(),
            tongtiensaugiamgia: $("#tongtiensaugiamgia").val().trim()
        }

        $.ajax({
            type: "POST",
            url: "/dathang",
            data: data,
            success: function(data){

                if(data == "success"){
                    swal({
                        title: "Đặt Hàng Thành Công",
                        text: "Chúng tôi đã nhận đơn hàng của bạn, bạn check mail nhé",
                        type: "info",
                        showConfirmButton: false,
                        timer: 10000
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

function thanhtoan(){
    if(sanphamdachon.length != 0){
        $('#ThanhToan').modal('toggle');
    }else{
        swal({
            title: "Giỏ hàng trống",
            text: "Bạn chưa chọn sản phẩm",
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

function Apdungmagiamgia() {
    console.log($("#magiamgia").val())
    $.ajax({
        method:'POST',
        url:'/apdungmagiamgia',
        data: {magiamgia: $("#magiamgia").val()},
        success: function(data){
            if(data != "failed"){
                addCartTotal(data.sotiengiam, data.magiamgia)
            }else{
                swal({
                    title: "Thất bại",
                    text: "Mã bạn sử dụng không hợp lệ",
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