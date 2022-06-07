const store = new Vuex.Store({
    state:{
        count: 0
    },
    mutations: {
        increment: function(state){
            state.count++;
        }
    }
});

window.STORE = store;