import Vue from 'vue'
import Vuex from 'vuex'
import nasaServices from '../services/nasaServices'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// default value when search bar is empty, corresponding to the v-model in NasaListImages.vue
		query: null,
		// this object will contain datas from nasa api
		datasFromNasaApi: {},
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
		getDatasNasa({ commit }, query) {
			nasaServices
				.nasaApi(query)
				.then((res) => {
					commit('GET_DATAS_NASA', res.data.collection.items)
				})
				.catch((err) => console.log(err.message))
		},
	},
	modules: {},
})
