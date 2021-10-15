<template>
	<div class="favorites-pictures">
		ici prochainement les images favorites de l'utilisateur
		<div v-for="picture of picturesByIds" :key="picture.id">
			<img :src="picture.links[0].href" class="nasa-images" />
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
			picturesByIds: {
				get() {
					return this.$store.state.selectedPicturesByIds
				},
			},
			allPicturesSelected: {
				get() {
					return this.$store.getters.selectedPicturesByIds
				},
				set(value) {
					this.$store.dispatch('allPicturesSelected', value)
				},
			},
		},
		beforeCreate() {
			console.log('beforeCreate this.pictures :>> ', this.picturesByIds)
		},
		created() {
			this.$store.dispatch('findOnePictureById')
			console.log('this.pictures :>> ', this.picturesByIds)
			console.log('this.allPicturesSelected :>> ', this.allPicturesSelected)
		},
	}
</script>
