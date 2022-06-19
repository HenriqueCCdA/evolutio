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
    get_user_details(username){
        const avatar = {
            '@isaacnewthon': 'https://upload.wikimedia.org/wikipedia/commons/8/83/Sir_Isaac_Newton_%281643-1727%29.jpg',
            '@descartes': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/800px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg',
            '@einstein':  'https://conteudo.imguol.com.br/c/entretenimento/c3/2017/11/24/albert-einstein-1511565360545_v2_3x4.jpg'
        }[username];
        return mockasync({
            username: username,
            avatar: avatar,
            last_tweet: 'Penso, logo existo',
            ifollow: true
        });
    },
    tweet(text){
        return mockasync({
            id: 1000,
            author_name: logged_user.username,
            author_username: logged_user.username,
            author_avatar: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Sir_Isaac_Newton_%281643-1727%29.jpg',
            created_at: new Date().toISOString(),
            text: text,
        });
    },
    follow(username){
        return mockasync();
    },
    unfollow(username){
        return mockasync();
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
              author_username: username || '@descartes',
              author_avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/800px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg',
              created_at:  d2.toISOString(),
              text: 'Penso, logo existo',
            },
            {
              id: 3,
              author_name: 'Albert Einstein',
              author_username: username || '@einstein',
              author_avatar: 'https://conteudo.imguol.com.br/c/entretenimento/c3/2017/11/24/albert-einstein-1511565360545_v2_3x4.jpg',
              created_at:  d3.toISOString(),
              text: 'Insanidade é continuar fazendo sempre a mesma coisa e esperar resultados diferentes'
            },
        ])
    }
};

export default api;
