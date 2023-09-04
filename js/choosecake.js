// 나에게 맞는 떡케이크 찾기
window.addEventListener("load", function () {
  // data.json을 로딩 (new Date()처럼 복사해온 것)
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (event) {
    const req = event.target;
    if (req.readyState === XMLHttpRequest.DONE) {
      const str = req.response; // 속성값을 담음
      // 글자로 온 데이터를 객체로 변환
      // 글자가 json 규칙대로 만들어진 문자열이다.
      // 그러므로 json 글자를 객체로 변환해서 활용한다.
      // json의 배열값 하나하나가 obj 안에 담김(pic 하나하나)
      let obj = JSON.parse(str);

      CHOOSECAKE_GAME = obj.choosecakegame;

      // 떡케이크 밸런스 게임을 화면에 배치
      showChoosecakeGame();
    }
  };

  // 자료를 호출한다.
  // console.log("자료를 가져온다. XMLHT.....");
  xhttp.open("GET", "data.json");
  // 웹 브라우저 기능을 실행할 수 있도록 요청
  xhttp.send();

  // 추천상품
  let CHOOSECAKE_GAME;
  let choosecakeTag = $("#data-choosecake");

  // =========================================
  // 추천 상품 화면 출력 기능
  // function showRecommendGood() {
  function showChoosecakeGame(item) {
    let html = ``;

    CHOOSECAKE_GAME.forEach(function (item) {
      let tag = `
      <div>RESULT</div>
      <span>당신에게 맞는 떡케이크는 이거인 것 같아요!</span>
      <img src="${item.pic}" alt="${item.alt}">
      <p>${item.name}</p>
      <div class="choose-btn">
        <button class="bt-gotoproduct">제품 보러가기</button>
        <button class="bt-game-restart">게임 다시하기</button>
      </div>
      `;
      html += tag;
    });

    choosecakeTag.innerHTML = html;
    // const swRecommend = new Swiper(".sw-recommend", {
    //   slidesPerView: 4, // 화면에 보여지는 갯수
    //   spaceBetween: 40, // 슬라이드와 슬라이드의 사이 간격
    //   slidesPerGroup: 4, // 슬라이드로 넘어가는 갯수
    //   navigation: {
    //     prevEl: ".recommend .slide-prev",
    //     nextEl: ".recommend .slide-next",
    //   },
    //   pagination: {
    //     el: ".recommend .slide-pg",
    //     type: "fraction",
    //   },
    // });
  }
  // =========================================

  // 시작화면
  const gameStartDiv = $(".game-stage-start");
  // 시작 버튼
  const gameStartBt = gameStartDiv.find(".bt-game-start");
  // 게임화면
  const gameViewDiv = $(".game-stage-view");
  // 게임 각 레벨 div : 결과는 []
  const gameLevelDivs = gameViewDiv.find(".game-level");
  // 결과화면
  const gameResultDiv = $(".game-stage-result");
  const gameResultNum = gameResultDiv.find(".game-state-num");
  // 다시 시작하기 버튼
  const gameRestartBt = gameResultDiv.find(".bt-game-restart");
  // 결과창 닫기 버튼
  const gamecloseBt = gameResultDiv.find(".game-result-close");

  // 게임 각 레벨 div 의 총 개수 : 배열이라서 length
  let gameLevelTotal = gameLevelDivs.length;
  let gameResult = "";
  let gameLevel = 0;
  // 현재 게임의 상태
  let gameState = "준비";
  //게임 레벨 보여주기
  function gameShowFN() {
    gameLevelDivs.hide();
    gameLevelDivs.eq(gameLevel).show();
    // 버튼이 2개입니다. A 버튼 , B 버튼
    const gameBtns = gameLevelDivs.eq(gameLevel).find("button");
    $.each(gameBtns, function (index, item) {
      $(item).click(function () {
        // console.log(index);
        gameResult += index;
        gameLevel++;
        // 클릭 제거하기
        gameBtns.off("click");
        if (gameLevel >= gameLevelTotal) {
          // 게임화면 마감
          gameViewDiv.hide();
          // 결과창으로 보여주기
          gameResultDiv.show();
          // 결과 내용 변경해서 출력하기
          console.log(gameResult);
          gameResultShowFN();
        } else {
          // 다음 게임
          gameShowFN();
        }
      });
    });
  }
  function gameResultShowFN() {
    switch (gameResult) {
      case "0000":
        // 단-한-무-화 = 미니 케이크 (앙금)
        break;
      case "0001":
        // 단-한-무-심 = 모듬 떡케이크0
        break;
      case "0010":
        // 단-한-색-화 = 미니 케이크 (앙금)
        break;
      case "0011":
        // 단-한-색-심 = 쌀 (빵) 케이크
        break;
      case "0100":
        // 단-여-무-화 = 미니 케이크 쌀 (빵)
        break;
      case "0101":
        // 단-여-무-심 = 모듬 떡 케이크
        break;
      case "0110":
        // 단-여-색-화 = 미니 케이크 쌀 (빵)
        break;
      case "0111":
        // 단-여-색-심 = 쌀 (빵) 케이크
        break;

      case "1000":
        // 개-한-무-화 = 기성품 (앙금)
        break;
      case "1001":
        // 개-한-무-심 = 쌀 (빵) 케이크
        break;
      case "1010":
        // 개-한-색-화 = 커스텀 케이크 (앙금)
        break;
      case "1011":
        // 개-한-색-심 = 쌀 (빵) 케이크
        break;
      case "1100":
        // 개-여-무-화 = 기성품 (앙금)
        break;
      case "1101":
        // 개-여-무-심 = 모듬 떡케이크
        break;
      case "1110":
        // 개-여-색-화 = 커스텀 케이크 (앙금)
        break;
      case "1111":
        // 개-여-색-심 = 쌀 (빵) 케이크
        break;
    }
  }
  // 게임 시작 클릭
  gameStartBt.click(function () {
    gameState = "게임시작";
    // 시작화면 사라지기
    gameStartDiv.hide();
    // 게임 화면 보여주기
    gameViewDiv.show();
    // 게임 진행
    gameShowFN();
  });
  // 다시 게임하기
  gameRestartBt.click(function () {
    // 레벨 처음부터
    gameLevel = 0;
    gameResult = "";
    // 결과창 숨기고
    gameLevelDivs.hide();
    gameResultDiv.hide();
    // 게임 진행 중인 화면
    gameViewDiv.show();
    // 게임시작
    gameShowFN();
  });
  // 결과창 닫기
  gamecloseBt.click(function () {
    gameResultDiv.hide();
    gameStartDiv.show();
  });
});
