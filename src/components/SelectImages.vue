<template>
	<div class="select-images-box">
		<div>
			<input
				type="checkbox"
				name="Image"
				v-model="checked"
				:value="nasa_id"
				:id="nasa_id"
				@click="userSelectPictures()"
			/>
			<label for="Image">Select this picture</label><br /><br />
		</div>
		<button @click="userSaveHisSelection()" v-if="checked">
			Validate selection
		</button>
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
			console.log('XREATED this.picturesSelected :>> ', this.picturesSelected)
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
		watch: {
			picturesSelected(newPicturesSelected) {
				// const nasaIds = newPicturesSelected.map((e) => e.nasaId)
			},
		},
		methods: {
			userSelectPictures() {
				if (!this.checked) {
					// made an object with properties you want to send to back-end and retrieve in the view
					const pictureObj = {
						nasaId: this.nasa_id,
						title: this.titleImg,
						href: this.href,
						totalSelectedPictures: this.totalSelectedPictures,
					}
					console.log('this.picturesSelected :>> ', this.picturesSelected)
					const pictures = this.picturesSelected.map((e) => e.nasaId)
					console.log('pictures', pictures)
					// check that there is no duplicate nasaId to have just one by one picture
					if (!pictures.includes(pictureObj.nasaId)) {
						this.totalSelectedPictures += 1
						this.checked = true
						console.log('Image sélectionnée', this.checked)
						console.log('pictureObj :>> ', pictureObj)
						this.picturesSelected.push(pictureObj)
					}
				} else {
					// this.totalSelectedPictures -= 1
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
