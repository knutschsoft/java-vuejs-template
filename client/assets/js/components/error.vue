<template>
    <div
        class="row col mx-0"
    >
        <div
            class="alert alert-danger col-12"
            role="alert"
        >
            <p>
                <b>{{ error.data.title }} ({{ error.data.status }})</b>
            </p>
            {{ error.data.detail }}
        </div>
    </div>
</template>

<script>
    "use strict";
    export default {
        name: "Error",
        props: {
            error: {
                required: true,
                type: Object,
            },
        }
    }
</script>

<style scoped>

</style>
