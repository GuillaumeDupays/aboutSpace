const style = {
	state: {
		button: {
			style: {
				isClicked: false,
				label: '',
				class: '',
			},
			initialStyle: {
				isClicked: false,
				label: 'Bouton non cliqué',
				class: 'btn-select-images',
			},
			isClickedStyle: {
				isClicked: true,
				label: 'Bouton cliqué',
				class: 'clicked',
			},
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
