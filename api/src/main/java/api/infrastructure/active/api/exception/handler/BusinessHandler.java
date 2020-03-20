package api.infrastructure.active.api.exception.handler;

import api.domain.exception.BusinessException;
import io.micronaut.http.HttpRequest;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Error;
import io.micronaut.http.hateoas.JsonError;
import io.micronaut.http.hateoas.Link;

@Controller
public class BusinessHandler {

    @Error(exception = BusinessException.class, global = true)
    public HttpResponse<JsonError> handle(HttpRequest request, BusinessException exception) {
        JsonError body = new JsonError(exception.getMessage())
                .link(Link.SELF, Link.of(request.getUri()));

        return HttpResponse
                .<JsonError>status(HttpStatus.BAD_REQUEST)
                .body(body);
    }
}
