var CircuitBreaker = require("vertx-circuit-breaker-js/circuit_breaker");

var breaker = CircuitBreaker.create("hola", vertx,
    vertx.getOrCreateContext().config()["breaker"]);

vertx.eventBus().consumer("hola/chain", function (message) {
    var name = message.body();
    breaker.executeWithFallback(
        function (future) {
            vertx.eventBus().send("namaste/chain", name, function (msg, err) {
                if (err) {
                    future.fail("failed to invoke namaste");
                } else {
                    var response = msg.body();
                    response["hola"] = "Hola " + name;
                    message.reply(response);
                    future.complete();
                }
            });
        },
        function () {
            message.reply({
                "namaste": "failed!",
                "hola": "Hola " + name
            });
        }
    );
});

vertx.eventBus().consumer("hola", function (message) {
    message.reply({"hola": "Hola " + message.body()});
});

vertx.eventBus().consumer("hola/health", function (message) {
    message.reply("I'm ok");
});