const 정답 = "APPLE";
let attempts = 0;
let index = 0;
let timer;

function appStart() {
  const displayGameOver = () => {
    const _div = document.createElement("div");
    _div.innerText = "게임이 종료됐습니다.";
    _div.style =
      "display:flex; justfy-content:center; align-items: center; position:absolute; top:40vh; left:45vw; background-color:white;";
    document.body.appendChild(_div);
  };

  const nextLine = () => {
    if (attempts == 5) return gameOver();

    attempts += 1;
    index = 0;
  };

  const startTimer = () => {
    const 시작_시간 = new Date();
    const setTime = () => {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeH1 = document.querySelector("#timer");
      timeH1.innerText = `${분}:${초}`;
    };

    timer = setInterval(setTime, 1000);
  };

  const gameOver = () => {
    window.removeEventListener("keydown", handleKyeDown);
    displayGameOver();
    clearInterval(timer);
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );

      preBlock.innerText = "";
    }

    if (index !== 0) index -= 1;
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;

    for (let i = 0; i < 5; i++) {
      const _block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      const 입력한_글자 = _block.innerText;
      const 정답_글자 = 정답[i];

      if (입력한_글자 === 정답_글자) {
        맞은_갯수 += 1;
        _block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) {
        _block.style.background = "#C9B458";
      } else _block.style.background = "#787C7E";

      _block.style.color = "white";
    }

    if (맞은_갯수 === 5) gameOver();

    nextLine();
  };

  const handleKyeDown = (event) => {
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  startTimer();

  window.addEventListener("keydown", handleKyeDown);
}

appStart();
