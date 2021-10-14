<template>
	<div class="select-images-box">
		<button @click="sendSelectedElementToBack()" v-if="checked">
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
			selectPictureById() {
				this.picturesByIds.push(this.nasa_id)
				console.log('this.selectedNasaIds', this.picturesByIds)
			},
			getElementsSelected() {
				axios.get('http://localhost:3000/api/pictures').then((res) => {
					console.log('	getElementsSelected', res.data)
				})
			},
			sendSelectedElementToBack() {
				console.log(this.picturesByIds)
				this.elementToSend = {
					nasaId: 1,
					title: 'Test',
					urlImage:
						'https://images-assets.nasa.gov/image/PIA13213/collection.json',
					keywords: ['test', 'image', 'mongoDb'],
				}
				// axios
				// 	.post('http://localhost:3000/api/pictures', this.elementToSend)
				// 	.then((res) => res.data.id)
				console.log('sendSelectToBack', this.elementToSend)
			},
		},
	}
</script>
