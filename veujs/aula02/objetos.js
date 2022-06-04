Object.defineProperty(o, 'b', {
    get: function(){
        console.log('Vai retornar o valor de b');
        return 42;
    }
});

Object.defineProperty(o, 'c', {
    get: function(){
        console.log('vai retornar o valor de c');
        return this._c;
    },
    set: function(v){
        console.log('vai sertar c = ' + v);
        this._c = v;
    }
})