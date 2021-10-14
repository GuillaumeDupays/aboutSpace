import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const nasaUrl = 'https://images-api.nasa.gov/search?q='

export default new Vuex.Store({
	state: {
		// default value when search bar is empty, corresponding to the v-model in NasaListImages.vue
		query: null,
		// this object will contain datas from nasa api
		datasFromNasaApi: [],
	},
	mutations: {
		GET_DATAS_NASA(state, newDatasFromNasaApi) {
			console.log('GET_DATAS_NASA', newDatasFromNasaApi)
			state.datasFromNasaApi = newDatasFromNasaApi
		},
		SET_QUERY(state, query) {
			console.log('SET_QUERY', query)
			state.query = query
		},
	},
	actions: {
		// get datas from nasa api according to user captur inside the search bar : query
		async getDatasNasa({ commit }, query) {
			console.log(nasaUrl)
			await axios.get(`${nasaUrl}${query}&media_type=image`).then((res) => {
				console.log(nasaUrl + query)
				commit('GET_DATAS_NASA', res.data.collection.items)
			})
		},
	},
	modules: {},
})
