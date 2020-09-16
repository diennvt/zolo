// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: 'AIzaSyCpZX_9ycBgituf2VvTksMPlsZEIKUTg6I',
    authDomain: 'realtimechatroom-f2e99.firebaseapp.com',
    databaseURL: 'https://realtimechatroom-f2e99.firebaseio.com',
    projectId: 'realtimechatroom-f2e99',
    storageBucket: 'realtimechatroom-f2e99.appspot.com',
    messagingSenderId: '95831065723',
    appId: '1:95831065723:web:58c9bf8204c0d760a20ede',
    measurementId: 'G-Z7KY2K9QRK'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.messaging();

 function md5(str) {
     var str = CryptoJS.MD5(str).toString();
     return str;
 }

 function clearForm(form_id) {
     document.getElementById(form_id).reset();
 }

 function createToken(length) {
     var result = '';
     var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     var charactersLength = characters.length;
     for (var i = 0; i < length; i++) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
     }
     return result;
 }

 function createOTP(length) {
    var result = '';
    var characters = '0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

 function setCookie(name, value, days) {
     var expires = '';
     if (days) {
         var date = new Date();
         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
         expires = '; expires=' + date.toUTCString();
     }
     document.cookie = name + '=' + (value || '') + expires + '; path=/';
 }

 function getCookie(name) {
     var nameEQ = name + '=';
     var ca = document.cookie.split(';');
     for (var i = 0; i < ca.length; i++) {
         var c = ca[i];
         while (c.charAt(0) == ' ') c = c.substring(1, c.length);
         if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
     }
     return null;
 }

 function eraseCookie(name) {
     document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
 }

 function register(self, page, step) {
    var fullname = $('input[name="fullname"]').val();
    var phonenumber = $('input[name="phonenumber"]').val();
    var otp = createOTP(6);
    var input_otp = $('input[name="otp"]').val();
    var id = md5(phonenumber.toString() + otp.toString());
    var users = firebase.database().ref('/users/' + phonenumber);
    if(step == 'go_to_register'){
        window.setTimeout(function (){
            $('input[name="fullname"]').focus();
        }, 500);    
        next(self, page);
    } else if(step == 'write_name'){
        window.setTimeout(function (){
            $('input[name="phonenumber"]').focus();  
        }, 500); 
        if(!fullname){
            alert('please enter your name');
            $('input[name="fullname"]').focus();
            return false;
        } else {
            next(self, page);
        }
    } else if(step == 'send_otp'){
        // window.setTimeout(function (){
        //     $('input[name="otp"]').focus();
        // }, 500);
        if(!phonenumber){
            alert('please enter your phone number');
            $('input[name="phonenumber"]').focus();  
            return false;
        }
        users.once('value').then(function(snapshot) {
            //console.log(snapshot.val().username)
            //var check_phonenumber = (snapshot.val() && snapshot.val().phonenumber) || null;
            var phonenumber2 = (snapshot.val() && snapshot.val().phonenumber) || null;
            var otp2 = (snapshot.val() && snapshot.val().otp) || null;
            var confirm = (snapshot.val() && snapshot.val().confirm) || null;
            if (phonenumber == phonenumber2 && confirm == 'y') {
                alert('this phonenumber was registered');
            } else {
                users.set({
                    'fullname': fullname,
                    'phonenumber': phonenumber,
                    'otp': otp,
                    'confirm': ''
                });
                alert("otp code: " + otp);
                next(self, page);
                var interval =  setInterval(function(){ 
                        $('input[name="otp"]').focus(); 
                        if($('#registerPage3').css('display') == 'block'){
                            clearInterval(interval);
                        }
                    }, 1);
            }
        });
     } else if(step == 'register'){
        if(!input_otp){
            alert('please enter otp code');
            return false;
        }
        users.once('value').then(function(snapshot) {
            //console.log(snapshot.val().username)
            var phonenumber2 = (snapshot.val() && snapshot.val().phonenumber) || null;
            var otp2 = (snapshot.val() && snapshot.val().otp) || null;
            if (input_otp == otp2 && phonenumber == phonenumber2) {
                users.set({
                    'fullname': fullname,
                    'phonenumber': phonenumber,
                    'otp': otp2,
                    'confirm': 'y'
                });
                alert("register complete");
                next(self, page);
                $('input').val('');
            } else if (input_otp == otp2){
                alert('otp wrong');
            } else {
                alert("register failed");
            }
        });
     }
     
 }

 function login() {
     var username = document.getElementById('login_username').value;
     var password = document.getElementById('login_password').value;
     var encode_pw = md5(password);
     var users = firebase.database().ref('/users/' + phonenumber);
     var token = createToken(32);
     users.once('value').then(function(snapshot) {
         var check_full_name = (snapshot.val() && snapshot.val().full_name) || null;
         var check_username = (snapshot.val() && snapshot.val().username) || null;
         var check_password = (snapshot.val() && snapshot.val().password) || null;
         if (encode_pw != check_password) {
             alert('login failed');
         } else {
             users.set({
                 'full_name': check_full_name,
                 'username': check_username,
                 'password': check_password,
                 'token': token
             });
             alert('login success');
             setCookie('username', check_username, 1);
             setCookie('token', token, 1);
             console.log(getCookie('token'));
             clearForm('login_form');
         }
     });
 }

 function createRoom() {
     var room_name = document.getElementById('room_name').value;
     //console.log(message)
     firebase.database().ref('room').set({
         'room_id': createToken(32),
         'room_name': room_name,
         'messages': ['hello', 'hi']
     });
 }

 function chooseLanguage(self, language) {
     $('.item-language').removeClass('active')
     $(self).addClass('active');
     var arr_languages = {
         "login": { "vi": "Đăng nhập", "en": "Login", "cn": "登录" },
         "register": { "vi": "Đăng ký", "en": "Register", "cn": "注册" },
         "create-register": { "vi": "Tạo tài khoản", "en": "Create account", "cn": "创建帐号" },
         "full-name": { "vi": "Tên đầy đủ", "en": "Full name", "cn": "全名" },
         "enter-phonenumber": { "vi": "Nhập số điện thoại", "en": "Enter your phone number", "cn": "输入你的电话号码" }
     };
     $("[data-languages]").each(function() {
         var object = $(this).data('languages');
         var type_objext = $('[data-languages|="' + object + '"]')[0].nodeName;
         var value = arr_languages[object][language];
         if (type_objext == 'BUTTON' || type_objext == 'SPAN') {
             $('[data-languages|="' + object + '"]').text(value);
         } else if (type_objext == 'INPUT') {
             $('[data-languages|="' + object + '"]').attr("placeholder", value);
         }
     });
 }

 function nextToRegister() {
     $('#helloPage').hide();
     $('#registerPage').show();
 }

 function back(self, page) {
     var current_page = $(self).closest('.full-screen');
     current_page.css('left', '2000px');
     current_page.css('animation', 'back 2s');
     setTimeout(function() {
         $('.full-screen').hide();
         $('#' + page).show();
         current_page.css('left', '');
         current_page.css('animation', '');
     }, 400);
 }

 function next(self, page) {
     var current_page = $(self).closest('.full-screen');
     current_page.css('right', '2000px');
     current_page.css('animation', 'next 2s');
     setTimeout(function() {
         $('.full-screen').hide();
         $('#' + page).show();
         current_page.css('right', '');
         current_page.css('animation', '');
     }, 400);

 }