import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const SEARCH_NASA_API = 'https://images-api.nasa.gov/search?q='
const ASSET_NASA_API = 'https://images-api.nasa.gov/asset/'

export default new Vuex.Store({
	state: {
		// default value when search bar is empty, corresponding to the v-model in NasaListImages.vue
		query: null,
		// this object will contain datas from nasa api
		datasFromNasaApi: [],
		// id for each picture selected by user, return an array with all this selection
		selectedPicturesByIds: [],
	},
	mutations: {
		GET_SELECTED_PICTURES_BY_ID(state, newSelectedPicsByIds) {
			console.log('GET_SELECTED_PICTURES_BY_ID', newSelectedPicsByIds)
			state.selectedPicturesByIds = newSelectedPicsByIds
		},
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
		postPicturesByIds({ commit }, payload) {
			commit('GET_SELECTED_PICTURES_BY_ID', payload)
		},
		async findOnePictureById({ commit }, nasa_id) {
			await axios.get(`${ASSET_NASA_API}${nasa_id}`).then((res) => {
				console.log(ASSET_NASA_API + nasa_id)
				commit('GET_SELECTED_PICTURES_BY_ID', res.data.collection.items)
			})
		},
		// get datas from nasa api according to user captur inside the search bar : query
		async getDatasNasa({ commit }, query) {
			await axios
				.get(`${SEARCH_NASA_API}${query}&media_type=image`)
				.then((res) => {
					console.log(SEARCH_NASA_API + query)
					commit('GET_DATAS_NASA', res.data.collection.items)
				})
		},
	},
	modules: {},
})
