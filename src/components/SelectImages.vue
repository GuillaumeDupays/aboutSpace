<template>
	<div class="select-images-box">
		<button @click="sendSelectedElementToBack()">Valider la sélection</button>
		<h3>Sélectionner cette image</h3>
		<div>
			<input
				type="checkbox"
				ref="img"
				name="Image"
				v-model="checked"
				:value="nasa_id"
				:id="nasa_id"
				@click="selectAnElement()"
			/>
			<label for="Image">Image</label><br /><br />
		</div>
		{{ selectedNasaIds }}
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
		},
		data() {
			return {
				selectedNasaIds: [],
				checked: null,
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
			selectAnElement() {
				console.log('selectedNasaIds', this.checked)
			},
			getElementsSelected() {
				axios.get('http://localhost:3000/api/pictures').then((res) => {
					console.log('	getElementsSelected', res.data)
				})
			},
			sendSelectedElementToBack() {
				console.log(this.selectedNasaIds)
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
		watch: {
			checked(newVal) {
				if (newVal) {
					console.log('newVal', newVal)
					console.log('nasa_id', this.nasa_id)
					this.selectedNasaIds.push(this.nasa_id)
					console.log(this.selectedNasaIds)
				}
			},
			selectedNasaIds(newElt) {
				if (newElt) {
					console.log('newElt selectedNasaIds', newElt)
				}
			},
		},
	}
</script>
