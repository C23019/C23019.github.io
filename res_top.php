<?php
session_start();
session_regenerate_id(true);
?>

<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8" />
  <title>予約システム</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <h1 class="title">
    予約システム
    <span class="login-status">
      <?php
      if (isset($_SESSION['login']) == true) {
        print 'ログイン中：';
        print $_SESSION['user_name'];
      }
      ?>
    </span>
  </h1>
  <header>
    <nav class="nav">
      <ul class="menu-group">
        <li class="menu-item"><a href="res_form.php">予約登録</a></li>
        <li class="menu-item"><a href="res_change.php">予約変更</a></li>
        <li class="menu-item"><a href="res_view.php">予約確認</a></li>
        <?php
        if (isset($_SESSION['login']) && $_SESSION['login'] == true) {
          print '<li class="menu-item"><a href="../user_login/user_logout.php">ログアウト</a></li>';
        } else {
          print '<li class="menu-item"><a href="../user_login/user_login.html">ログイン</a></li>';
          print '<li class="menu-item"><a href="../user_add/user_add.html">新規登録</a></li>';
        }
        ?>
      </ul>
    </nav>
    <!-- ★画像イメージ -->
    <img src="biyouinn.jpg" alt="美容院のイメージ" class="banner-image">
  </header>
  <h2 style="text-align: center;">店舗情報</h2>

  <section class="service-container">
    <div class="services">
      <h2>サービス内容</h2>
      <ul>
        <li>カット: 4,000円</li>
        <li>カラー: 6,000円</li>
        <li>パーマ: 7,000円</li>
      </ul>
    </div>
    <div class="service-image">
      <img src="biyouinn2.jpg" alt="美容院のサービスイメージ">
    </div>
  </section>
  <section class="store-container">
    <div class="store-image">
      <img src="biyouinn3.jpg" alt="美容院の店舗イメージ">
    </div>
    <div class="store-info">
      <h2>アクセス</h2>
      <p>住所: 東京都〇〇区△△町1-2-3</p>
      <p>電話番号: 03-1234-5678</p>
      <p>営業時間: 0:00 - 0:00 (定休日:)</p>
    </div>
  </section>
  <p>アカウントをお持ちの方</p>
  <a href="res_form.php" class="btn-gradient-flat">ご予約はこちら</a>
  <p>初めてご利用の方</p>
  <a href="../user_add/user_add.html" class="btn-gradient-flat">新規登録</a>
  <footer>
    a
  </footer>
</body>

</html>