<template>
  <div>
    <h1>{{ title }}</h1>
    <button @click="removeAll">투자리스트 모두삭제</button>
    <div v-if="currentPage=='base'">
      <h2>첫 가상 투자를 위한 초기 설정</h2>
      <h5>여러 종류의 가상 투자를 할 수 있습니다. 구분 짓기 위한 이름이나 설명을 입력해주세요</h5>
      <div :style="styles.uiWrapper">
        <input v-model="description" placeholder="간단한 투자 설명" :style="styles.wonInput">
      </div>
      <h5>투자하고싶은 금액을 원(₩)단위로 숫자만 입력해주세요.</h5>
      <div :style="styles.uiWrapper">
        <input v-model="wonInput" placeholder="투자하고싶은 금액(₩) 입력" :style="styles.wonInput">
      </div>
      <div :style="styles.uiWrapper">
        <select v-model="coinType" :style="styles.select">
          <option disabled value="-1">코인 종류를 선택하세요</option>
          <option v-for="option in options" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div :style="styles.uiWrapper">
        <button @click="addToList" :disabled="validated">시작하기!</button>
      </div>
    </div>
    <div v-else-if="currentPage=='invest'" :style="styles.uiWrapper">
      <button @click="goToMakePage">새로운 투자 만들기</button>
      
      <table>
        <thead>
          <th v-for="index in 3">
            {{tableHead[index-1]}}
          </th>
        </thead>
        <tbody>
          <tr v-for="invest in investList" @click="onPressItem(invest)">
            <td>{{invest.description}}</td>
            <td>₩ {{invest.won}}</td>
            <td>{{options[invest.coinType].text}}</td>
            <td>{{invest.index}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="currentPage=='detail'">
      <h2 v-if="error">API 오류로 암호화폐정보를 가져올수 없습니다!</h2>
      <button @click="removeItem(detailObj)">Delete this investing</button>
      <h6>{{detailObj.description}} / {{detailObj.won}}원 / {{coinValue}} {{options[detailObj.coinType].text}}</h6>
    </div>
  </div>
</template>

<script>
import { getInvestList, addToInvestList, convertWonToCoin } from '../../actions'
import { COIN_LIST } from '../../constants'

const WIDTH = '200px'
const HEIGHT = '20px'

export default {
  name: 'Invest',
  data () {
    return {
      title: '가상투자',
      tableHead: ['투자 설명', '투자한 금액(₩)', '코인 타입'],
      investList: [],
      currentPage: 'invest',
      description: '',
      wonInput: '',
      coinType: -1,
      options: COIN_LIST,
      coinValue: '',
      detailObj: null,
      error: false,
      styles: {
        uiWrapper: {
          'margin-bottom': '10px',
        },
        wonInput: {
          'width': WIDTH,
          'height': HEIGHT,
          'border-radius': '5px',
          'font-size': '15px',
          'text-align': 'center',
        },
        select: {
          'width': WIDTH,
        },
      }
    }
  },
  computed: {
    validated() {
      return !(this.description!=0 && this.wonInput != '' && this.coinType != -1)
    }
  },
  mounted () {
    getInvestList()
      .then((result) => {
        if (result) {
          if (result.length == 0)
            this.currentPage = 'base'
          else
            this.currentPage = 'invest'
          this.investList = result
        } else {
          alert('뭔가 잘못됐네요.\n데이터를 불러올수가 없어요!')
        }
      })
  },
  methods: {
    goToMakePage: function () {
      this.currentPage = 'base'
    },
    addToList: function () {
      let investObj = {
        description: this.description,
        won: this.wonInput,
        coinType: this.coinType
      }
      addToInvestList(investObj)
        .then((result) => {
          if(result){
            this.investList.push(investObj)
            this.currentPage = 'invest'
            this.description =  ''
            this.wonInput =  ''
            this.coinType = -1
          }
          else
            alert('요청에 실패하였습니다.')
        })
    },
    removeItem: async function (obj) {
      this.investList.splice(obj.index, 1)
      localStorage.setItem('invest', JSON.stringify(this.investList))
      if (this.investList.length == 0)
        this.currentPage = 'base'
      else
        this.currentPage = 'invest'
    },
    removeAll: function () {
      localStorage.removeItem('invest')
      this.investList = []
      this.currentPage = 'base'
    },
    onPressItem: async function (invest) {
      alert('데이터를 불러오는중...')
      let result = await convertWonToCoin(invest.won, invest.coinType)
      if(result){
        this.coinValue = result
        this.currentPage = 'detail'
        this.detailObj = invest
        // console.log(result)
      } else { //error
        this.error = true
      }
    }
  }
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
