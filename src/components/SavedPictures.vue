<template>
	<div class="savedPictures">
		<div v-for="mySavedPicture of picturesSaved" :key="mySavedPicture.id">
			<h3>{{ mySavedPicture.title }}</h3>
			<img :src="mySavedPicture.href" />
		</div>
	</div>
</template>

<script>
	export default {
		mounted() {
			console.log('this.picturesSaved :>> ', this.picturesSaved)
			this.$store.dispatch('getSavedPictures')
		},
		computed: {
			picturesSaved: {
				get() {
					return this.$store.getters.allPicturesSaved
				},
			},
		},
	}
</script>

<style></style>
