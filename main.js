class MSCell extends HTMLTableCellElement {

  constructor() {
    super();

    // 操作
    this.addEventListener("click", this.clickFunc);
    this.addEventListener("contextmenu", this.clickRightFunc);
    this.addEventListener("dblclick", this.clickDblFunc);
  }

  // マインスイーパ初期設定
  // x座業、y座標、爆弾かどうかをパラメータにとる
  init(x, y, bombFlg) {
    // 未開封のときfalse,開封済みのときtrue
    this.openedFlg = false;
    // x座標
    this.x = x;
    // y座標
    this.y = y;
    // 爆弾フラグ（爆弾のときtrue/爆弾でなければfalse）
    this.bombFlg = bombFlg;
    // 見た目のクラス
    this.classList.add("closed");
  }

  // 周辺セル設定
  setArounds(arounds) {
    // 周辺セル
    this.arounds = arounds;
    // 周辺セルの爆弾数
    this.aroundBombCount = this.arounds.filter(
      (around) => around.bombFlg
    ).length;
  }

  // セルの中身を表示
  show() {
    if (this.bombFlg) {
      // 爆弾のときは「💣」
      this.textContent = "💣";

      // 見た目変更
      this.classList.remove("closed");
      this.classList.add("bombed");
    } else {
      // 爆弾ではないとき
      if (this.aroundBombCount > 0) {
        // 周辺の爆弾数が1個以上のときは数を表示
        this.textContent = this.aroundBombCount;
      }

      // 見た目変更
      this.classList.remove("closed");
      this.classList.add("opened");
    }
  }

  // セルを左クリック
  clickFunc() {
    if (this.openedFlg) {
      // 開封済みの場合何もしない
      return;
    }

    if (this.textContent === "🚩" || this.textContent === "？") {
      // 「🚩」や「？」がついてる場合も何もしない
      return;
    }

    // 開封済みにする
    this.openedFlg = true;

    // このセルを開く
    this.show();



// クリア判定関数
function checkClear() {
  let closedCells = msCells.filter((cell) => cell.classList.contains("closed"));
  if (closedCells.length === 0 || closedCells.every((cell) => cell.bombFlg)) {
    // 処理
    alert("ゲームクリア！");
    
    // クリア後マスを操作不能ににする
    msCells.forEach((cell) => {
      if (cell.classList.contains("closed")) {
        cell.removeEventListener("click", cell.clickFunc);
        cell.removeEventListener("contextmenu", cell.clickRightFunc);
        cell.removeEventListener("dblclick", cell.clickDblFunc);
      }
    });

  }
}
// クリア
    if (!this.bombFlg) {
      checkClear();
    }
    
    if (this.bombFlg) {
      // このセルが爆弾の場合はゲームオーバーなので全セル開封
      msCells.forEach((button) => button.show());
    } else {
      // 爆弾でないとき
      if (this.aroundBombCount === 0) {
        // 周囲に爆弾が無いときは周囲のセルを全開封
        this.arounds.forEach((around) => around.clickFunc());
      }
    }
  }

  // セルを右クリック
  clickRightFunc(e) {
    // 右クリックメニュー禁止
    e.preventDefault();

    if (this.openedFlg) {
      // 既に開かれている場合何もしない
      return;
    }

    if (this.textContent === "") {
      // 旗を表示
      this.textContent = "🚩";
    } else if (this.textContent === "🚩") {
      // ？を表示
      this.textContent = "？";
    } else if (this.textContent === "？") {
      // 元に戻す
      this.textContent = "";
    }
  }

  // セルをダブルクリック
  clickDblFunc() {
    if (!this.openedFlg) {
      // 既に開かれている場合何もしない
      return;
    }

    // 周囲の旗の数を取得
    let flgCount = this.arounds.filter(
      (around) => around.textContent === "🚩"
    ).length;

    // 周囲の旗の数と、クリックしたセルに表示されている爆弾数が一致している場合は周囲のセルを全開封
    if (this.aroundBombCount === flgCount) {
      this.arounds.forEach((around) => around.clickFunc());
    }
  }
}

// カスタム要素の定義
customElements.define("ms-td", MSCell, { extends: "td" });

// 全セルを格納する変数
let msCells = [];

// ゲーム初期化用関数
let initGame = function (xSize, ySize) {

  // ボタン配置
  for (let y = 0; y < ySize; y++) {
    let tr = document.createElement("tr");
    for (let x = 0; x < xSize; x++) {
      // セルを作る
      let msCell = document.createElement("td", { is: "ms-td" });
      // セルの初期化
      msCell.init(x, y, Math.random() * 100 < 10);
      // セルをtr,msCellsに格納
      tr.appendChild(msCell);
      msCells.push(msCell);
    }
    document.getElementById("target").appendChild(tr);
  }

  // aroundsの設定
  msCells.forEach((msCell) => {
    // 周囲8マスを取得
    let arounds = msCells.filter((otherCell) => {
      if (msCell === otherCell) {
        return false;
      }

      let xArea = [msCell.x - 1, msCell.x, msCell.x + 1];
      let yArea = [msCell.y - 1, msCell.y, msCell.y + 1];

      if (xArea.indexOf(otherCell.x) >= 0) {
        if (yArea.indexOf(otherCell.y) >= 0) {
          return true;
        }
      }
      return false;
    });

    // 周囲8マスをaroundsとして設定
    msCell.setArounds(arounds);
  });
};

// ゲーム初期化
let xSize = localStorage.getItem('xSize') || 15;
let ySize = localStorage.getItem('ySize') || 15;
initGame(xSize, ySize);

// リセットボタン要素を取得
const defaultbutton = document.getElementById('defaultbutton');

// ボタンクリック時の処理を定義
defaultbutton.addEventListener('click', function() {
  localStorage.setItem('xSize', 15);
  localStorage.setItem('ySize', 15);
  window.location.reload();
});

// 増加ボタン要素を取得
const zoukabutton = document.getElementById('zoukabutton');

// ボタンクリック時の処理を定義
zoukabutton.addEventListener('click', function() {
  // initGameの引数を+1ずつ増やす
  xSize++;
  ySize++;
  localStorage.setItem('xSize', xSize);
  localStorage.setItem('ySize', ySize);
  // ページを再読み込み
  window.location.reload();
});

// 減少ボタン要素を取得
const gensyoubutton = document.getElementById('gensyoubutton');

// ボタンクリック時の処理を定義
gensyoubutton.addEventListener('click', function() {
  // initGameの引数を-1ずつ減らす
  xSize--;
  ySize--;
  localStorage.setItem('xSize', xSize);
  localStorage.setItem('ySize', ySize);
  // ページを再読み込み
  window.location.reload();
});
