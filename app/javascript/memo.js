function memo() {
  const submit = document.getElementById("submit");

  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData)
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      //レスポンスとして返されたメモのレコードデータを取得
      const item = XHR.response.post;
      //HTMLを描画する場所を指定するための親要素
      const list = document.getElementById("list");
      //メモの入力フォームをリセットする
      const formText = document.getElementById("content");
      //メモとして描画する部分のHTMLを定義
      const HTML = `
      <div class="post" data-id=${item.id}> 
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
      ${item.content}
      </div>
    </div>`;
    //listという要素に対してHTMLを追加する　afterendは要素の直後
    list.insertAdjacentHTML("afterend", HTML);
    //メモの入力内容がリセットされる
    formText.value = "";
    };
    //クリックで標準装備されている「クッリクでURL遷移」を阻止する
    e.preventDefault();
  });
}
window.addEventListener("load", memo);