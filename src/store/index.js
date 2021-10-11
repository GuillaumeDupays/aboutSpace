import Vue from 'vue'
import Vuex from 'vuex'
import nasaServices from '../services/nasaServices'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		nasaImages: [],
		query: null,
		apiResults: {},
	},
	mutations: {
		GET_NASA_IMAGES(state, nasaImages) {
			state.nasaImages = nasaImages
		},
		SET_QUERY(state, query) {
			console.log('SET_QUERY', query)
			state.query = query
		},
		GET_API_RESULTS(state, apiResults) {
			console.log('GET_API_RESULTS', apiResults)
			state.apiResults = apiResults
		},
	},
	actions: {
		getNasaImages({ commit }, query) {
			console.log('query', query)
			nasaServices
				.nasaApi(query)
				.then((res) => {
					commit('GET_API_RESULTS', res.data.collection.items)
				})
				.catch((err) => console.log(err.message))
		},
	},
	modules: {},
})
