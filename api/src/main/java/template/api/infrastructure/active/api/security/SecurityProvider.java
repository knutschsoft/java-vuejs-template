package template.api.infrastructure.active.api.security;

import java.util.Collections;
import java.util.Objects;

import javax.inject.Singleton;

import org.reactivestreams.Publisher;

import io.micronaut.context.annotation.Property;
import io.micronaut.security.authentication.AuthenticationFailed;
import io.micronaut.security.authentication.AuthenticationProvider;
import io.micronaut.security.authentication.AuthenticationRequest;
import io.micronaut.security.authentication.AuthenticationResponse;
import io.micronaut.security.authentication.UserDetails;
import io.reactivex.Flowable;

@Singleton
public class SecurityProvider implements AuthenticationProvider {

    @Property(name = "micronaut.security.basic.username")
    private String username;
    @Property(name = "micronaut.security.basic.password")
    private String password;

    @Override
    public Publisher<AuthenticationResponse> authenticate(
            AuthenticationRequest authenticationRequest
    ) {
        String username = authenticationRequest.getIdentity().toString();
        String password = authenticationRequest.getSecret().toString();

        if (Objects.equals(this.username, username)
                && Objects.equals(this.password, password)) {
            return Flowable.just(
                    new UserDetails(
                            username,
                            Collections.emptyList()
                    )
            );
        }
        return Flowable.just(
                new AuthenticationFailed());
    }
}