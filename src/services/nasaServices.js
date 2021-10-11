import axios from 'axios'
// import configApi from '../services/configNasaApi'

let nasaUrl = 'https://images-api.nasa.gov/search?q='
let dataResult = []

export default {
	async nasaApi(query) {
		console.log(nasaUrl)
		await axios
			.get(`https://images-api.nasa.gov/search?q=${query}`)
			.then((res) => {
				console.log(nasaUrl + query)
				console.log('nasaApi', res.data.collection.items[0])
				dataResult = res.data.collection.items
				console.log('dataResult', dataResult)
				return dataResult
			})
	},
}
