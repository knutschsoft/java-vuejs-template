import StudiengangAPI from "../../api/studiengang";

const UPLOADING_STUDIENGANG = "UPLOADING_STUDIENGANG",
    UPLOADING_STUDIENGANG_SUCCESS = "UPLOADING_STUDIENGANG_SUCCESS",
    UPLOADING_STUDIENGANG_ERROR = "UPLOADING_STUDIENGANG_ERROR",
    FETCHING_STUDIENGAENGE = "FETCHING_STUDIENGAENGE",
    FETCHING_STUDIENGAENGE_SUCCESS = "FETCHING_STUDIENGAENGE_SUCCESS",
    FETCHING_STUDIENGAENGE_ERROR = "FETCHING_STUDIENGAENGE_ERROR";

export default {
    namespaced: true,
    state: {
        isLoading: false,
        error: null,
        studiengaenge: []
    },
    getters: {
        isLoading(state) {
            return state.isLoading;
        },
        hasError(state) {
            return state.error !== null;
        },
        error(state) {
            return state.error;
        },
        hasStudiengaenge(state) {
            return state.studiengaenge.length > 0;
        },
        studiengaenge(state) {
            return state.studiengaenge;
        }
    },
    mutations: {
        [UPLOADING_STUDIENGANG](state) {
            state.isLoading = true;
            state.error = null;
        },
        [UPLOADING_STUDIENGANG_SUCCESS](state, studiengaenge) {
            state.isLoading = false;
            state.error = null;
            state.studiengaenge = studiengaenge;
        },
        [UPLOADING_STUDIENGANG_ERROR](state, error) {
            state.isLoading = false;
            state.error = error;
            state.studiengaenge = [];
        },
        [FETCHING_STUDIENGAENGE](state) {
            state.isLoading = true;
            state.error = null;
            state.studiengaenge = [];
        },
        [FETCHING_STUDIENGAENGE_SUCCESS](state, studiengaenge) {
            state.isLoading = false;
            state.error = null;
            state.studiengaenge = studiengaenge;
        },
        [FETCHING_STUDIENGAENGE_ERROR](state, error) {
            state.isLoading = false;
            state.error = error;
            state.studiengaenge = [];
        }
    },
    actions: {
        async upload({ commit }, [ file ]) {
            commit(UPLOADING_STUDIENGANG);
            try {
                let response = await StudiengangAPI.upload(file);
                commit(UPLOADING_STUDIENGANG_SUCCESS, response.data);
                return response.data;
            } catch (error) {
                commit(UPLOADING_STUDIENGANG_ERROR, error);
                return null;
            }
        },
        async findAll({ commit }) {
            commit(FETCHING_STUDIENGAENGE);
            try {
                let response = await StudiengangAPI.findAll();
                commit(FETCHING_STUDIENGAENGE_SUCCESS, response.data);
                return response.data;
            } catch (error) {
                commit(FETCHING_STUDIENGAENGE_ERROR, error);
                return null;
            }
        },
    }
};
