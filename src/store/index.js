import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import style from '../store/style'
Vue.use(Vuex)

const SEARCH_NASA_API = 'https://images-api.nasa.gov/search?q='
// const ASSET_NASA_API = 'https://images-api.nasa.gov/asset/'

export default new Vuex.Store({
	modules: {
		style,
	},
	state: {
		// default value when search bar is empty, corresponding to the v-model in NasaListImages.vue
		query: null,
		// this object will contain datas from nasa api
		datasFromNasaApi: [],
		// id for each picture selected by user, return an array with all this selection
		selectedPicturesByIds: {},
		picturesSelected: [],
		totalSelectedPictures: 0,
		picturesSaved: [],
	},
	mutations: {
		TOTAL_SELECTED_PICTURES(state, add) {
			state.totalSelectedPictures = add
		},
		SAVE_PICTURES(state, newPicture) {
			state.picturesSaved = { ...newPicture }
		},
		SET_PICTURES_SELECTED(state, newPicture) {
			state.picturesSelected = newPicture
		},
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
		getSavedPictures({ commit }) {
			axios.get('http://localhost:3000/api/pictures').then((res) => {
				res.data
				commit('SAVE_PICTURES', res.data)
			})
		},
		totalSelectedPictures({ commit }, add) {
			commit('TOTAL_SELECTED_PICTURES', add)
		},
		postPicturesByIds({ commit }, payload) {
			commit('SET_PICTURES_SELECTED', payload)
		},
		saveSelection({ commit }, payload) {
			axios
				.post('http://localhost:3000/api/pictures', payload)
				.then((res) => {
					payload = res.data
					console.log('result', payload)
					return payload
				})
				.catch((err) => {
					console.log('err', err)
				})
			commit('SAVE_PICTURES', payload)
			console.log('SAVE_PICTURES :>> ', payload)
		},
		async findOnePictureById({ commit }, nasa_id) {
			await axios
				.get(`${SEARCH_NASA_API}${nasa_id}&media_type=image`)
				.then((res) => {
					console.log(SEARCH_NASA_API + nasa_id)
					commit('SET_PICTURES_SELECTED', res.data.collection.items)
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
	getters: {
		allPicturesSaved(state) {
			const allPictures = state.picturesSaved
			return allPictures
		},
		// pictures selected by user, visualize at page : 'my favorites pictures'
		allPicturesSelected(state) {
			const allPictures = state.picturesSaved
			return allPictures
		},
	},
})
