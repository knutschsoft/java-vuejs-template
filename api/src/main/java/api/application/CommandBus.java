package api.application;

import javax.validation.Valid;

import io.reactivex.Maybe;

public interface CommandBus {

    <T, C extends Command<T>> Maybe<T> execute(
            @Valid C command
    );
}
