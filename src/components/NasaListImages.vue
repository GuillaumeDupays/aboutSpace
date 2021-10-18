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
		<div v-for="image in dataResult" :key="image.id" class="container-picture">
			<img :src="image.links[0].href" class="picture" />
			<h2 class="title">{{ image.data[0].title }}</h2>
			<p class="description">{{ image.data[0].description }}</p>
			<SelectImages
				class="selected"
				:dataResult="dataResult"
				:nasa_id="image.data[0].nasa_id"
				:titleImg="image.data[0].title"
				:href="image.links[0].href"
			/>
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
	.container-picture {
		display: grid;
		flex-wrap: wrap;
		grid-template-columns: 1fr 0.8fr 1.2fr;
		grid-template-rows: 0.3fr 1.7fr 1fr;
		gap: 0px 0px;
	}
	.picture {
		grid-area: 1 / 1 / 4 / 3;
		width: 60vw;
	}
	.title {
		grid-area: 1 / 3 / 2 / 4;
	}
	.description {
		grid-area: 2 / 3 / 3 / 4;
	}
	.selected {
		grid-area: 3 / 3 / 4 / 4;
	}
	/* .nasa-images {
		width: 60vw;
	}
	.block-img {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
	.box-description {
		grid-column-start: 6;
		grid-column-end: 8;
		grid-row-start: 1;
		grid-row-end: 3;
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
	} */
</style>
