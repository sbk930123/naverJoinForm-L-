$('input').focusin(function() {
  // input에 focus가 in 됐을 때 그것의 부모 .inputbox에게 .inputboxact 클래스를 준다.
  // 그 클래스는 border 값이 된다.
  $(this).parent('.inputbox').addClass('inputboxact');
})

$('input').focusout(function() {
  // input에 focus가 out 됐을 때 그것의 부모 .inputbox에게 .inputboxact 클래스를 없앤다.
  // 그 클래스는 border 값이 된다.
  $(this).parent('.inputbox').removeClass('inputboxact');
})

let idveri, pwveri, pwchkveri, nameveri, birthveri, genderveri, phoneveri, addressveri  = false;
let mailveri = true;

// 아이디
// #userid input에서 focusout 됐을 때 그것의 글자수가 0이라면 (조건)
// #userid 안에 있는 p태그에 필수 정보입니다. 를 출력
$('#userid input').focusout(function() {
  let len = $(this).val().length;
  idveri = false;
  if(len == 0) {
    $('#userid .warn').html('<span class="text-red">필수 정보 입니다.</span>');
  } else if(len < 5 || len > 20) {
    $('#userid .warn').html('<span class="text-red">5~20자의 영문소문자만 사용가능합니다.</span>');
  } else {
    $('#userid .warn').html('<span class="text-green">사용 가능합니다.</span>');
    idveri = true;
  }
})

// 비밀번호

$('#userpw input').focusout(function() {
  let len = $(this).val().length;
  pwveri = false;
  if(len == 0) {
    $('#userpw .warn').html('<span class="text-red">필수 정보 입니다.</span>');
    $('#userpw .inputbox img').attr("src", "./images/m_icon_pw_step_01.png");
    $('#userpw .inputbox span').empty();
  } else if(len < 8 || len > 16) {
    $('#userpw .warn').html('<span class="text-red">8~16자 영문 대 소문자,숫자, 특수문자를 사용하세요.</span>');
    $('#userpw .inputbox p').html('<span class="text-red">사용불가</span>');
    $('#userpw .inputbox img').attr("src", "./images/m_icon_pw_step_10.png");
  } else {
    $('#userpw .warn').empty();
    $('#userpw .inputbox p').html('<span class="text-green">안전</span>');
    $('#userpw .inputbox img').attr("src", "./images/m_icon_pw_step_04.png");
    idveri = true;
  }
})

// 비밀번호 재확인

$('#userpw-chk input').focusout(function() {
  let userpw = $('#userpw input').val();
  let userpwchk = $(this).val();
  pwchkveri = false;
  if(userpwchk.length == 0) {
    $('#userpw-chk .warn').html('<span class="text-red">필수 정보입니다.</span>');
    $('#userpw-chk .inputbox img').attr("src", "./images/m_icon_pw_step_02.png");
  } else if(userpw == userpwchk) {
    // remove는 요소자체를 지워버리지만 empty는 요소안의 내용을 지운다.
    pwchkveri = true;
    $('#userpw-chk .warn').empty();
    $('#userpw-chk .inputbox img').attr("src", "./images/m_icon_pw_step_07.png");
  } else {
    $('#userpw-chk .warn').html('<span class="text-red">비밀번호가 일치하지 않습니다.</span>');
    $('#userpw-chk .inputbox img').attr("src", "./images/m_icon_pw_step_02.png");
  }
})


// 유저이름

$('#username input').focusout(function() {
  let len = $('#username input').val();
  nameveri = false;
  let reg = /[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]/g;
  if(len.length == 0) {
    $('#username .warn').html('<span class="text-red">필수 정보입니다.</span>');
  } else if(reg.test(len)) {
    $('#username .warn').html('<span class="text-red">한글과 영문 대 소문자를 사용하세요. (특수기호 사용불가)</span>');
    // 정규식을 만족하면 true 만족하지 않으면 false 반환
  } else {
    nameveri = true;
    $('#username .warn').empty();
  }
})
