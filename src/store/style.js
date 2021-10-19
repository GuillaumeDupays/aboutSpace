const style = {
	state: {
		button: {
			isClicked: false,
			label: 'Bouton non cliqué',
			class: 'btn-select-images',
		},
	},
	mutations: {
		ACTIVE_BUTTON(state, newVal) {
			state.button = newVal
		},
	},
	actions: {
		activeButton({ commit }, payload) {
			commit('ACTIVE_BUTTON', payload)
		},
	},
}
export default style
