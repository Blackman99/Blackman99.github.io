<template>
  <div id="q-app" v-scroll="scrolled">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
  },
  methods: {
    scrolled(position){
      this.$store.commit('bus/scrollTop', position)
    }
  }
}
</script>

<style>
</style>
