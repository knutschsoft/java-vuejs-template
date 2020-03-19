package template.api.application.command;

import java.util.Objects;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import template.api.application.Command;

public class SayHello extends Command<String> {

    @NotNull
    @NotBlank
    @Size(min = 0, max = 255)
    private String name;

    public SayHello(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        SayHello sayHello = (SayHello) o;
        return Objects.equals(name, sayHello.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }

    @Override
    public String toString() {
        return "SayHello{" +
                "name='" + name + '\'' +
                '}';
    }
}
