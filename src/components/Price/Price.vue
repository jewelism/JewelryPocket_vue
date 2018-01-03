<template>
  <div id="container">
    <h1>{{ title }}</h1>
    <table id="priceInfoTable">
      <thead>
        <th v-for="index in 6">
          {{tableHead[index-1]}}
        </th>
      </thead>
      <tbody v-if="loaded==true">
        <tr v-for="item in itemList">
          <td>{{item.symbol}}</td>
          <td>{{parseFloat(item.price_btc).toFixed(8)}}</td>
          <td>{{item.available_supply}} {{item.symbol}}</td>
          <td>$ {{parseFloat(item.price_usd).toFixed(1)}}</td>
          <td>$ {{parseFloat(item["24h_volume_usd"]).toFixed(0)}}</td>
          <td>{{parseFloat(item.percent_change_24h).toFixed(2)}} %</td>
        </tr>
      </tbody>
      <h2 v-else>
        로딩중...
      </h2>
    </table>
  </div>
</template>

<script>
import { getPriceInfo } from '../../actions'
export default {
  name: 'Price',
  data () {
    return {
      itemList: [],
      loaded: false,
    }
  },
  created () {
    this.title = '암호화폐 시세정보'
    this.tableHead = ['분류', '비율(BTC)', '순환공급량', 'Volume', '변화율', 'Price']
  },
  mounted : function () {
    getPriceInfo()
      .then((result)=>{
        this.itemList = result
        this.loaded = true
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#container {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-align-content: center;
  align-content: center;
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
