<template>
  <div>
    <h5>{{ message }}</h5>
    <h2 v-if="error">API 오류로 암호화폐정보를 가져올수 없습니다!</h2>
    <button @click="setCurrentPage('invest')">목록보기</button>
    <button @click="removeItem(detailObj)">투자 삭제</button>
    <h6>{{ detailObj.description }} / {{ detailObj.won }}원 / {{ coinValue }} {{ options[detailObj.coinType].text }} / {{ detailObj.date }}</h6>
    수익결과
    <h6>{{revenueWon}}원</h6>
    수익률
    <h6>{{percentage}}%</h6>
  </div>
</template>

<script>
import { convertWonToCoin, convertCoinToWon } from '../../actions'
import { COIN_LIST } from '../../constants'

export default {
  name: 'InvestDetail',
  props: ['detailObj','removeItem','setCurrentPage'],
  data () {
    return {
      revenueWon: '',
      error: false,
      message: '',
      coinValue: '',
      options: COIN_LIST,
      percentage: 0,
    }
  },
  methods: {
    
  },
  mounted : async function () {
    this.message = '데이터를 불러오는중 ...'
    let result = await convertWonToCoin(this.detailObj.won, this.detailObj.coinType)
    if(result){
      this.coinValue = result
      // console.log(result)
    } else { //error
      this.error = true
    }
    let coin = this.detailObj.coinValue - this.coinValue
    this.revenueWon = await convertCoinToWon(coin, this.detailObj.coinType)
    this.percentage = (this.revenueWon / this.detailObj.won).toFixed(5) * 100
    this.message = ''
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
