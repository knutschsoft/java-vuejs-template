package api.infrastructure.active.api.filter;

import org.reactivestreams.Publisher;

import io.micronaut.core.async.publisher.Publishers;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.MutableHttpResponse;
import io.micronaut.http.annotation.Filter;
import io.micronaut.http.filter.HttpServerFilter;
import io.micronaut.http.filter.ServerFilterChain;

@Filter("/**")
public class BasicRealmFilter implements HttpServerFilter {

    @Override
    public Publisher<MutableHttpResponse<?>> doFilter(
            HttpRequest<?> request, ServerFilterChain chain) {
        return Publishers.map(
                chain.proceed(request),
                response -> {
                    if (response.getStatus() == HttpStatus.UNAUTHORIZED) {
                        response.header("WWW-Authenticate",
                                "Basic realm=\"Api\"");
                    }
                    return response;
                }
        );
    }
}
