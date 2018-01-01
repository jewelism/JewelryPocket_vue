<template>
  <div id="app">
    
    <Wallet v-if="currentMenu=='wallet'"/>
    <Invest v-else-if="currentMenu=='invest'"/>
    <Convert v-else-if="currentMenu=='convert'"/>
    <More v-else-if="currentMenu=='more'" :onPress="onPressMenuItem"/>
    <Intro v-else-if="currentMenu=='intro'"/>
    <Exchange v-else-if="currentMenu=='exchange'"/>
    <Price v-else="currentMenu=='price'"/>
    
    <FooterMenu :currentMenu="currentMenu" :onPress="onPressMenuItem" id="footer"/>
  </div>
</template>

<script>
import Price from './components/Price/Price'
import Wallet from './components/Wallet/Wallet'
import Invest from './components/Invest/Invest'
import Convert from './components/Convert/Convert'
import Intro from './components/Intro/Intro'
import More from './components/More/More'
import Exchange from './components/More/Exchange'
import FooterMenu from './components/FooterMenu/FooterMenu'

export default {
  name: 'app',
  data (){
    return {
      currentMenu: 'price'
    }
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
    Intro,
    More,
    Exchange,
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
},
#footer {
  position:'absolute';
  bottom:0;
  width:100%;
  height:70px;
  background:#ccc;
}
</style>
