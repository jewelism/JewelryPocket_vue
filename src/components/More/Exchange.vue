
<template>
  <div>
    <h1>거래소 바로가기</h1>
    <h6 v-for="site in siteList"><a :href="site.link">{{site.name}}</a></h6>
  </div>
</template>

<script>
export default {
  name: 'Exchage',
  data () {
    return {
      siteList: [
        { name: '코인원', link: 'https://coinone.co.kr/' },
        { name: '빗썸', link: 'https://www.bithumb.com/' },
        { name: '코빗', link: 'https://www.korbit.co.kr/' },
        { name: 'Poloniex', link: 'https://poloniex.com/' }
      ],
    }
  }
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
