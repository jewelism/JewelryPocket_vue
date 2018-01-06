<template>
  <div>
    <div id="app">
      
      <Wallet v-if="currentMenu=='wallet'"/>
      <Invest v-else-if="currentMenu=='invest'"/>
      <Convert v-else-if="currentMenu=='convert'"/>
      <More v-else-if="currentMenu=='more'" :onPress="onPressMenuItem"/>
      <ExchangeLink v-else-if="currentMenu=='exchange'"/>
      <Intro v-else-if="currentMenu=='intro'"/>
      <Price v-else="currentMenu=='price'" id="price"/>
      
    </div>
    <div class="footerHolder">
      <FooterMenu :currentMenu="currentMenu" :onPress="onPressMenuItem" class="footer"/>  
    </div>
    
  </div>
</template>

<script>
import Price from './components/Price/Price'
import Wallet from './components/Wallet/Wallet'
import Invest from './components/Invest/Invest'
import Convert from './components/Convert/Convert'
import More from './components/More/More'
import ExchangeLink from './components/More/ExchangeLink'
import Intro from './components/More/Intro'
import FooterMenu from './components/FooterMenu/FooterMenu'

export default {
  name: 'app',
  data (){
    return {
      currentMenu: 'price'
    }
  },
  created () {
    // localStorage.setItem("boseok","boseok msg!!!!!")
    //sessionStorage
  },
  methods: {
    onPressMenuItem : function(menu){
      this.currentMenu = menu
    }
  },
  components: {
    Price,
    Wallet,
    Invest,
    Convert,
    More,
    ExchangeLink,
    Intro,
    FooterMenu
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.footerHolder {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
}

.footer {
  height: 120px;
  margin: auto;
}

input {
  width: 200px;
  height: 20px;
  border-radius: 5px;
  font-size: 15px;
  text-align: center;
}

select {
  width: 200px;
  height: 25px;
}

button {
  background-color: #008CBA;
  border: none;
  color: white;
  padding: 8px 22.5px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  margin: 10px;
  border-radius: 3px;
}
</style>
