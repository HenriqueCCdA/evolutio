const store = new Vuex.Store({
    state:{
        count: 0,
        tarefas: [
            {tarefa: 'Lavar a roupa', feita: false},
            {tarefa: 'Trocar fralda do neném', feita: true},
            {tarefa: 'Passer com o cachorro', feita: false},
        ]
    },
    mutations: {
        increment: function(state){
            state.count++;
        },
        add_tarefa: function(state, novatarefa){
            state.tarefas.push({tarefa: novatarefa, feita: false});
        },
        remove_tarefa: function(state, tarefa){
            let idx = state.tarefas.indexOf(tarefa);
            state.tarefas.splice(idx, 1);
        }
    }
});

window.STORE = store;