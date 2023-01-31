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


// 생년월일
// #year , #month, #date에서 focusout됐을 때 (실행할 함수)
// #year의 value length가 숫자 4가 아니라면(조건1)
// #birth .warn 빨간 글씨로 "태어난 년도 4자리를 정확하게 입력하세요." (실행문1)

// #month의 값이 비어있으면 (조건2)
// #birth .warn 빨간 글씨로 "태어난 월을 선택하세요." (실행문2)

// #date 값이 비어있거나 date값이 31이상일 때(조건3)
// #birth .warn 빨간 글씨로 "태어난 일(날짜) 2자리를 정확하게 입력하세요." (실행문3)

// 만약 year,month,date의 값이 숫자가 아니라면(조건4) isNaN 사용
// #birth .warn 빨간 글씨로 "생년월일을 다시 확인해주세요." (실행문4)

// 올 해 기준으로 나이가 100 초과라면 (조건5) 
// #birth .warn 빨간 글씨로 "정말이세요?" (실행문5)

// 매개변수(파라미터)사용
// 코드의 중복을 줄일 수 있다
function para(text) {
  $("#birth .warn").html('<span class="text-red">' + text + '</span>');
}

$("#year , #month, #date").focusout(function(){
  let year = $("#year").val();
  let month = $("#month").val();
  let date = $("#date").val();
  // 현재 날짜 및 시간
  let now = new Date();
  console.log(now);
  // Date 객체의 getTime() 메서드 1970년 1월 1월 00시 00분 00초 
  // UTC(세계표준시)를 기준으로 경과한 밀리초를 반환
  let nowstamp = now.getTime();
  // 현재 날짜 및 시간에서 현재 연도의 네 자리값을 변수에 할당
  now = now.getFullYear();
  console.log(now);

  let birth = new Date(year, month, date);
  birth = birth.getTime();
  birthveri = false;

  // year.length가 4가 아닐때
  if(year.length != 4) {
    para("태어난 년도 4자리를 정확하게 입력하세요.");
    // $("#birth .warn").html('<span class="text-red">태어난 년도 4자리를 정확하게 입력하세요.</span>');
  } else if(month.length == 0) {
    para("태어난 월을 선택하세요.");
    // $("#birth .warn").html('<span class="text-red">태어난 월을 선택하세요.</span>');
  } else if(date.length == 0 || date > 31 || date <= 0) {
    // #date 값이 비어있거나 date값이 31이상일 때(조건3) 
    // 논리연산자 사용(or) 두 조건 중 하나만 충족해도 실행문 실행
    para("태어난 일(날짜) 2자리를 정확하게 입력하세요.");
    // $("#birth .warn").html('<span class="text-red">태어난 일(날짜) 2자리를 정확하게 입력하세요.</span>');
  } else if(isNaN(year * month * date)) {
    para("생년월일을 다시 확인해주세요.");
    // $("#birth .warn").html('<span class="text-red">생년월일을 다시 확인해주세요.</span>');
  } else if(now - year > 100) {
    para("정말이세요?");
    // $("#birth .warn").html('<span class="text-red">정말이세요?</span>');
  } else if(nowstamp < birth) {
    para("미래에서 오셨군요. ^^");
    // $("#birth .warn").html('<span class="text-red">미래에서 오셨군요. ^^</span>');
  } else {
    birthveri = true;
    para("");
    // $("#birth .warn").empty();
  }
})

// 성별
// #gender .inputbox를 클릭 했을 때
$("#gender .inputbox").click(function(e) {
  e.preventDefault();
  $("#gender .inputbox").removeClass('btn-primary');
  $("#gender .inputbox input").removeAttr('checked');
  // 내가 클릭하는 .inputbox한테 클래스, 속성 추가
  $(this).addClass('btn-primary')
  $(this).children('input').Attr('checked', true);
  genderveri = true;
})


// 이메일(선택)

// #usermail input에서 focusout 됐을 때
$('#usermail input').focusout(function() {
  let mail = $(this).val();
  let redExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  mailveri = true;
  if(mail.length == 0) {
    $('#usermail .warn').empty();
  } else if(!redExp.test(mail)) {
    $("#usermail .warn").html('<span class="text-red">이메일 주소를 다시 확인해주세요.</span>');
    mailveri = false;
  } else {
    $('#usermail .warn').empty();
  }
})

// 휴대전화
// #phone input에서 focusout 됐을 때
$('#phonenum input').focusout(function() {
  let phone = $(this).val();
  if(phone.length == 0) {
    $('#phone .warn').html('<span class="text-red">휴대전화 번호를 다시 확인해주세요.</span>');
  } else {
    $('#phone .warn').empty();
  }
})