import Vue from 'vue'

var logged_user = null;

function mockasync (data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({data: data}), 2000)
  })
}

const api = {
    login(username, password){
        if(password){
            logged_user = {
                username: username,
                first_name: 'Mark',
                last_name: 'Zuckerberg',
                email: 'zuck@facebook.com',
                notifications_enabled: true,
                permissions:{
                    ADMIN: username == 'admin',
                    STAFF: username == 'admin',
                }
            };
        }
        return mockasync(logged_user);
    },
    logout(){
        logged_user = null;
        return mockasync({});
    },
    whoami(){
        return mockasync(logged_user ? {
            authenticated: true,
            user: logged_user,
        } : {authenticated: false});
    },
    add_todo(newtask){
        return mockasync({description: newtask, done: false});
    },
    list_todos(){
        return mockasync({
            todos: [
                {description: 'Do the laundry', done: true},
                {description: 'Walk the dog', done: false}
            ]
        });
    },
    list_tweets(username){
        const d = new Date();
        const _1min = 60000;
        const _1h = 60 * _1min;
        const d1 = new Date(d- 16 * _1min);
        const d2 = new Date(d- 2 * _1h);
        const d3 = new Date(d- 48 * _1h);

        return mockasync([
            {
              id: 1,
              author_name: 'Issac Newton',
              author_username: username || '@isaacnewthon',
              author_avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Sir_Isaac_Newton_%281643-1727%29.jpg',
              created_at: d1.toISOString(),
              text: 'A tendência dos corpos, quando  nehuma força é exercida sobre eles, é permanecer em seu estado natural, ou seja, repouso ou movimento retilíne e uniforme',
            },
            {
              id: 2,
              author_name: 'René Descartes',
              author_username: username || '@descates',
              author_avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/800px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg',
              created_at:  d2.toISOString(),
              text: 'Penso, logo existo',
            },
            {
              id: 3,
              author_name: 'Albert Einstein',
              author_username: username || '@einstein',
              author_avatar: 'data:image/jpeg;base64,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',
              created_at:  d3.toISOString(),
              text: 'Insanidade é continuar fazendo sempre a mesma coisa e esperar resultados diferentes'
            },
        ])
    }
};

export default api;
