package template.api.domain.shared;

import java.time.ZonedDateTime;

public final class ZonedDateTimeUtils {

    private ZonedDateTimeUtils() {
    }

    public static boolean equals(ZonedDateTime z1, ZonedDateTime z2) {
        if (z1 == z2) {
            return true;
        }
        if (z1 == null || z2 == null) {
            return false;
        }
        return z1.isEqual(z2);
    }

    public static int hash(ZonedDateTime z) {
        return z != null ? z.toInstant().hashCode() : 0;
    }
}
