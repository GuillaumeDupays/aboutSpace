<template>
	<div class="favorites-images-container">
		<div v-for="picture of allPicturesSelected" :key="picture.id">
			<div class="favorite-img">
				<h3>{{ picture.title }}</h3>
				<img :src="picture.href" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			picturesSelected: {
				get() {
					return this.$store.state.picturesSelected
				},
			},
			allPicturesSelected: {
				get() {
					return this.$store.getters.allPicturesSelected
				},
				set(value) {
					this.$store.dispatch('allPicturesSelected', value)
				},
			},
		},
	}
</script>
<style>
	.favorites-images-container {
		display: inline-flex;
	}
	.favorite-img > img {
		max-width: inherit;
	}
	.favorite-img {
		max-width: 48vw;
	}
</style>
