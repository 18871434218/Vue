function main(){
    var server = new server({
        "helloworld.Greeter": {
            sayHello: sayHello
        }
    });
    server.bind('');
    server.listen();
}