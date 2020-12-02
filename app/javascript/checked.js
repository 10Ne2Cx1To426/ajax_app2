function check() {

  //HTML上のpostセレクタを取得
  const posts = document.querySelectorAll(".post");

  //取得したpostsプロパティに関数を設定
  posts.forEach(function (post){
    //setIntervalを設定したが、ずっと自動更新されまくると困るのでその対策
    //クリックしたまさにその瞬間はまだdata-load = "true"が追加されてない→data-loadに"true"が追加される
    //２回目の時はすでにtrueが追加されているのでif文が読み込まれて処理がストップする
    if (post.getAttribute("data-load") != null) {
      return null;
    }
    post.setAttribute("data-load", "true");
    //postがクリックされた時に発生させるイベントを作る
    post.addEventListener("click", () => {

      //getAttributeは属性値を取得できる、メモのidを取得
      const postId = post.getAttribute("data-id");
      
      //エンドポイントを呼び出してHTTPリクエストを行う
      //まずオブジェクトを生成する
      const XHR = new XMLHttpRequest();

      //openメソッドでリクエストの内容を指定する
      //XHR.open("HTTPメソッドの指定", "パスの指定", "非同期通信のon/off")
      XHR.open("GET", `/posts/${postId}`, true);

      //次はレスポンスで欲しい情報を指定する。
      //responseTypeを使ってデータの形式を指定する。
      XHR.responseType = "json";

      //以上で設定した情報を全部サーバーに送る
      XHR.send();

      //onloadはレスポンスなどの受信が成功した時に呼び出されるイベントハンドラー
      XHR.onload = () => {
        if (XHR.status != 200) {
          alert(`Error ${XHR.status}: ${XHR.statusText}`);
          return null;
        }
        //まずXHR.responseでレスポンスされたjsonにアクセスする
        //checkedアクションでitemが返却され、XHR.response.postで取得できる
        const item = XHR.response.post;
        if(item.checked === true) {
          //既読ならdata-checkの属性値をtrueに
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          //未読なら属性値ごと削除
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
//1秒間の間にtrueを付与する処理とfalseを付与する処理が連続で行われる
setInterval(check, 1000);