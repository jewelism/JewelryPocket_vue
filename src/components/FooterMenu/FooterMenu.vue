<template>
  <div>
    <button v-for="item in itemList" @click="onPress(item.uri)">{{ item.title }}</button>
  </div>
</template>

<script>
export default {
  name: 'FooterMenu',
  props: ['currentMenu','onPress'],
  data () {
    return {
      itemList: [
        { title: '시세정보', uri: 'price' },
        { title: '내 지갑', uri: 'wallet' },
        { title: '가상투자', uri: 'invest' },
        { title: '모의환전', uri: 'convert' },
        { title: '더보기', uri: 'more' },
      ]
    }
  },
}
</script>

<style scoped>

</style>
