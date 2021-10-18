<template>
	<div class="select-images-box">
		<button @click="userSaveHisSelection()" v-if="checked">
			Validate selection
		</button>
		<h3>Sélect this picture</h3>
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
			picturesSaved: {
				get() {
					return this.$store.state.picturesSaved
				},
				set(newPicturesSelected) {
					this.$store.commit('SAVE_PICTURES', newPicturesSelected)
				},
			},
			totalSelectedPictures: {
				get() {
					return this.$store.state.totalSelectedPictures
				},
				set(add) {
					this.$store.dispatch('totalSelectedPictures', add)
				},
			},
		},
		methods: {
			userSelectPictures() {
				if (!this.checked) {
					this.totalSelectedPictures += 1
					console.log(
						'this.totalSelectedPictures :>> ',
						this.totalSelectedPictures
					)
					this.checked = true
					console.log('Image sélectionnée', this.checked)
					// made an object with properties you want to send to back-end and retrieve in the view
					const pictureObj = {
						nasaId: this.nasa_id,
						title: this.titleImg,
						href: this.href,
					}
					this.picturesSelected.push(pictureObj)
					console.log('this.picturesSelected :>> ', this.picturesSelected)
				} else {
					this.totalSelectedPictures -= 1
					this.checked = false
					console.log('Image non sélectionnée', this.checked)
				}
			},
			userSaveHisSelection() {
				this.picturesSaved = this.picturesSelected
				this.$store.dispatch('saveSelection', this.picturesSaved)
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
