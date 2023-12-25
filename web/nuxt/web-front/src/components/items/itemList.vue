<script setup lang="ts">
import { ref } from "vue";
const runtimeConfig = useRuntimeConfig();
const keyWord = ref<String>("");
const category = ref<String>("");
const imgUrl = ref([""]);

//動的に画像を表示させるときはonMounted内に書くかつリアクティブな変数にURLを格納する
//サーバーサイドでのレンダリングでは import.meta.url が異なるため onMounted() 等で対応するしかなさそう
onMounted(() => {
  // 絶対パスにすると cの後ろからの記載になるので注意
  //pathの変数以外の部分はenvから取得
  itemData.forEach(function (data) {
    imgUrl.value.push(
      new URL(`../../assets/images/${data.url}`, import.meta.url).href
    );
  });
});

//~/assets/images/beef.jpg
//urlはディレクトリ階層とファイル名を想定  /eat/apple.jpgなど
const itemData = [
  {
    id: 1,
    url: "beef.jpg",
    sell: 10000,
    askingPrce: 27000,
    name: "神戸牛",
  },
  {
    id: 2,
    url: "beef.jpg",
    sell: 12000,
    askingPrce: 27000,
    name: "アメリカの牛",
  },
  {
    id: 3,
    url: "beef.jpg",
    sell: 14000,
    askingPrce: 37000,
    name: "松坂牛",
  },
];

const categoryData = ["食品", "電化製品", "ゲーム", "化粧品", "衣料品"];

const subCategory = ["ファンデーション", "オイル", "化粧水", "口紅"];

//　現在ページ　表示ページの数値．maxのページ数を記載
const pages = { now: 3, max: 15, roop: 3 };

//前ページの表示部分の計算と次のページ以降の表示部分の算出
const pagesCalculation = (now: number, max: number) => {
  //現在ページが5以上の時
  if (now > 5) {
    //現在のページから4ページ前が開始番号となる
    //現在ページが5以上の時はループ回数5(現在ページが5ループ目となる)
    const startPage = now - 4; //開始番号
    const beforeRoop = 5;

    //現在ページ以降のループ数を算出
    const endPage = max - now;
    if (endPage <= 5) {
      const afterRoop = endPage;
    } else {
      const afterRoop = 5;
    }
  } else {
    //現在のページが4以下の場合
    const startPage = 1;
    //前回ページのループ回数を算出
    const beforeRoop = now;

    const endPage = max - now;
    if (max - 10 - now < 0) {
      //ループ可能回数より最高ページ数が少ない場合
      const afterRoop = max - now;
    } else {
      //10はページング表示上限数(10ページ分まで数値を表示) utilsで上限数を管理する変数を作製するのでマジックナンバーは対応後削除
      const afterRoop = 10 - now;
    }
  }
};

const beforePage = pages.now;

const itemSelect = (itemId: number) => {
  navigateTo({
    path: "/items/detailItem",
    query: {
      id: itemId,
    },
  });
};

const itemSearch = () => {
  console.log("ボタン起動");
};

//初期呼び出し時にcreated

//画面を終了するときにunmounted
</script>

<template>
  <!--グリッドで幅を調整-->
  <div class="container-fluid">
    <div class="row px-3">
      <div class="col-2 d-none d-sm-block mt-3 mx-2">
        <div class="row">
          <div class="col-12 bg-white d-none d-lg-block">
            <div class="border-top border-bottom my-3" v-if="subCategory">
              <span class="font-weight-bold h6 pt-3">サブカテゴリー</span>
              <li v-for="data in subCategory">{{ data }}</li>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sx-12 col-sm-8 mt-3 mb-3">
        <div class="row me-lg-2 me-sm-2">
          <div class="col-12 d-sm-block bg-white">
            <div class="d-flex justify-content-center">
              <select class="search mt-3 mb-3" v-model="category">
                <option value="" selected>すべて</option>
                <option
                  v-bind:value="categoryName"
                  v-for="categoryName in categoryData"
                >
                  {{ categoryName }}
                </option>
              </select>
              <input
                v-model="keyWord"
                class="search mt-3 mb-3"
                placeholder="キーワードを入力"
              />
              <button
                class="searchButton mt-3 mb-3"
                v-bind:disabled="!keyWord"
                v-on:click="itemSearch"
              >
                検索
              </button>
            </div>
          </div>
        </div>
        <div class="row">
          <div
            v-for="(data, index) in itemData"
            :key="data.id"
            class="col-sx-12 col-sm-6 mt-3 mb-3"
          >
            <div class="col-sm-12 bg-white row">
              <div class="border border-1">
                <img
                  class="img-fluid mt-2"
                  v-on:click="itemSelect(data.id)"
                  :src="imgUrl[index + 1]"
                />
                <div class="w-100 text-wrap">
                  {{ data.name }}
                </div>

                <p class="text-lg-start font-weight-bold color-red float-right">
                  {{ data.sell }}円(税込み)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="row me-lg-2 me-sm-2">
          <div class="col-12 d-sm-block bg-white">
            <div class="d-flex justify-content-center">
              <nav class="mt-3">
                <ul class="pagination justify-content-end">
                  <li class="page-item disabled">
                    <a
                      class="page-link"
                      href="#"
                      tabindex="-1"
                      aria-disabled="true"
                      >Previous</a
                    >
                  </li>
                  <li class="page-item" v-if="pages.now > 1">
                    <a class="page-link" href="#">{{ pages.now - 1 }}</a>
                  </li>
                  <li class="page-item" v-for="page in pages.roop">
                    <a class="page-link" href="#" v-if="pages.now == 1">{{
                      page
                    }}</a>
                    <a class="page-link" href="#" v-else>{{
                      pages.now + page - 1
                    }}</a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2 d-none d-sm-block"></div>
    </div>
  </div>
</template>

<style scoped>
@import "assets/css/search.css";
</style>
