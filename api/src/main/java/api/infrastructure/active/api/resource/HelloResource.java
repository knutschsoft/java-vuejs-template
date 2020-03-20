package api.infrastructure.active.api.resource;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;

import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import io.reactivex.Maybe;
import api.application.CommandBus;
import api.application.command.SayHello;

@Controller("/hello")
public class HelloResource {

    @Inject
    private CommandBus commandBus;

    @Post
    @PermitAll
    public Maybe<String> sayHello(
            String name
    ) {
        return commandBus.execute(
                new SayHello(name)
        );
    }
}
