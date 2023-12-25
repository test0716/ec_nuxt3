<script lang="ts" setup>
import { ref } from "vue";

const itemData = 
{
  id: 1,
  url: "beef.jpg",
  sell: 10000,
  name: "神戸牛",
  explanation:"神戸のお肉です"
};


//画像メタデータ記録用変数
const imgUrl = ref("");

const amount = ref(1);

const message =ref<String | null>(null);

onMounted(() => {
  imgUrl.value=(
    new URL(`../../assets/images/${itemData.url}`, import.meta.url).href
  );
});

const addCart = (amount:number) =>{
  //APi呼び出しでカートに登録(バックエンド側ではUPSERTを実施)

  //メッセージを表示
  if(amount>0){
    showFlashMessage("商品をカートに追加しました。");
    return;
  }else{
    showFlashMessage("商品をカートに追加に失敗しました。");
  }
}

//フラッシュメッセージ部分は後に共通資材に変更する
const showFlashMessage = (contents:String) =>{
  message.value = contents;
  //3病後に3秒後にメッセージを非表示にする
  setTimeout(() => {
    message.value = null;
  }, 3000);
  return;
};

</script>

<template>
  <!--グリッドで幅を調整 min-vhで最小の高さを設定-->
  <div class="container-fluid min-vh-100">
    <div class="row px-3">
      <div class="col-sm-2 col-md-3 mt-3 mx-2">
      </div>
      <div class="col-sx-12 col-sm-8 col-md-6 mt-3 mb-3">
        <div class="row">
          <div class="col-12 mt-2 mb-3">
            <div v-if="message" class="alert alert-success alert-dismissible fade show col-sm-12 row mb-3 mt-3" role="alert">
              {{ message }}
            </div>
            <div class="col-sm-12 bg-white row">
              <div>
                <img
                  class="img-fluid mt-2"
                  v-on:click=""
                  :src="imgUrl"
                />
                <div class="w-100 text-wrap">
                  {{ itemData.name }}
                </div>
                <p class="text-lg-start font-weight-bold color-red float-right">
                  {{ itemData.sell}}円(税込み)
                </p>
              </div>
              <div class="row mb-3">
                <div class="col-8 d-flex">
                  <p class="mt-1">数量</p>
                  <input class="form-control form-control-sm mb-2 text-center input-size" type="number" v-model="amount" min="1"/>
                  <button class="btn btn-primary btn-sm mb-2" @click="addCart(amount)">カートに追加</button>
                </div>
              </div>
              <div class="row mb-3">
                <div>
                  <h5>商品説明</h5>
                  <p>{{itemData.explanation}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>     
      </div>
      <div class="col-sm-2 col-md-3 mt-3 mx-2">
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-size{
width: 70px;
}   
</style>