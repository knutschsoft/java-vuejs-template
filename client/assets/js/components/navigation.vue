<template>
    <div>
        <b-navbar
            toggleable="lg"
            type="dark"
            variant="dark"
        >
            <b-navbar-brand href="#">
                WirVsVirusApp
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse" />

            <b-collapse
                id="nav-collapse"
                is-nav
            >
                <b-navbar-nav>
                    <b-nav-item
                        to="/home"
                        router-tag="button"
                        link-classes="btn btn-sm btn-outline-secondary"
                    >
                        Home
                    </b-nav-item>
                    <b-nav-item
                        to="/studiengänge"
                        router-tag="button"
                        link-classes="btn btn-sm btn-outline-secondary"
                    >
                        Studiengänge
                    </b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                            <b-icon-person-fill />
                        </template>
                        <b-dropdown-item
                            to="/login"
                            router-tag="button"
                            link-classes="btn btn-sm btn-outline-secondary"
                            href="#"
                        >
                            Login
                        </b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    "use strict";

    export default {
        name: "Navigation",
        data: function () {
            return {};
        },
        mounted: function () {
        }
    }
</script>

<style scoped>

</style>
