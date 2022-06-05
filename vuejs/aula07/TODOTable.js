Vue.component('todo-table', {
    props: ['tarefas'],
    data: function(){
        return {};
    },
    methods: {
        remove: function(tarefa){
            let index = this.tarefas.indexOf(tarefa);
            this.tarefas.splice(index, 1);
        }
    },
    template: `
        <table class="table">
        <thead>
            <th></th>
            <th>To-do</th>
            <th></th>
        </thead>
        <tbody>
            <tr v-for="tarefa in tarefas">
                <td><input type="checkbox" v-model="tarefa.feita"></td>
                <td :class="{risca: tarefa.feita}">{{ tarefa.tarefa }}</td>
                <td>
                    <button @click="remove(tarefa)">
                        <span class="icon has-text-info"><i class="fa fa-trash-o"></i></span>
                    </button>
                </td>
            </tr>
        </tbody>
        </table>
    `,
})