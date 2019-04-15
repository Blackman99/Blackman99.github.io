<style scoped src="./index.css"/>
<template>
<section style="height:100vh;overflow:hidden;">
	<div class="module-container" :style="{
		transform: `translateY(-${item*100}vh)`
	}">
		<div style="height:100vh;">
			<svg id="name">
			</svg>
			<div class="column items-center justify-center" style="cursor:pointer;" @click="item = item + 1">
				<q-icon color="primary" name="keyboard_arrow_down" size="60px" class="animation fade-in third"/>
			</div>
		</div>
		<div style="height:100vh;position:relative;">
			<div class="column items-center justify-center" style="cursor:pointer;position:absolute;top:0;left:0;width:100%;" @click="item = item - 1">
				<q-icon color="primary" name="keyboard_arrow_up" size="60px" class="animation fade-in third"/>
			</div>
			<svg id="skills">

			</svg>
		</div>
	</div>
</section>
</template>

<script>
import * as d3 from "d3";
import { mapState } from 'vuex';
let i = 0,
	nextColor = () => `hsla(${(i=(i+5)%360)}, 100%, 50%, 1)`,
	w = 8,
	c = '#444444',
	d = 5000;
let counter = 0;
export default {
	name: 'PageIndex',
	data() {
		return {
			tw: 0,
			th: 0,
			skillDrawed: false,
			item: 0
		}
	},
	computed: {
		...mapState({
			scrollTop: state => state.bus.scrollTop
		})
	},
	methods: {
		drawAlpha(path, len, bg){
			setTimeout(() => {
				bg.append('path')
				.attr('d', path)
				.attr('stroke-dashoffset', len)
				.attr('stroke-dasharray', len)
				.attr('stroke-width', 8)
				.attr('stroke', '#444444')
				.attr('fill', 'none')
				.transition()
				.duration(2000)
				.attr('stroke-dashoffset', '0')
			}, counter * 400)
			counter++
		},
		drawDonSen() {
			counter = 0;
			let bg = d3.select('svg#name'),
			 	r = 55,
				l = 70 * Math.PI + 70 * 2 + w * 2,
				y = 284,
				x;
			let svg = document.getElementById('name')
			x = (this.tw - 712) / 2;
			if (this.$q.platform.is.mobile) {
				x = (this.tw - 309) / 2 + 5;
				y = 184
			}
			bg.selectAll('path').remove()
			this.drawAlpha(`M ${x} ${y} L ${x} ${y-2*70} A ${r} ${r} 0 0 1 ${x} ${y-w/2}`, l, bg)
			let a = 40,
				b = 45;
			l = 300;
			x += 140;
			this.drawAlpha(`M ${x} ${y} A ${a} ${b} 0 1 1 ${x} ${y - 100} A ${a} ${b} 0 0 1 ${x} ${y}`, l, bg)
			x += 80;
			l = 196;
			this.drawAlpha(`M ${x} ${y} L ${x} ${y - 104} M ${x} ${y - 64} A 30 30 0 1 1 ${x+80} ${y - 64} L ${x + 80} ${y}`, l, bg)
			x += 200;
			l = 450;
			r = 35;
			if (this.$q.platform.is.mobile) {
				x = (this.tw - 309) / 2 + 45;
				y += 180
			}
			this.drawAlpha(`M ${x-40} ${y-40} A 40 40 -90 1 0 ${x+40} ${y-40} L ${x-40} ${y-100} A 40 40 -90 0 1 ${x+40} ${y-100}`, l, bg)
			x += 120
			if (this.$q.platform.is.mobile) {
				x -= 10
			}
			this.drawAlpha(`M ${x-40} ${y-40} L ${x + 40} ${y-40} A 40 40 0 1 0 ${x+30} ${y-10}`, l, bg)
			x += 80;
			l = 196;
			if (this.$q.platform.is.mobile) {
				x -= 10
			}
			this.drawAlpha(`M ${x} ${y} L ${x} ${y - 104} M ${x} ${y - 64} A 30 30 0 1 1 ${x+80} ${y - 64} L ${x + 80} ${y}`, l, bg)
		},
		drawSkill() {
			counter = 0;
			let bg = d3.select('svg#skills'),
				x = 300,
				y = 160,
				l = 300,
				r = 20,
				dis = 20;
			x = (this.tw - 260) / 2 + r;
			bg.selectAll('path')
				.remove()
			this.drawAlpha(`M ${x-r} ${y-r} A ${r} ${r} 0 1 0 ${x+r} ${y-r} L ${x-r} ${y-r*2.5} A ${r} ${r} 0 0 1 ${x+r} ${y-r*2.5}`, l, bg)
			x = x + 2 * r + 5;
			this.drawAlpha(`M ${x} ${y} L ${x} ${y-76} M ${x} ${y-76/2 } L ${x+25} ${y-70}  M ${x} ${y-76/2} L ${x+35} ${y}`, l, bg)
			x = x + 35 + dis;
			this.drawAlpha(`M ${x} ${y} L ${x} ${y-50}`, l, bg)
			this.drawAlpha(`M ${x-w/2-2} ${y-76+w/2} A ${w/2} ${w/2} 0 1 0 ${x+w-2} ${y-76+w/2} A ${w/2} ${w/2} 0 1 0 ${x-w/2-2} ${y-76+w/2}`, l, bg)
			x = x + w / 2 + dis + 10;
			this.drawAlpha(`M ${x} ${y} L ${x} ${y - 76}`, l, bg)
			x = x + w / 2 + dis + 10;
			this.drawAlpha(`M ${x} ${y} L ${x} ${y - 76}`, l, bg)
			x = x + w / 2 + dis + 20;
			this.drawAlpha(`M ${x-r} ${y-r} A ${r} ${r} 0 1 0 ${x+r} ${y-r} L ${x-r} ${y-r*2.5} A ${r} ${r} 0 0 1 ${x+r} ${y-r*2.5}`, l, bg)
		},
		drawSillForceMap() {
			let skills = ['JQuery', 'Boostrap', 'svg', 'echarts', 'Java', 'PHP', 'Python', 'Node.js', 'Vue.js', 'Quasar', 'd3.js', 'H5', 'CSS3', 'JS(ES6)', 'Webpack', 'Spring', 'Express', 'Django'],
				nodes = [],
				links = [],
				bg = d3.select('svg#skills'),
				$this = this;
			bg.selectAll('g').remove()
			let drag = drag = simulation => {
				function dragstarted(d) {
					if (!d3.event.active) simulation.alphaTarget(0.3).restart();
					d.fx = d.x;
					d.fy = d.y;
				}

				function dragged(d) {
					d.fx = d3.event.x;
					d.fy = d3.event.y;
				}

				function dragended(d) {
					if (!d3.event.active) simulation.alphaTarget(0);
					d.fx = null;
					d.fy = null;
				}
				return d3.drag()
					.on("start", dragstarted)
					.on("drag", dragged)
					.on("end", dragended);
			}
			let type = ['language', 'web frame', 'front end']
			for (let i = 0; i < skills.length; i++) {
				nodes.push({
					id: i,
					text: skills[i],
					c: `hsla(${Math.random()*360}, 100%, 50%, .4)`,
					type: (() => {
						switch (skills[i]) {
							case 'Java':
							case 'PHP':
							case 'Python':
							case 'JS(ES6)':
								return type[0]
							case 'Spring':
							case 'Express':
							case 'Django':
								return type[1]
							default:
								return type[2]
						}
					})()
				})
				for (let j = i + 1; j < skills.length; j++) {
					links.push({
						source: i,
						target: j,
					})
				}
			}
			let lineLen = 430,
				radius = 50
			if (this.$q.platform.is.mobile) {
				lineLen = 200
				radius = 35;
			}
			let simulation = d3.forceSimulation(nodes)
				.force("link", d3.forceLink(links).id(d => d.id).distance(lineLen))
				.force("charge", d3.forceManyBody())
				.force("center", d3.forceCenter($this.tw / 2, 500));
			let link = bg.append("g")
				.selectAll("line")
				.data(links)
				.enter()
				.append("line")
				.attr("stroke-width", 1)
			let c = bg.append('g')
			let node = c.selectAll('circle')
				.data(nodes)
				.enter()
				.append('g')
				.attr('class', 'circleG')
				.attr('data-type', d => d.type)
				.append('circle')
				.attr('r', radius)
				.attr('fill', d => d.c)
				.call(drag(simulation));
			let text = c.selectAll('g.circleG')
				.data(nodes)
				.append('text')
				.attr('width', radius * 2)
				.attr('fill', '#333333')
				.attr('style', 'text-anchor: middle;pointer-events:none;')
				.text(d => d.text)
			simulation.on("tick", () => {
				link
					.attr("x1", d => d.source.x)
					.attr("y1", d => d.source.y)
					.attr("x2", d => d.target.x)
					.attr("y2", d => d.target.y);

				node
					.attr("cx", d => d.x)
					.attr("cy", d => d.y)

				text.attr('x', d => d.x)
					.attr('y', d => d.y)
			});
		},
	},
	mounted() {
		this.$emit('change-nav', 'home')
		let mainContainer = document.querySelectorAll('.module-container')[0],
			totalWidth = window.getComputedStyle ? getComputedStyle(mainContainer, null)['width'] : mainContainer.currentStyle['width'],
			totalHeight = window.getComputedStyle ? getComputedStyle(mainContainer, null)['height'] : mainContainer.currentStyle['height'];
		this.tw = new Number(totalWidth.substring(0, totalWidth.indexOf('p')));
		this.th = new Number(totalHeight.substring(0, totalHeight.indexOf('p')));
		this.drawDonSen()
	},
	watch: {
		item(nv){
			switch (nv) {
				case 0:
					this.drawDonSen()
					break;
				case 1:
					this.drawSkill()
					this.drawSillForceMap()
			}
		}
	},
}
</script>
