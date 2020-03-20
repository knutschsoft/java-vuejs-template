<template>
    <div class="row m-auto pt-4 mt-4">
        <div
            class="col-sm-10 offset-sm-1 col-md-8 offset-md-2 offset-lg-3 col-lg-6 border border-dark p-4 mt-4"
        >
            <h2
                class="text-center mb-3"
            >
                Login
            </h2>
            <p class="text-center">
                Bitte melden Sie sich mit Ihrem Nutzernamen und Passwort an.
            </p>
            <div class="">
                <form>
                    <div
                        class="form-group input-group"
                    >
                        <input
                            class="form-control"
                            placeholder="Nutzername"
                            name="username"
                            aria-label="Nutzername"
                            aria-describedby="basic-addon-username"
                        >
                    </div>
                    <div
                        class="form-group input-group"
                    >
                        <input
                            placeholder="Passwort"
                            name="password"
                            class="form-control"
                        >
                    </div>
                    <div
                        class="form-group input-group"
                    >
                        <button
                            class="btn btn-dark btn-block"
                            type="submit"
                        >
                            Anmelden
                        </button>
                    </div>
                    <div
                        class="form-group input-group mb-0"
                    >
                        <button
                            class="btn btn-block btn-link"
                            type="submit"
                        >
                            Passwort vergessen oder noch kein Passwort?
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    "use strict";
    export default {
        name: "Login"
    }
</script>

<style scoped>

</style>
