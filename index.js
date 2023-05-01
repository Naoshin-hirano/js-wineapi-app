// API通信でのJSONデータ取得
const getData = async (value) => {
    const resp = await fetch(`https://api.sampleapis.com/wines/${value}`);
    if (!resp.ok) {
        throw new Error("サーバーエラー");
    }
    const json = await resp.json();
    return json;
};

// APIレスポンスデータをHTMLへ反映
const handleListData = async (value) => {
    showLoading();
    try {
        const res = await getData(value);
        const element = convertToHTML(res);
        document.querySelector("#list").innerHTML = element;
        hideLoading();
    } catch (err) {
        hideLoading();
        console.error("通信に失敗しました", err);
    }
};

const radio_btns = document.querySelectorAll(`input[type='radio'][name='q1']`);

// 初期表示時の処理
window.addEventListener("load", () => {
    handleListData(radio_btns[0].value);
});

// チェックボタン変更時の処理
for (let target of radio_btns) {
    target.addEventListener("change", () => {
        handleListData(target.value);
    });
}

// 取得した一覧データをHTMLに変換
const convertToHTML = (data) => {
    let wineList;
    for (let i = 0; i < 5; i++) {
        wineList += "<dl>";
        wineList += `<dt>ID</dt>`;
        wineList += `<dd>${data[i].id}`;
        wineList += `<dt>名前</dt>`;
        wineList += `<dd>${data[i].wine}`;
        wineList += `<dt>ワイナリー</dt>`;
        wineList += `<dd>${data[i].winery}<dd>`;
        wineList += `<dt>住所</dt>`;
        wineList += `<dd>${data[i].location}</dd>`;
        wineList += `<dt>星の数</dt>`;
        wineList += `<dd>${data[i].rating.average}</dd>`;
        wineList += `<dt>評価した人数</dt>`;
        wineList += `<dd>${data[i].rating.reviews}人</dd>`;
        wineList += `<dt>画像</dt>`;
        wineList += `<dd>${data[i].image}</dd>`;
        wineList += "</dl>";
    }
    return wineList;
};

// ローディング表示
const showLoading = () => {
    document.querySelector("#loading").classList.remove("is-hide");
};
// ローディング非表示
const hideLoading = () => {
    document.querySelector("#loading").classList.add("is-hide");
};
