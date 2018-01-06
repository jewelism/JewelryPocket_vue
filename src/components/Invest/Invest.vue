<template>
  <div>
    <h1>{{ title }}</h1>
    <h4 v-if="message!=''">{{ message }}</h4>
    <!--<button @click="removeAll">투자리스트 모두삭제</button>-->
    <div v-if="currentPage=='base'">
      <button @click="currentPage='invest'">목록보기</button>
      <h2>첫 가상 투자를 위한 초기 설정</h2>
      <h5>여러 종류의 가상 투자를 할 수 있습니다. 구분 짓기 위한 이름이나 설명을 입력해주세요</h5>
      <div>
        <input v-model="description" placeholder="간단한 투자 설명">
      </div>
      <h5>투자하고싶은 금액을 원(₩)단위로 숫자만 입력해주세요.</h5>
      <div>
        <input v-model="wonInput" placeholder="투자하고싶은 금액(₩) 입력">
      </div>
      <div>
        <select v-model="coinType">
          <option disabled value="-1">코인 종류를 선택하세요</option>
          <option v-for="option in options" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div>
        <button @click="addToList" :disabled="validated">시작하기!</button>
      </div>
    </div>
    <div v-else-if="currentPage=='invest'" >
      <button @click="goToMakePage">새로운 투자 만들기</button>
      <table class="investTable">
        <thead>
          <th v-for="index in tableHead.length" class="investTd">
            {{ tableHead[index-1] }}
          </th>
        </thead>
        <tbody>
          <tr v-for="invest in investList" @click="onPressItem(invest)">
            <td class="investTd">{{ invest.description }}</td>
            <td class="investTd">₩ {{ invest.won }}</td>
            <td class="investTd">{{ options[invest.coinType].text }}</td>
            <td class="investTd">{{ invest.coinValue }}</td>
            <td class="investTd">{{ invest.date }}</td>
            <!--<td class="investTd">{{ invest.index }}</td>--> <!-- /// INDEX /// -->
          </tr>
        </tbody>
      </table>
    </div>
    <InvestDetail v-else-if="currentPage=='detail'" :detailObj="detailObj" :removeItem="removeItem" :setCurrentPage="setCurrentPage"/>
  </div>
</template>

<script>
import { getInvestList, addToInvestList, convertWonToCoin } from '../../actions'
import { COIN_LIST } from '../../constants'
import InvestDetail from './InvestDetail'

export default {
  name: 'Invest',
  components: {
    InvestDetail
  },
  data () {
    return {
      title: '가상투자',
      message: '',
      tableHead: ['투자 설명', '투자한 금액(₩)', '코인 타입', '보유한 코인', '날짜'],
      investList: [],
      currentPage: 'invest',
      description: '',
      wonInput: '',
      coinType: -1,
      options: COIN_LIST,
      coinValue: '',
      detailObj: null,
      error: false,
    }
  },
  computed: {
    validated() { //start, save button disabled
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
    setCurrentPage: function (page) { //need in detail view
      this.currentPage = page
    },
    goToMakePage: function () { //go to start page
      this.currentPage = 'base'
    },
    addToList: async function () { //start, save
      this.message = '요청 처리중 ...'
      let value = await convertWonToCoin(this.wonInput, this.coinType)
      let investObj = {
        description: this.description,
        won: this.wonInput,
        coinType: this.coinType,
        coinValue: value,
        date: new Date(),
      }
      let result = await addToInvestList(investObj)
        if (result) {
          this.investList.push(investObj)
          this.currentPage = 'invest'
          this.description =  ''
          this.wonInput =  ''
          this.coinType = -1
        } else
          alert('요청에 실패하였습니다.')
      this.message = ''
    },
    removeItem: async function (obj) { //remove in detail (remove 1 item)
      this.investList = this.investList.filter(function(el){
        return el.index != obj.index
      })
      localStorage.setItem('invest', JSON.stringify(this.investList))
      if (this.investList.length == 0)
        this.currentPage = 'base'
      else
        this.currentPage = 'invest'
    },
    removeAll: function () { //remove invest arr
      localStorage.removeItem('invest')
      this.investList = []
      this.currentPage = 'base'
    },
    onPressItem: function (invest) { //detail
      this.detailObj = invest
      this.currentPage = 'detail'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.investTable {
  border: 1px solid #72D4FF;
  border-collapse: collapse;
  margin-top: 20px;
  margin-Bottom: 20px;
}
.investTd{
  border: 1px solid #72D4FF;
  padding: 10px;
}

div {
  display:table;
  margin:15px auto;
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
