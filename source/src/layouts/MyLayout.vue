<style scoped>
.blackman header .profile-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 101;
  padding: 1rem 0 0;
  transition: all linear .3s;
}

.blackman header .profile-img {
  height: 100px;
  margin-right: .8em;
  transition: all linear .3s;
}

.blackman header .title {
  animation-delay: .3s;
  font-size: 24px;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.blackman header .title .caption {
  font-size: .7em;
  font-weight: 300;
  color: #666666;
}

.divider {
  height: 1px;
  margin-top: 1rem;
  width: 100%;
}
.donsen-layout-content{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  min-height: 100vh;
  z-index: 100;
}
@media only screen and (max-width: 799px) {
  .blackman header .profile-container {
    top: 0;
    padding-bottom: 1rem;
    background-color: white;
  }

  .blackman header .profile-img {
    height: 60px;
  }
  .blackman header .profile-container {
    padding-left: 1rem;
  }
  .donsen-layout-content{
    left: 0;
    right: 0;
    top: 0;
  }
}
</style>
<template>
<q-layout :class="['blackman', {'q-card':isM}]" id="blackman">
  <div class="donsen-layout-content">
    <layout-bg />
    <router-view @change-nav="changeNav" />
  </div>

  <q-page-sticky position="bottom-right" :offset="[18, 18]" style="z-index: 1000;" v-if="!isM">
    <q-btn-dropdown label="特效控制" color="primary">
      <q-list>
        <q-item>
          <q-item-main>
            <q-toggle @click="$store.commit('mouseAnimation/toggleDot')" class="q-mr-md" :label="`圆心特效: ${mouseAnimation.dot?'ON':'OFF'}`" v-model="mouseAnimation.dot" />
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-toggle class="q-mr-md" :label="`连线特效: ${mouseAnimation.line?'ON':'OFF'}`" v-model="mouseAnimation.line" />
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-toggle class="q-mr-md" :label="`圆形特效: ${mouseAnimation.circle?'ON':'OFF'}`" v-model="mouseAnimation.circle" />
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-main>
            <q-toggle class="q-mr-md" :label="`随机动作: ${mouseAnimation.shuffle?'ON':'OFF'}`" v-model="mouseAnimation.shuffle" />
          </q-item-main>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </q-page-sticky>
  <!-- 右下角特效控制下拉结束 -->

</q-layout>
</template>

<script>
import {
  openURL
} from 'quasar'
import layoutBg from './bg.vue'
import { mapState } from 'vuex';

export default {
  name: 'MyLayout',
  data() {
    return {
      navDirection: 'mid',
      showIntro: false,
      navItem: 'home',
    }
  },
  methods: {
    openURL,
    changeNav(n) {
      this.navItem = n;
    }
  },
  computed: {
    ...mapState({
      scrollTop: state => state.bus.scrollTop
    }),
    isM(){
      return  this.$q.platform.is.mobile
    },
    mouseAnimation(){
      return this.$store.state.mouseAnimation
    },
    navDivideStyle() {
      switch (this.navDirection) {
        case 'mid':
          return 'rotate(0)'
        case 'left':
          return 'rotate(-90deg)'
        case 'right':
          return 'rotate(90deg)'
      }
    },
  },
  mounted() {

  },
  components: {
    layoutBg,
  }
}
</script>
