<template>
  <div>
    <button @click="onPress('price')">시세정보</button>
    <button @click="onPress('wallet')">지갑</button>
    <button @click="onPress('invest')">가상투자</button>
    <button @click="onPress('convert')">모의환전</button>
    <button @click="onPress('dev')">개발자</button>
  </div>
</template>

<script>
export default {
  name: 'FooterMenu',
  props: ['currentMenu','onPress'],
  data () {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
