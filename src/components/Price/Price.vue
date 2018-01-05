<template>
  <div id="container">
    <h1>{{ title }}</h1>
    <table v-if="loaded && itemList.length!=0" id="priceInfoTable">
      <thead>
        <th v-for="index in 6">
          {{tableHead[index-1]}}
        </th>
      </thead>
      <tbody>
        <tr v-for="item in itemList">
          <td>{{item.symbol}}</td>
          <td>$ {{parseFloat(item.price_usd).toFixed(1)}}</td>
          <td>{{parseFloat(item.price_btc).toFixed(8)}}</td>
          <td>{{item.available_supply}} {{item.symbol}}</td>
          <td>$ {{parseFloat(item["24h_volume_usd"]).toFixed(0)}}</td>
          <td>{{parseFloat(item.percent_change_24h).toFixed(2)}} %</td>
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
