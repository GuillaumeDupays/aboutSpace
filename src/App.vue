<template>
	<div id="app">
		<div id="nav">
			<router-link to="/">Search</router-link> |
			<router-link to="/my-favorites-pictures"
				>My selected pictures ({{ totalSelectedPictures }})</router-link
			>
			|
			<router-link to="/saved">Saved selections</router-link>
		</div>
		<router-view />
	</div>
</template>
<script>
	export default {
		computed: {
			totalSelectedPictures: {
				get() {
					return this.$store.state.totalSelectedPictures
				},
			},
		},
	}
</script>

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	#nav {
		padding: 30px;
	}

	#nav a {
		font-weight: bold;
		color: #2c3e50;
	}

	#nav a.router-link-exact-active {
		color: #42b983;
	}
</style>
