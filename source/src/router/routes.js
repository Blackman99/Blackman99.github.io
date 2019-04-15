const routes = [{
	path: '/',
	component: () => import('layouts/MyLayout.vue'),
	children: [{
		path: '',
		component: () => import('pages/index')
	},{
		path: 'index',
		component: () => import('pages/index')
	}]
}]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
	routes.push({
		path: '*',
		component: () => import('pages/Error404.vue')
	})
}

export default routes
