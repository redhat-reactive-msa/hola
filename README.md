# hola

_A reactive microservice developed in JavaScript._

The ola microservice is developed in JavaScript. It is invocable using the vert.x event bus, and handles:

* messages on `hola` - replies with a _hola_ message
* messages on `hola/chain` - invokes the next service of the chain and replies with the result + a _hola_ message. The invocation to the next service is protected using a circuit breaker.

The detailed instructions to run the Red Hat Reactive MSA demo, can be found at the following repository: https://github.com/redhat-reactive-msa/redhat-reactive-msa

NOTE: This microservice is developed in JavaScript and runs on Nashorn.

## Execute the hola microservice locally

Open a command prompt and navigate to the root directory of this microservice.
Then to package this microservice run:

```
mvn clean package
```

Type this command to execute the application:

```
java -jar target/hola-0.0.1-SNAPSHOT-fat.jar -cluster -conf src/conf/config.json
```

## Execute on Openshift

Refer to https://github.com/redhat-reactive-msa/redhat-reactive-msa.
