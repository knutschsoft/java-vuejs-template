package template.api.application;

import javax.annotation.security.PermitAll;

@PermitAll
public interface CommandHandler<C extends Command> {

   void handle(C command) throws Exception;
}
