<style scoped>
#bg {
  background-color: #e3e3e3;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  opacity: .5;
}

#bg .circle {
  width: 120px;
  height: 120px;
  border-radius: 100%;
}
</style>
<template>
<svg id="bg" width="100%" height="100%">
</svg>
</template>
<script>
import * as d3 from "d3";
const rd = (n, m) => Math.random() * (m - n) + n
let i = 0,
  min = 10,
  max = 20,
  nextColor = () => `hsla(${(i=(i+5)%360)}, 100%, 50%, 1)`,
  getR = () => {
    let r = rd(min, max)
    return r > (min + max) / 2 ? r : -r
  },
  lineNumber = 5,
  cl = {},
  duration = 1000;

export default {
  data() {
    return {
      centers: []
    };
  },
  props: [
    'bgEffect'
  ],
  components: {},
  methods: {
    fadeCircle(p, dx, dy) {
      d3.select('svg#bg').append('circle')
        .attr("cx", p[0])
        .attr("cy", p[1])
        .attr("r", 1e-6)
        .attr("fill", 'transparent')
        .attr("stroke-width", '2')
        .attr("stroke-opacity", 1)
        .attr('stroke', nextColor)
        .transition()
        .duration(duration)
        .ease(Math.sqrt)
        .attr("r", 100)
        .attr('cx', p[0] + dx)
        .attr('cy', p[1] + dy)
        .attr("stroke-opacity", 1e-6)
        .remove();
    },
		fadeCircleNoShuffle(p, dx, dy){
			d3.select('svg#bg').append('circle')
        .attr("cx", p[0])
        .attr("cy", p[1])
        .attr("r", 1e-6)
        .attr("fill", 'transparent')
        .attr("stroke-width", '2')
        .attr("stroke-opacity", 1)
        .attr('stroke', nextColor)
        .transition()
        .duration(duration)
        .ease(Math.sqrt)
        .attr("r", 100)
        .attr("stroke-opacity", 1e-6)
        .remove();
		},
    dropCircle(p, dx, dy) {
      let circles = [],
        bg = d3.select('svg#bg');
			if(this.$store.state.mouseAnimation.dot){
				if (cl.xStart) {
					bg.append('circle')
					.attr("cx", cl.xStart)
					.attr("cy", cl.yStart)
					.attr("r", 3)
					.attr('fill', nextColor)
					.transition()
					.duration(duration)
					.ease(Math.sqrt)
					.attr("cx", cl.xEnd)
					.attr("cy", cl.yEnd)
					.attr('r', 5)
					.remove();
				}
				bg.append('circle')
				.attr("cx", p[0])
				.attr("cy", p[1])
				.attr("r", 3)
				.attr('fill', nextColor)
				.transition()
				.duration(duration)
				.ease(Math.sqrt)
				.attr("cx", p[0] + dx)
				.attr("cy", p[1] + dy)
				.attr('r', 5)
				.remove();
			}
			if (cl.xStart && this.$store.state.mouseAnimation.line) {
        bg.append('line')
          .attr('x1', cl.xStart)
          .attr('y1', cl.yStart)
          .attr('x2', p[0])
          .attr('y2', p[1])
          .attr('stroke-width', 1)
          .attr('stroke', nextColor)
          .transition()
          .duration(duration)
          .ease(Math.sqrt)
          .attr('x1', cl.xEnd)
          .attr('y1', cl.yEnd)
          .attr('x2', p[0] + dx)
          .attr('y2', p[1] + dy)
          .remove()
      }
      cl = {
        xStart: p[0],
        yStart: p[1],
        xEnd: p[0] + dx,
        yEnd: p[1] + dy
      }
    },
		dropCircleNoShuffle(p, dx, dy){
			let circles = [],
        bg = d3.select('svg#bg');
			if(this.$store.state.mouseAnimation.dot){
				if (cl.xStart) {
					bg.append('circle')
					.attr("cx", cl.xStart)
					.attr("cy", cl.yStart)
					.attr("r", 3)
					.attr('fill', nextColor)
					.transition()
					.duration(duration)
					.ease(Math.sqrt)
					.attr('r', 5)
					.remove();
				}
				bg.append('circle')
				.attr("cx", p[0])
				.attr("cy", p[1])
				.attr("r", 3)
				.attr('fill', nextColor)
				.transition()
				.duration(duration)
				.ease(Math.sqrt)
				.attr('r', 5)
				.remove();
			}
      if (cl.xStart && this.$store.state.mouseAnimation.line) {
        bg.append('line')
          .attr('x1', cl.xStart)
          .attr('y1', cl.yStart)
          .attr('x2', p[0])
          .attr('y2', p[1])
          .attr('stroke-width', 1)
          .attr('stroke', nextColor)
          .transition()
          .duration(duration)
          .ease(Math.sqrt)
          .remove()
      }
      cl = {
        xStart: p[0],
        yStart: p[1],
        xEnd: p[0] + dx,
        yEnd: p[1] + dy
      }
		}
  },
  computed: {},
  mounted() {
    let $this = this;
    d3.select('body').on("ontouchstart" in document ? "touchmove" : "mousemove", function() {
      let m = d3.mouse(this);
      let dx = getR() + getR() + getR() + getR(),
        dy = getR() + getR() + getR() + getR();
			if($this.$store.state.mouseAnimation.shuffle){
				$this.dropCircle(m, dx, dy)
				if ($this.$store.state.mouseAnimation.circle) {
					$this.fadeCircle(m, dx, dy)
				}
			}else{
				$this.dropCircleNoShuffle(m, dx, dy)
				if ($this.$store.state.mouseAnimation.circle) {
					$this.fadeCircleNoShuffle(m, dx, dy)
				}
			}
    })

  },
}
</script>
