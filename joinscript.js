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
$("#gender .inputbox").click(function(e){
  // radio의 기본 클릭동작 해제
  e.preventDefault();
  $("#gender .inputbox").removeClass('btn-primary');
  $("#gender .inputbox input").removeAttr('checked');
  // 내가 클릭하는 .inputbox한테 클래스, 속성 추가
  $(this).addClass('btn-primary');
  // 클릭된 .inputbox 에게 자식 input 데려와
  $(this).children('input').attr('checked', 'checked');
  genderveri = true;
})

// 본인 확인 이메일(선택)
// #usermail input에서 focusout됐을 때
$("#usermail input").focusout(function(){
  let mail = $(this).val();
  let redExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
  mailveri = true;
  if(mail.length == 0) {
    $("#usermail .warn").empty();
  } else if(!redExp.test(mail)) {
    $("#usermail .warn").html('<span class="text-red">이메일 주소를 다시 확인해주세요.</span>')
    mailveri = false;
  } else {
    $("#usermail .warn").empty();
  }
})

// 휴대전화
// #phonenum input에서 focusout 됐을 때
// 그것의 value.length가 0이라면 (조건1)
// #phone .warn "필수 정보입니다." (실행문1)
$("#phonenum input").focusout(function(){
  if($(this).val().length == 0) {
    $("#phone .warn").html('<span class="text-red">필수 정보입니다.</span>');
  } else {
    $("#phone .warn").empty();
  }
})

// #veribtn을 클릭 했을 때
$("#veribtn").click(function(){
  let verifi = $("#phonenum input").val();
  // 숫자를 제외한 모든 문자제거
  // 문자열 치환 replace
  verifi = verifi.replace(/[^0-9]/g, '');

  $("#phonenum input").val(verifi);

  let veri1;
  // #phonenum input의 val().length가 10-11자리가 아니라면(조건1)
  if(verifi.length < 10 ||  verifi.length > 11) {
    veri1 = false;
  } else {
    veri1 = true;
  }

  let veri2;
  if(!isNaN(verifi)) {
    veri2 = true;
  } else {
    veri2 = false;
  }

  // 1. 전화번호를 형식에 맞게 입력하면 인증번호를 발급
  // 2. 인증번호를 발급 받으면 인증번호 입력칸을 활성화
  // 3. 전화번호를 형식 맞지 않게 입력했을 경우 인증번호 입력칸 비활성화

  // veri1 && veri2 모두 true일 경우(조건1)
  // 인증번호를 보내고 .warn "인증번호가 발송되었습니다" (실행문1) .text-green
  // 인증번호 입력칸을 활성화 (실행문2) css: .disinput / attr : disabled
  // $("")부터 disinput이라는 클래스 remove
  // $("")부터 disabled라는 속성 remove
  if(veri1 && veri2) {
    $("#phone .warn").html('<span class="text-green">인증번호를 발송했습니다.(유효시간 30분)<br>인증번호가 오지 않으면 입력하신 정보가 정확한지 확인하여 주세요.<br>이미 가입된 번호이거나, 가상전화번호는 인증번호를 받을 수 없습니다.</span>')
    $(".disinput").removeClass("disinput");
    $("#veritext").removeAttr("disabled");
  } else {
    // #phone .warn "형식에 맞지 않는 번호입니다." text-red (실행문1)
    // 인증번호 입력칸 비활성화
    $("#phone .warn").html('<span class="text-red">형식에 맞지 않는 번호입니다.</span>');
    $("#veritext").attr("disabled", "disabled");
    $("#veritext").parent('.inputbox').addClass('disinput');
  }
})


// #veritext에서 focusout됐을 때 
// 그 값이 "1234"와 같다면 (조건1)
// "인증되었습니다." text-green (실행문1)
$("#veritext").focusout(function(){
  phoneveri = false;
  if($(this).val() == "1234") {
    phoneveri = true;
    $("#phone .warn").html('<span class="text-green">인증되었습니다.</span>');
    $(this).next("div").empty();
    $(this).parent('.inputbox').removeClass('border-red');
  } else {
    // 불일치, X 아이콘
    $(this).next("div").html('<span class="text-red">불일치</span> <span class="disagree"></span>')
    $("#phone .warn").html('<span class="text-red">인증번호를 다시 확인해주세요.</span>');
    $(this).parent('.inputbox').addClass('border-red');
  }
})


// 주소
// 카카오에서 제공하는 주소찾기 API 활용
// API란? Application Programming Interface의 줄임말
// 프론트앤드(클라이언트)와 백앤드(서버)가 요청과 응답을 받을 수 있게 만들어진 체계
// API 요청에서 가장 중요한 개념 CRUD
//  Create, Read, Update, Delete API 요청의 기본요소 네가지
// API를 만드는 역할을 하는 게 서버 개발자 = 즉 백엔드 개발자
function sample6_execDaumPostcode() {
  addressveri = true;
  new daum.Postcode({
      oncomplete: function(data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var addr = ''; // 주소 변수
          var extraAddr = ''; // 참고항목 변수

          //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
              addr = data.roadAddress;
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
              addr = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if(data.userSelectedType === 'R'){
              // 법정동명이 있을 경우 추가한다. (법정리는 제외)
              // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
              if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                  extraAddr += data.bname;
              }
              // 건물명이 있고, 공동주택일 경우 추가한다.
              if(data.buildingName !== '' && data.apartment === 'Y'){
                  extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
              }
              // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
              if(extraAddr !== ''){
                  extraAddr = ' (' + extraAddr + ')';
              }
              // 조합된 참고항목을 해당 필드에 넣는다.
              document.getElementById("sample6_extraAddress").value = extraAddr;
          
          } else {
              document.getElementById("sample6_extraAddress").value = '';
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById('sample6_postcode').value = data.zonecode;
          document.getElementById("sample6_address").value = addr;
          // 커서를 상세주소 필드로 이동한다.
          document.getElementById("sample6_detailAddress").focus();
      }
  }).open();
}

// #joinbtn을 눌렀을 때 필수요소가 모두 true라면(조건1)
// #join-form을 submit (실행문1) 
$("#joinbtn").click(function(){
  if(idveri && pwveri && pwchkveri && nameveri && birthveri && genderveri && phoneveri && addressveri) {
    $("#join-form").submit();
  } else {
    // 강제로 이벤트를 발생시키는 메서드 trigger
    $("input").trigger("focusout");
  }
})