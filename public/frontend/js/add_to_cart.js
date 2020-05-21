$(document).ready(function(){
 show_cart();
 $('.add-to-cart').on('click',function(){
    var divcha = $(this).closest('.single-products');
    var img = $(divcha).find('img').attr('src');
    var prices = $(divcha).find('.productinfo h2').text();
    var title = $(divcha).find('.productinfo p').text();    
    var id = $(this).attr('id');
    var cartSto = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};    
    if(cartSto[id]){
        newcart.quantity= cartSto[id].quantity +1;
    }else{
        var newcart = {
            img:img,
            prices:prices,
            title:title,
            quantity: 1     
        }
        cartSto[id]=newcart;
    }   
    localStorage.setItem('cart',JSON.stringify(cartSto));
    alert('Them thanh cong');
    show_cart();       
 
 });
 function show_cart(){
     var result  = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : 0;
     if(result != 0){
        $('.cart').html("<i class='fa fa-shopping-cart'></i>"+Object.keys(result).length)
     }
    
 }
 
});