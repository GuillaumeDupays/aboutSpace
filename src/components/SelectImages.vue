<template>
	<div class="select-images-box">
		<button @click="findSelectedPicturesByIds()" v-if="checked">
			Valider la sélection
		</button>
		<h3>Sélectionner cette image</h3>
		<div>
			<input
				type="checkbox"
				ref="img"
				name="Image"
				v-model="checked"
				:value="nasa_id"
				:id="nasa_id"
				@click="selectPictureById()"
			/>
			<label for="Image">Image</label><br /><br />
		</div>
		{{ picturesByIds }}
	</div>
</template>
<script>
	import axios from 'axios'
	export default {
		props: {
			dataResult: {
				type: Array,
			},
			nasa_id: {
				type: String,
			},
			picturesByIds: {
				type: Array,
			},
		},
		data() {
			return {
				checked: false,
				elementToSend: {
					nasaId: '',
					title: '',
					urlImage: '',
					keywords: [],
				},
			}
		},
		created() {
			// this.getElementsSelected()
		},
		mounted() {},
		methods: {
			findSelectedPicturesByIds(selected) {
				selected = () => this.picturesByIds
				console.log('selected', selected)
				console.log('dataResults', this.dataResult)
				const idToCompare = this.dataResult.flatMap((e) => e.data[0].nasa_id)
				console.log('idToCompare', idToCompare)
				// test if selected ids exists inside dataResult
				const toTest = idToCompare.some(selected)
				console.log(toTest)
				if (toTest) {
					// post ids selected to have pictures corresponding
					for (let p of this.picturesByIds) {
						console.log('pictures to get', p)
						this.$store.dispatch('findOnePictureById', p)
					}
				}
				// this.$store.dispatch('findOnePictureById', selected)
			},
			selectPictureById() {
				this.picturesByIds.push(this.nasa_id)
				console.log('this.selectedNasaIds', this.picturesByIds)
			},
			getElementsSelected() {
				axios.get('http://localhost:3000/api/pictures').then((res) => {
					console.log('	getElementsSelected', res.data)
				})
			},
			// sendSelectedElementToBack() {
			// 	console.log(this.picturesByIds)
			// 	this.elementToSend = {
			// 		nasaId: 1,
			// 		title: 'Test',
			// 		urlImage:
			// 			'https://images-assets.nasa.gov/image/PIA13213/collection.json',
			// 		keywords: ['test', 'image', 'mongoDb'],
			// 	}
			// 	// axios
			// 	// 	.post('http://localhost:3000/api/pictures', this.elementToSend)
			// 	// 	.then((res) => res.data.id)
			// 	console.log('sendSelectToBack', this.elementToSend)
			// },
		},
	}
</script>
