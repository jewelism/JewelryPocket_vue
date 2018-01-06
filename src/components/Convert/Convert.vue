<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-if="krCoinValues.length!=0">
      <div class="uiWrapper">
        <input v-model="inputVal" placeholder="여기에 입력하세요! ex)0.001">
      </div>
      <div class="uiWrapper">
        <select v-model="currentType">
          <option disabled value="-1">코인 종류를 선택하세요</option>
          <option v-for="option in options" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="uiWrapper">
        <button @click="convert">확인</button>
      </div>
      <div class="uiWrapper">
        <h5>{{result}}</h5>
      </div>
    </div>
    <div v-else-if="loaded">
      <h5>API 오류로 데이터를 가져올 수 없습니다.</h5>
    </div>
    <h2 v-if="!loaded">로딩중...</h2>
  </div>
</template>

<script>
import { convertAPI } from '../../actions'
import { COIN_LIST } from '../../constants'

export default {
  name: 'Convert',
  data () {
    return {
      title: '모의환전',
      options: COIN_LIST,
      currentType: -1,
      inputVal: '',
      krCoinValues: [],
      result: '',
      loaded: false,
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
      } else if (!this.loaded) {
        alert("초기데이터를 로딩중입니다.\n잠시만 기다려주세요")
        return false
      }
      var result = parseFloat(this.krCoinValues[this.currentType]) * parseFloat(this.inputVal)
      this.result = `${result.toFixed(2).toString()} 원`
    }
  },
  mounted : async function () {
    let result = await convertAPI()
    if(result){
      this.krCoinValues = result
    } else { //error
      this.result = result
    }
    this.loaded = true
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.uiWrapper {
  margin-bottom: 20px;
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
