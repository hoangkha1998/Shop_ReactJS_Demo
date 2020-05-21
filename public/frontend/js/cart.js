$(document).ready(function () {
    show_quantity_cart();
    var cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
    show_cart(cart);
    tinh_tong(cart);
    function show_cart(cart) {
        var html = '';
        Object.keys(cart).map(function (key, value) {
            html += '<tr id="' + key + '">' +
                        '<td class="cart_product">' +
                            '<a href=""><img src="' + cart[key]["img"] + '" alt=""></a>' +
                        '</td>' +
                        '<td class="cart_description">' +
                            '<h4><a >' + cart[key]["title"] + '</a></h4>' +
                            '<p>Web ID: 1089772</p>' +
                        '</td>' +
                        '<td class="cart_price">' +
                            '<p>' + cart[key]["prices"] + '</p>' +
                        '</td>' +
                        '<td class="cart_quantity">' +
                            '<div class="cart_quantity_button">' +
                                '<a class="cart_quantity_up" href="javascript:void(0)"> + </a>' +
                                '<input class="cart_quantity_input" type="text" name="quantity" value="' + cart[key]["quantity"] + '" autocomplete="off" size="2">' +
                                '<a class="cart_quantity_down" href="javascript:void(0)"> - </a>' +
                            '</div>' +
                        '</td>' +
                        '<td class="cart_total">' +
                            '<p class="cart_total_price">$' + cart[key]["quantity"] * cart[key]["prices"].slice(1) + '</p>' +
                        '</td>' +
                        '<td class="cart_delete">' +
                            '<a class="cart_quantity_delete" id="' + key + '"><i class="fa fa-times"></i></a>' +
                        '</td>' +
                    "</tr>";

        });

        $('#tbody').html(html);
    }

    $('.cart_quantity_up').on('click', function () {
        var divcha = $(this).closest('tr');
        var quantity = $(divcha).find('.cart_quantity_input').val();
        var prices = $(divcha).find('.cart_price p').text();
        var id = $(divcha).attr('id');
        quantity++;
        $(divcha).find('.cart_quantity_input').val(quantity);
        var total = quantity * prices.slice(1);
        $(divcha).find('.cart_total_price').text('$' + total);
        if (cart[id]) {
            cart[id]["quantity"] = quantity;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        tinh_tong(cart);

    });
    $('.cart_quantity_down').on('click', function () {
        var divcha = $(this).closest('tr');
        var quantity = $(divcha).find('.cart_quantity_input').val();
        var prices = $(divcha).find('.cart_price p').text();
        var id = $(divcha).attr('id');
        if (quantity > 1) {
            quantity--;
        } else {
            quantity = 1;
        }
        $(divcha).find('.cart_quantity_input').val(quantity);
        var total = quantity * prices.slice(1);
        $(divcha).find('.cart_total_price').text('$' + total);
        if (cart[id]) {
            cart[id]["quantity"] = quantity;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        tinh_tong(cart);

    });
    $('.cart_quantity_delete').on('click', function () {
        var divcha = $(this).closest('tr');
        var id = $(divcha).attr('id');
        if (confirm('Ban muon xoa?')) {
            delete cart[id];
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Xoa thanh cong');
            $('tr#' + id).remove();
            show_quantity_cart();
            tinh_tong(cart);
        }

    });
    function show_quantity_cart() {
        var result = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : 0;
        if (result != 0) {
            $('.cart').html("<i class='fa fa-shopping-cart'></i>"+Object.keys(result).length)
        }

    }
    function tinh_tong(cart) {
        var tax = $('.tax').text();
        var tong = 0;
        Object.keys(cart).map(function (key, value) {
            tong += cart[key]['quantity'] * cart[key]['prices'].slice(1);
        });
        $('.cart_sub_total').text('$' + tong);
        if (tong > 0) {
            $('.total').text('$' + (tong + Number(tax.slice(1))));
        } else {
            $('.total').text('$0');
        }

    }
});