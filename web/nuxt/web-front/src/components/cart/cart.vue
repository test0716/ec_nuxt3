<script lang="ts" setup>
import { ref } from "vue";

const router = useRouter();

const itemData = ref([
  {
    id: 1,
    url: "beef.jpg",
    sell: 10000,
    amount: 1,
    name: "神戸牛",
  },
  {
    id: 2,
    url: "beef.jpg",
    sell: 12000,
    amount: 5,
    name: "アメリカの牛",
  },
  {
    id: 3,
    url: "beef.jpg",
    sell: 14000,
    amount: 3,
    name: "松坂牛",
  },
]);

const allSumValue = ref<number>(0);

//画像メタデータ記録用変数
const imgUrl = ref([""]);

//数量記録用変数 (数値型の配列)
//数量部分で差分の計算に使用(リアクティブの変数の場合変更値が計算前に更新がかかってしまうため差分が常に0になる)
const beforeAmount: Array<number> = [];

const message =ref<String | null>(null);

onMounted(() => {
  //支払い合計金額の算出(画面表示初回)
  itemData.value.forEach((data) => {
    allSumValue.value += data.amount * data.sell;
    imgUrl.value.push(
      new URL(`../../assets/images/${data.url}`, import.meta.url).href
    );
    beforeAmount.push(data.amount);
  });
});

//数量変更時に注文数と合計金額の更新
const accounting = (amount: number, index: number) => {
  //個数の差分を出す(元の個数－入力された個数)
  const diff = amount-beforeAmount[index];
  //合計金額を算出
  allSumValue.value +=itemData.value[index].sell*diff;
  //注文数を更新
  beforeAmount[index]=amount;
  return;
}

const deleteItem = (index: number) =>{
  if(itemData.value.length>1){
    accounting(0,index);
  }else{
    allSumValue.value=0;
  }
  itemData.value.splice(index, 1);

  showFlashMessage("カートから商品を削除しました。")
  return;
}

const showFlashMessage = (contents:String) =>{
  message.value = contents;
  //3病後に3秒後にメッセージを非表示にする
  setTimeout(() => {
    message.value = null;
  }, 3000);
  return;
};

//商品画像クリックで詳細画面に繊維
//後にIDを引き渡して制御
const detailRoute = () =>{
  router.push("/items/detailItem");
};



//増減を独自デザインで実装したい場合
/** 
const increment = (itemId: number,amount: number) =>{
  itemData.value[itemId].amount=amount+1;
  accounting(itemId,itemData.value[itemId].amount);
  return;
}

const decrement = (itemId: number,amount: number) =>{
  itemData.value[itemId].amount=amount-1;
  accounting(itemId,itemData.value[itemId].amount);
  return;
}
*/

</script>

<template>
  <!--グリッドで幅を調整 min-vhで最小の高さを設定-->
  <div class="container-fluid min-vh-100">
    <div class="row px-3">
      <div class=" col-2 mt-3 mx-2">
        <div class="row">
          <div class="col-12 bg-white d-none d-lg-block mt-2">
            <div class="my-3">
              <span class="font-weight-bold h6 pt-3">あなたにおすすめ(追加機能レコメンド機能実装時の領域)</span>
              <li>画像イメージをつける</li>
              <li>カート追加ボタン</li>
            </div>
          </div>
        </div>
      </div>
      <div class="col-sx-12 col-sm-8 mt-3 mb-3">
        <div v-if="message" class="alert alert-success alert-dismissible fade show col-sm-12 mt-2 row" role="alert">
            {{ message }}
          </div>
        <div class="row">
          <div
            v-for="(data, index) in itemData"
            :key="data.id"
            class="col-sx-12 col-sm-12 col-lg-6 mt-2 mb-3"
          >
            <div class="col-sm-12 bg-white row">
              <div>
                <img
                  class="img-fluid mt-2"
                  v-on:click="detailRoute()"
                  :src="imgUrl[index + 1]"
                />
                <div class="w-100 text-wrap">
                  {{ data.name }}
                </div>
                <p class="text-lg-start font-weight-bold color-red float-right">
                  {{ data.sell*data.amount }}円(税込み)
                </p>
              </div>
              <div class="row mb-3">
                <!--<button @click="decrement(data.id,data.amount)" :disabled="data.amount === 1">-1</button>-->
                <div class="col-9 d-flex">
                  <p class="mt-1">数量</p>
                  <input class="form-control form-control-sm mb-2 text-center input-size" type="number" v-model="itemData[index].amount" @input="() => accounting(itemData[index].amount, index)" min="1"/>
                </div>
                <!--<button @click="increment(data.id,data.amount)">+1</button>-->
                <div class="col-3 d-flex justify-content-end mb-2">
                  <button class="btn btn-danger btn-sm ml-2" @click="deleteItem(index)">削除</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-12 bg-white mt-2 mb-3 row" v-if="itemData.length>0">
          <div class="mt-2">
            小計 {{allSumValue}}(円)
          </div>
          <div>
            <button class="btn btn-primary btn-lg mb-3 mt-2" @click="">購入</button>
          </div>
        </div>        
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-size{
width: 70px;
}   
</style>