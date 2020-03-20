<template>
    <div>
        <h1 class="mt-3">
            Verwaltung der Studiengänge
        </h1>

        <Error
            v-if="hasError"
            :error="error"
        />

        <div
            v-else-if="!hasStudiengaenge"
            class="row"
        >
            <div class="col-12">
                <b-form class="px-2 pt-2 pb-0">
                    <b-form-file
                        v-model="file"
                        class="studiengang-dropzone"
                        :state="Boolean(file)"
                        :disabled="isLoading"
                        accept=".xlsx"
                        placeholder="Studiengänge importieren..."
                        drop-placeholder="Ziehe die xlsx-Datei hier rein..."
                        @input="handleStudiengangUpload"
                    />
                </b-form>

                <div
                    v-if="isLoading"
                >
                    <b-progress
                        value="100"
                        variant="info"
                        striped
                        animated
                        label="Loading..."
                        class="mt-2 mx-2"
                        height="2rem"
                    />
                </div>
                <div
                    v-else
                    class="px-2 text-black-50 font-italic"
                >
                    Bisher keine Studiengänge vorhanden. Lade doch welche hoch!
                </div>
            </div>
        </div>

        <div
            v-for="studiengang in studiengaenge"
            v-else
            :key="studiengang.title"
            class="row col"
        >
            <div class="col-12 mt-3 border-bottom border-top">
                Studiengang: {{ studiengang.title }} ({{ studiengang.abbreviation }})
                <br>
                Fakultät: {{ studiengang.fakultaet }}
                <br>
                Abschluss: {{ studiengang.abschluss }} ({{ studiengang.abschlussArt }})
            </div>
        </div>
    </div>
</template>

<script>
    "use strict";
    import Error from './error';

    export default {
        name: "Studiengaenge",
        components: {
            Error,
        },
        props: {},
        data: function () {
            return {
                file: null,
            }
        },
        computed: {
            isLoading() {
                return this.$store.getters["studiengang/isLoading"];
            },
            hasError() {
                return this.$store.getters["studiengang/hasError"];
            },
            error() {
                return this.$store.getters["studiengang/error"];
            },
            hasStudiengaenge() {
                return this.$store.getters["studiengang/hasStudiengaenge"];
            },
            studiengaenge() {
                return this.$store.getters["studiengang/studiengaenge"];
            }
        },
        watch: {
        },
        mounted() {
            // this.$store.dispatch('studiengang/findAll');
        },
        methods: {
            async handleStudiengangUpload () {
                await this.$store.dispatch(
                    "studiengang/upload",
                    [
                        this.$data.file
                    ]
                );
            },
        },
    }
</script>

<style scoped>

</style>
