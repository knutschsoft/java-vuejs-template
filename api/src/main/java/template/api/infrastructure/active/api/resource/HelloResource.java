package template.api.infrastructure.active.api.resource;

import java.util.List;

import javax.annotation.security.PermitAll;
import javax.inject.Inject;

import io.micronaut.data.model.query.builder.QueryResult;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Post;
import io.reactivex.Maybe;
import template.api.application.CommandBus;
import template.api.application.command.SayHello;

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
