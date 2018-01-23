<template>
  <div id="container">
    <h1>{{ title }}</h1>
    <h5>가장 인기있는 암호화폐 6개의 정보</h5>
    <table v-if="loaded && itemList.length!=0" class="table">
      <thead>
        <th v-for="index in 6" class="tableTd">
          {{tableHead[index-1]}}
        </th>
      </thead>
      <tbody>
        <tr v-for="item in itemList">
          <td class="tableTd">{{item.symbol}}</td>
          <td class="tableTd">$ {{parseFloat(item.price_usd).toFixed(1)}}</td>
          <td class="tableTd">{{parseFloat(item.price_btc).toFixed(8)}}</td>
          <td class="tableTd">{{item.available_supply}} {{item.symbol}}</td>
          <td class="tableTd">$ {{parseFloat(item["24h_volume_usd"]).toFixed(0)}}</td>
          <td class="tableTd">{{parseFloat(item.percent_change_24h).toFixed(2)}} %</td>
        </tr>
      </tbody>
    </table>
    <h2 v-else-if="itemList.length==0 && !error">
      로딩중...
    </h2>
    <h2 v-if="error">
      API 오류로 데이터를 가져올 수 없습니다.
    </h2>
  </div>
</template>

<script>
import { getCoinmarketcap6API } from '../../actions'
export default {
  name: 'Price',
  data () {
    return {
      itemList: [],
      loaded: false,
      error: false,
    }
  },
  created () {
    this.title = '암호화폐 시세정보'
    this.tableHead = ['분류', 'Price', '비율(BTC)', '순환공급량', 'Volume', '변화율']
  },
  mounted : async function () {
    let result = await getCoinmarketcap6API()
    console.log(result)
    if(result){
      this.itemList = result
    } else { //error
      this.error = true
    }
    this.loaded = true
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table {
  border: 1px solid #72D4FF;
  border-collapse: collapse;
  margin-top: 20px;
  margin-bottom: 20px;
}
.tableTd{
  border: 1px solid #72D4FF;
  padding: 10px;
}

#container {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-align-content: center;
  align-content: center;
}

div {
  display:table;
  margin:0 auto;
}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
