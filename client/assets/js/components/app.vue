<template>
    <div class="container">
        <b-alert
            v-model="showError"
            class="position-fixed fixed-top m-0 rounded-0"
            style="z-index: 2000;"
            dismissible
        >
            {{ errorData }}
        </b-alert>
        <navigation />

        <router-view />
    </div>
</template>

<script>
    import Navigation from "./navigation";

    export default {
        name: 'App',
        components: {Navigation},
        props: {},
        data() {
            return {
                errorData: '',
                showError: false
            }
        },
        computed: {
                   },
        created() {
            this.axios.interceptors.response.use(undefined, (err) => {
                Promise(() => {
                    if (err.response.status === 401) {
                        this.$router.push({path: "/login"})
                    // } else if (err.response.status === 500) {
                        // this.showError = true;
                    }
                    // this.errorData = err.response.data;
                });

                return Promise.reject(err.response);
            });
        }
    }
</script>

<style lang="scss" scoped>
</style>
