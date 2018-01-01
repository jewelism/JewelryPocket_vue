<template>
  <div>
    <h2 v-if="loading==true">로딩중...</h2>
    <h1>{{ title }}</h1>
    <input v-model="inputVal" placeholder="여기에 입력하세요! ex)0.001">
    <select v-model="currentType">
      <option disabled value="-1">코인 종류를 선택하세요</option>
      <option v-for="option in options" v-bind:value="option.value">
        {{ option.text }}
      </option>
    </select>
    <button @click="convert(inputVal)">모의환전</button>
    <h5>{{result}}원</h5>
  </div>
</template>

<script>
export default {
  name: 'Convert',
  data () {
    return {
      title: '모의환전',
      options: [
        { text: 'BTC - 비트코인', value: 0 },
        { text: 'ETH - 이더리움', value: 1 },
        { text: 'ETC - 이더리움 클래식', value: 2 },
        { text: 'XRP - 리플', value: 3 },
        { text: 'LTC - 라이트코인', value: 4 },
        { text: 'DASH - 대시', value: 5 },
      ],
      currentType: -1,
      inputVal: '',
      krCoinValues: [0,0,0,0,0,0],
      result: 0,
      loading: false,
    }
  },
  methods: {
    convert : function () {
      if (this.inputVal == "") {
        alert("값을 입력하세요!")
        return false
      } else if (this.currentType == -1) {
        alert("코인종류를 선택하세요!")
        return false
      }
      var result = parseFloat(this.krCoinValues[this.currentType]) * parseFloat(this.inputVal)
      this.result = result.toFixed(0).toString()
    }
  },
  mounted : function () {
    this.loading = true
    fetch("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,ETC,XRP,LTC,DASH&tsyms=BTC,KRW,BTC,USD")
      .then((response) => response.json())
      .then((responseJson) => {
        var arr = []
        arr.push(responseJson.RAW.BTC.KRW.PRICE)
        arr.push(responseJson.RAW.ETH.KRW.PRICE)
        arr.push(responseJson.RAW.ETC.KRW.PRICE)
        arr.push(responseJson.RAW.XRP.KRW.PRICE)
        arr.push(responseJson.RAW.LTC.KRW.PRICE)
        arr.push(responseJson.RAW.DASH.KRW.PRICE)
        this.krCoinValues = arr
        console.log(this.krCoinValues)
      })
      .catch((error) => {
        console.error(error);
      })
      .then(()=>{
        this.loading = false
      })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
