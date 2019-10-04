var sanphamdachon = []
var danhsachsanpham = []
var device = 0
var shipfee = 0
var thongbaoshipfee

$(document).ready(function () {

    window.mobileAndTabletcheck = function() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
    if(window.mobileAndTabletcheck() == false){
        device = 0

        $(".widget_shopping_cart").css({
            "width": "30%"
        })
        $("#containersanpham").css("max-width", "70%")
    }else{
        var logohome = `                            <a class="navbar-brand" href="/" style="height: auto;"> <img  src="/img/bhngocminh.jpg" alt="sua-chua-mit-ngoc-minh" style="width: 100%; height: inherit"></a>
                            <h4>Sữa Chua Mít (Da Ua Mít)</h4>
                                    <span style="font-size: 100%">
                                        <i class="fa fa-hand-peace-o" aria-hidden="true"></i>
Hợp Vệ Sinh</br>
                                        <i class="fa fa-hand-peace-o" aria-hidden="true"></i>
Giao Hàng Tận Nơi</br>
                                    </span>
                                    <span style="color: red; font-weight: bold;font-size: 100%"><i class="fa fa-phone-square" aria-hidden="true"></i>
Hotline Đặt Hàng: 096 121 6330</span>`
        device = 1
        $("#xemgiohang").css("display","block")
        $("#sidebar").css("display","block")
        $("#logohome").html(logohome)
    }

    
    laytatcasanpham()

    $("#btn-close").click(function(){
        $(".widget_shopping_cart").css({
            "width": "0"
        })

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
    loadshipfee()
})

function loadshipfee(){
    $.ajax({
        url:'/loadphiship',
        method:'POST',
        success: function(data){
            if(data.shipfee == "true"){
                shipfee = 0
                thongbaoshipfee = data.thongbaoshipfee
                $("#phishiphang").html(thongbaoshipfee)
            }else{
                $("#phishiphang").html("Phí Ship Hàng: 22,000đ")
                shipfee = 22000
            }
        }
    })
}


function themsanpham(msp){

    var spvuachon
    danhsachsanpham.forEach(function(values) {
        if(values.masanpham == msp){
            spvuachon = values
        }
    })
    if(device == 1){
        var layhinhanh = "#hinhanh_" + spvuachon.masanpham
       var cart = $('.float');
       var imgtofly = $(layhinhanh)
        if (imgtofly) {
            var imgclone = imgtofly.clone()
                .offset({ top:imgtofly.offset().top, left:imgtofly.offset().left })
                .css({'opacity':'0.8', 'position':'absolute', 'height':'150px', 'width':'150px', 'z-index':'1000'})
                .appendTo($('body'))
                .animate({
                    'top':cart.offset().top + 50,
                    'left':cart.offset().left + 200,
                    'width':55,
                    'height':55
                }, 1000, 'easeInElastic');
            imgclone.animate({'width':0, 'height':0});
        }

    }

    $("#cart-list").empty();
    var ketqua = themvaogiohang(spvuachon);
    var giasanpham
    var values
    for(var i=0; i< sanphamdachon.length; i++){
        values = sanphamdachon[i]
        giasanpham = Comma(values.giakhuyenmai*values.soluong)
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
            '       <span class="Price-amount-item" id= "giaspsoluong_'+ values.masanpham +'">' + giasanpham + '</span>' +
            '       <span class="Price-currencySymbol-item">₫</span>' +
            '   </div>' +
            '</li>'
        )
    }
    if(device == 1){
        addDataIcon()
    }
    addCartTotal()
    /*opensidebar();*/
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
                
                string += `<div class="col-12 col-md-6 col-lg-4" onclick="themsanpham('`+ data[i].masanpham +`')" style="height: auto">
                            <div class="col-inner">
                                <div class="badge-container">
                                    <div class="badge-square">
                                        <div class="badge-inner secondary on-sale"><span
                                                class="onsale">-`+ sophantramgiam +`%</span></div>
                                    </div>
                                </div>
                                <div class="product-small" style="height: auto">
                                    <div>
                                        <img id="hinhanh_`+ data[i].masanpham +`" src="`+ data[i].image + `" width="200" height="250"
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
    if(shipfee != 0){
        tongtien = parseInt(tongtien) + shipfee
    }

    return tongtien;
}
function addCartTotal(sotiengiam, magiamgia) {  
        
        if(sotiengiam){

            var tongtiensaugiam = tongtien() - parseInt(sotiengiam)
            $('.Price-amount').each(function(){
                $(this).html("<del>" + Comma(tongtien()) + "</del>  " + Comma(tongtiensaugiam) + "đ");
            })
            
            $("#sotiengiam").val(sotiengiam)
            $("#magiamgiasave").val(magiamgia)
            $("#tongtiensaugiamgia").val(tongtiensaugiam)  
        }else{
            $('.Price-amount').each(function(){
                $(this).html(Comma(tongtien()) + "đ");
            })

        }

}
function addDataIcon(){
    $("#sospdachon").html(sanphamdachon.length)
}
function opensidebar(){
            if(device == 1){
                $(".widget_shopping_cart").css({
                    "width": "100%",
                    "top": "auto",
                    "right": "auto",
                    "bottom": 0,
                    "height": "100%"
                })
            }


            addCartTotal();
            addDataIcon();
}


function soluongmathang(msp){
    var id = "#quantity-item-" + msp
    var soluong = $(id)[0].value
    var giasanpham
    for(var i=0; i<sanphamdachon.length; i++){
        if(sanphamdachon[i].masanpham == msp){
            sanphamdachon[i].soluong = soluong
            giasanpham = Comma(sanphamdachon[i].giakhuyenmai*sanphamdachon[i].soluong)
            $("#giaspsoluong_"+sanphamdachon[i].masanpham).html(giasanpham)
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

    if(check == 0){
        var data = {
            hoten: $('#ThanhToan #hoten').val().trim(),
            sdt: $('#ThanhToan #sdt').val().trim(),
            diachi: $('#ThanhToan #diachi').val().trim(),
            ghichu: $('#ThanhToan #ghichu').val().trim(),
            cacsanpham: sanphamdachon,
            magiamgia: $('#magiamgiasave').val().trim(),
            sotiengiam: $('#sotiengiam').val().trim(),
            shipfee: shipfee,
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
                        text: "Chúng tôi đã nhận đơn hàng của bạn, đơn hàng sẽ được giao sớm nhất",
                        type: "info",
                        showConfirmButton: false,
                        timer: 10000
                    }).then(function(result){
                        location.reload();

                    })
                    .catch(function(timer){
                        location.reload();
                    }); 
                    
                }else{
                    swal({
                        title: "Phát sinh lỗi",
                        text: "Title đã được sử dụng",
                        type: "error",
                        showConfirmButton: false,    
                        timer: 3000
                    }).then(function(result){
                        // cho vào để ko báo lỗi uncaught
                    })
                    .catch(function(timer){
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
        }).then(function(result){
            // cho vào để ko báo lỗi uncaught
        })
        .catch(function(timer){
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
                }).then(function(result){
                    // cho vào để ko báo lỗi uncaught
                })
                .catch(function(timer){
                    // cho vào để ko báo lỗi uncaught
                }); 
                
            }
        }
    })
}