package api.application.handler;

import javax.inject.Singleton;

import api.application.CommandHandler;
import api.application.command.SayHello;

@Singleton
public class SayHelloHandler implements CommandHandler<SayHello> {

    @Override
    public void handle(SayHello command) {
        command.resolve("Hello " + command.getName());
    }
}
