<template>
  <div>
    <h1>{{ title }}</h1>
    <p v-for="item in itemList">
      <button @click="onPress(item.uri)">{{ item.title }}</button>
    </p>
  </div>
</template>

<script>
export default {
  name: 'More',
  props: [ 'currentMenu', 'onPress' ],
  data () {
    return {
      title: '더보기',
      itemList: [
        { title: '거래소 바로가기', uri: 'exchange' },
        { title: '개발자 소개', uri: 'intro' },
      ]
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
