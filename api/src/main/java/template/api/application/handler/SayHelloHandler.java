package template.api.application.handler;

import javax.inject.Singleton;

import template.api.application.CommandHandler;
import template.api.application.command.SayHello;

@Singleton
public class SayHelloHandler implements CommandHandler<SayHello> {

    @Override
    public void handle(SayHello command) {
        command.resolve("Hello " + command.getName());
    }
}
