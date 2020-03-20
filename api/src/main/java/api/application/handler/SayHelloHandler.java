package api.application.handler;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.transaction.Transactional;

import api.application.CommandHandler;
import api.application.command.SayHello;
import api.application.persistence.HelloRepository;
import api.domain.model.hello.Hello;

@Singleton
public class SayHelloHandler implements CommandHandler<SayHello> {

    @Inject
    private HelloRepository helloRepository;

    @Override
    @Transactional
    public void handle(SayHello command) {
        Hello hello = new Hello(null, command.getName());
        hello = helloRepository.save(hello);
        command.resolve("Hello " + command.getName() + ", you#ve got id: " + hello.getId());
    }
}
