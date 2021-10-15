<template>
	<div>
		<form v-on:submit.prevent="getElementsFromNasaApi(query)">
			<input type="text" v-model="query" />
		</form>
		<br />
		<div>
			{{ msgForUser }}
		</div>
		<br /><br />
		<div v-for="image in dataResult" :key="image.id" class="row block-img">
			<div class="row">
				<img :src="image.links[0].href" class="nasa-images" />
			</div>
			<div class="box-description col-4">
				<h4>nasa_id : {{ image.data[0].nasa_id }}</h4>
				<h2>{{ image.data[0].title }}</h2>
				<p>{{ image.data[0].description }}</p>
				<SelectImages
					:dataResult="dataResult"
					:nasa_id="image.data[0].nasa_id"
				/>
			</div>
		</div>
		<br />
	</div>
</template>
<script>
	import SelectImages from '@/components/SelectImages'
	export default {
		data() {
			return {
				msgForUser: '',
			}
		},
		components: {
			SelectImages,
		},
		computed: {
			picturesByIds: {
				get() {
					return this.$store.state.selectedPicturesByIds
				},
				set(newPicsByIds) {
					this.$store.commit('GET_SELECTED_PICTURES_BY_ID', newPicsByIds)
				},
			},
			dataResult: {
				get() {
					return this.$store.state.datasFromNasaApi
				},
				set(query) {
					this.$store.commit('GET_DATAS_NASA', query)
				},
			},
			query: {
				get() {
					return this.$store.state.query
				},
				set(query) {
					this.$store.commit('SET_QUERY', query)
				},
			},
		},
		created() {},
		mounted() {
			this.getElementsFromNasaApi(this.query)
		},
		watch: {
			dataResult(newDataResult) {
				if (newDataResult) {
					const keywords = newDataResult.map((e) =>
						e?.data[0]?.keywords?.includes(this.query)
					)
					if (this.query !== null) {
						if (keywords && keywords.length > 0) {
							this.msgForUser = `Votre recherche : ${this.query} est pertinente, voici les résultats !`
						} else {
							this.msgForUser = `Vous ne trouverez rien avec cette suite de lettres : ${this.query}`
						}
					}
				}
			},
		},
		methods: {
			// make a get request to nasa api instead query, query corresponding to texte written by user
			getElementsFromNasaApi(query) {
				this.$store.dispatch('getDatasNasa', query)
			},
		},
	}
</script>
<style lang="css">
	.nasa-images {
		width: 30vw;
	}
	.block-img {
		display: inline-flex;
	}
	.box-description {
		min-width: 70vw;
	}
	h2 {
		text-align: left;
		margin-left: 5%;
	}
	p {
		margin: 4%;
		text-align: justify;
		font-size: smaller;
	}
	input {
		width: 30vw;
		height: 2vh;
		border-radius: 10px;
		border-color: green;
		padding: 1%;
	}
</style>
