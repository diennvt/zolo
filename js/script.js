 // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
  
      function md5(str) {
        var str = CryptoJS.MD5(str).toString();
        return str;
      }
      function clearForm(form_id) {
        document.getElementById(form_id).reset();
      }
  
      function createCartToken(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
      firebase.analytics();
  
  
      function register() {
        var fullname = document.getElementById('fullname').value;
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var encode_pw = md5(password);
        var users = firebase.database().ref('/users/' + username);
        users.once('value').then(function (snapshot) {
          //console.log(snapshot.val().username)
          var check_username = (snapshot.val() && snapshot.val().username) || null;
          if (check_username == null) {
            users.set({
              'full_name': fullname,
              'username': username,
              'password': encode_pw,
              'token': ''
            });
            alert('register success');
            clearForm('register_form');
          } else {
            alert('this username was registered');
          }
        });
      }
  
      function login() {
        var username = document.getElementById('login_username').value;
        var password = document.getElementById('login_password').value;
        var encode_pw = md5(password);
        var users = firebase.database().ref('/users/' + username);
        var token = createCartToken(32);
        users.once('value').then(function (snapshot) {
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
          'room_id': createCartToken(32),
          'room_name': room_name,
          'messages': ['hello', 'hi']
        });
      }

      function chooseLanguage(self){
          $('.item-language').removeClass('active')
        $(self).addClass('active');
      }

      function nextToRegister(){
          $('#helloPage').hide();
          $('#registerPage').show();
      }

      function back(self, page){
        var current_page = $(self).closest('.full-screen');
        current_page.css('left', '2000px');
        current_page.css('animation', 'back 2s');
       setTimeout(function(){ 
          $('.full-screen').hide();
          $('#'+page).show(); 
          current_page.css('left', '');
          current_page.css('animation', '');
        }, 400);
      }

      function next(self, page){
        var current_page = $(self).closest('.full-screen');
        current_page.css('right', '2000px');
        current_page.css('animation', 'next 2s');
        setTimeout(function(){ 
           $('.full-screen').hide();
           $('#'+page).show(); 
           current_page.css('right', '');
           current_page.css('animation', '');
         }, 400);
       }
    
    