<template>
  <div>
    <h1>{{ title }}</h1>
    <div v-if="currentPage=='wallet'"> <!--wallet page-->
      <button @click="navToCreateWalletPage">지갑생성</button><br/>
      <button @click="removeAllWallet">지갑모두제거</button><br/>
      <table v-if="walletList.length!=0" class="table">
        <thead>
          <th v-for="index in 4" class="tableTd" :style="{ backgroundColor: 'rgba(114, 212, 255, 0.1)' }">
            {{TABLE_HEAD[index-1]}}
          </th>
        </thead>
        <tbody>
          <tr v-for="item in walletList">
            <td class="tableTd">{{options[item.type].text}}</td>
            <td class="tableTd">{{item.name}}</td>
            <td class="tableTd">{{item.addr}}</td>
            <td class="tableTd">{{item.balance}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="currentPage=='create'">
      <div>
        <input type="text" v-model="walletNameInput" placeholder="지갑이름을 입력하세요"/>
      </div>
      <div>
        <input type="text" v-model="walletAddrInput" placeholder="지갑주소를 입력하세요"/>
      </div>
      <div>
        <select v-model="walletTypeInput">
          <option disabled value="-1">코인 종류를 선택하세요</option>
          <option v-for="option in options" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <button @click="onClickCreateWallet">생성</button>
    </div>
  </div>
</template>

<script>
import { COIN_LIST } from '../../constants'
import { BTCBalance, ETHBalance, ETCBalance, XRPBalance, LTCBalance, DASHBalance } from '../../actions'

export default {
  name: 'Wallet',
  data () {
    return {
      title: '내 지갑',
      currentPage: 'wallet',
      walletList: [],
      TABLE_HEAD: ['분류', '지갑이름', '지갑주소', '잔액'],
      walletNameInput: '',
      walletAddrInput: '',
      options: COIN_LIST,
      walletTypeInput: -1,
    }
  },
  mounted () {
    let walletList = JSON.parse(localStorage.getItem('wallet'))
    if (!walletList)
      walletList = []
    this.walletList = walletList
    
    this.walletList.forEach(async (wallet) => { //get wallet addr balance
      wallet.balance = await this.getBalance(wallet)
    })
  },
  methods : {
    getBalance : async function (wallet) {
      let balance = '조회불가'
      if (wallet.type == 0) { //BTC
        balance = await BTCBalance(wallet.addr)
      } else if (wallet.type == 1) { //ETH
        balance = await ETHBalance(wallet.addr)
      } else if (wallet.type == 2) { //ETC
        balance = await ETCBalance(wallet.addr)
      } else if (wallet.type == 3) { //XRP
        balance = await XRPBalance(wallet.addr)
      } else if (wallet.type == 4) { //LTC
        balance = await LTCBalance(wallet.addr)
      } else if (wallet.type == 5) { //DASH
        balance = await DASHBalance(wallet.addr)
      }
      return balance
    },
    navToCreateWalletPage : function () {
      this.title = '지갑 생성',
      this.currentPage = 'create'
    },
    onClickCreateWallet : async function () {
      let wallet = {
        name: this.walletNameInput,
        addr: this.walletAddrInput,
        type: this.walletTypeInput,
        balance: '불러오는중...'
      }
      wallet.balance = await this.getBalance(wallet)
      let walletList = this.walletList
      walletList.push(wallet)
      this.walletList = walletList
      localStorage.setItem('wallet', JSON.stringify(walletList))
      this.title = '내 지갑'
      this.currentPage = 'wallet'
    },
    removeAllWallet : function () {
      localStorage.removeItem('wallet')
      this.walletList = []
    }
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
