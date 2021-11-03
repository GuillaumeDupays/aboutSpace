const style = {
	state: {
		isChecked: false,
		button: {
			style: {
				label: '',
				class: '',
			},
			initialStyle: {
				label: 'Save selection',
				class: 'btn-select-images',
			},
			validation: {
				label: 'Selection is saved',
				class: 'clicked',
			},
		},
	},
	mutations: {
		STYLE_BUTTON(state, newVal) {
			if (state.button.style.label === '') {
				state.button.style = newVal.button.initialStyle
			}
		},
		IS_CHECKED(state, newVal) {
			state.isChecked = newVal
		},
		ACTIVE_BUTTON(state, newVal) {
			state.button = newVal
		},
	},
	actions: {
		activeButton({ commit }, payload) {
			commit('ACTIVE_BUTTON', payload)
		},
	},
	getters: {
		getStyleButton(state) {
			return state.button
		},
	},
}
export default style
