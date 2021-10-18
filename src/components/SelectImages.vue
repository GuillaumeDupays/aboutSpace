<template>
	<div class="select-images-box">
		<button @click="findSelectedPicturesByIds()" v-if="checked">
			Valider la sélection
		</button>
		<h3>Sélectionner cette image</h3>
		<div>
			<input
				type="checkbox"
				name="Image"
				v-model="checked"
				:value="nasa_id"
				:id="nasa_id"
				@click="userSelectPictures()"
			/>
			<label for="Image">Image</label><br /><br />
		</div>
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
			titleImg: {
				type: String,
			},
			href: {
				type: String,
			},
		},
		data() {
			return {
				picturesIdsSelected: [],
				elementToSend: {
					nasaId: '',
					title: '',
					urlImage: '',
					keywords: [],
				},
				checked: false,
			}
		},
		created() {
			// this.getElementsSelected()
		},
		mounted() {},
		computed: {
			picturesByIds: {
				get() {
					return this.$store.state.selectedPicturesByIds
				},
				set(newPicsByIds) {
					this.$store.commit('GET_SELECTED_PICTURES_BY_ID', newPicsByIds)
				},
			},
			picturesSelected: {
				get() {
					return this.$store.state.picturesSelected
				},
				set(newPicturesSelected) {
					this.$store.commit('SET_PICTURES_SELECTED', newPicturesSelected)
				},
			},
		},
		methods: {
			userSelectPictures() {
				if (!this.checked) {
					this.checked = true
					console.log('Image sélectionnée', this.checked)
					const pictureObj = {
						nasaId: this.nasa_id,
						title: this.titleImg,
						href: this.href,
					}
					this.picturesSelected.push(pictureObj)
					console.log('this.picturesSelected :>> ', this.picturesSelected)
				} else {
					this.checked = false
					console.log('Image non sélectionnée', this.checked)
				}
			},
			findSelectedPicturesByIds() {
				this.$store.dispatch('saveSelection', this.picturesSelected)
			},
			selectPictureById() {
				const datas = this.dataResult.map((e) => e.data[0])
				// console.log('datas', datas)
				// const comparaison = () =>
				// 	datas.nasa_id === selected ? datas.nasa_id : 'NON'
				// console.log('nid', nasa_id)
				// if (comparaison) {
				// 	const selected = {
				// 		nasaId: nasa_id,
				// 	}
				// test if selected ids exists inside dataResult
				// post ids selected to have pictures corresponding
				for (let p in datas) {
					console.log(datas[p])
					this.picturesIdsSelected.push(datas[p].nasa_id)
					console.log('this.picturesIdsSelected', this.picturesIdsSelected)
					console.log(
						'this.picturesIdsSelected to get',
						this.picturesIdsSelected
					)
				}
				this.$store.dispatch('postPicturesByIds', this.picturesIdsSelected)
			},
			// const results = this.dataResult.map((e) => e.data[0].nasa_id)
			// console.log('results', results)
			// this.picturesByIds.push(nasa_id)
			// console.log('this.pictures', this.picturesByIds)
			// const id = this.nasa_id.concat(this.picturesByIds)
			// console.log('id', id)
			// if (this.picturesByIds.includes(this.nasa_id)) {
			// 	console.log('includes', this.picturesByIds)
			// } else {
			// 	this.picturesByIds.push(this.nasa_id)
			// 	console.log(
			// 		`L'image avec l'id ${this.nasa_id} a été ajouté au tableau contenant les ids suivants : ${this.picturesByIds}`
			// 	)
			// }
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
	}
</script>
