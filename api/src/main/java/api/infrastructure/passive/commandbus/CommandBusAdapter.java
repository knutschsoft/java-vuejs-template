package api.infrastructure.passive.commandbus;

import java.time.Duration;
import java.time.Instant;
import java.util.Optional;

import javax.inject.Inject;
import javax.inject.Singleton;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import api.application.Command;
import api.application.CommandBus;
import api.application.CommandHandler;
import io.micronaut.context.BeanContext;
import io.micronaut.inject.qualifiers.Qualifiers;
import io.reactivex.Maybe;

@Singleton
public class CommandBusAdapter implements CommandBus {

    private static final Logger LOGGER = LoggerFactory.getLogger(CommandBusAdapter.class);

    @Inject
    private BeanContext beanContext;

    @Override
    @SuppressWarnings("unchecked")
    public <T, C extends Command<T>> Maybe<T> execute(
            @Valid C command
    ) {
        Instant start = Instant.now();
        return Maybe.just(command).flatMap(c -> {
            Optional<CommandHandler> commandHandler = beanContext
                    .findBean(CommandHandler.class,
                              Qualifiers.byTypeArguments(
                                      command.getClass()));

            if (!commandHandler.isPresent()) {
                throw new IllegalStateException(String.format(
                        "Couldn't find handler for command: %s ", command));
            }

            commandHandler.ifPresent(h -> {
                try {
                    h.handle(command);
                } catch (Exception e) {
                    command.reject(e);
                }
            });
            return c.getResult()
                    .doOnError(e -> {
                        Instant finish = Instant.now();
                        double timeElapsed = Duration
                                .between(start, finish).toMillis() / 1000.0;
                        LOGGER.error(String.format(
                                "Rejected command: %s after %s seconds", command, timeElapsed), e);
                    }).doOnSuccess(e -> {
                        Instant finish = Instant.now();
                        double timeElapsed = Duration
                                .between(start, finish).toMillis() / 1000.0;
                        LOGGER.info(String.format(
                                "Resolved command: %s after %s seconds", command, timeElapsed));
                    });
        });
    }
}
