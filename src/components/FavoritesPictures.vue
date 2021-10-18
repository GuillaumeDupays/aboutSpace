<template>
	<div class="favorites-pictures">
		<div v-for="picture of allPicturesSelected" :key="picture.id">
			<h3>{{ picture.title }}</h3>
			<img :src="picture.href" class="nasa-images" />
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
		beforeCreate() {},
		created() {
			console.log('this.pictures :>> ', this.picturesSelected)
			console.log('this.allPicturesSelected :>> ', this.allPicturesSelected)
		},
	}
</script>
