const member = {
    state: {
        temp: {}
    },
    mutations: {
        SET_TEMP: (state, val) => {
            state.temp = val;
        }
    },
    actions: {
        setTemp: ({ commit },val) => {
            commit('SET_TEMP', val)
        }
    }
}

export default member