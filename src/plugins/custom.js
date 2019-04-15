
export default ({ app, router, Vue }) => {
  Vue.directive('gradient', {
    bind(el, binding) {
      let opacity = binding.value,
        gradient = 'linear-gradient(to right, transparent';
      for(let i = 0; i <= 6; i++){
        gradient += `, hsla(${i*60}, 100%, 50%, ${opacity})`
      }
      gradient += `, transparent)`
      el.style.background = gradient
    }
  })
}
