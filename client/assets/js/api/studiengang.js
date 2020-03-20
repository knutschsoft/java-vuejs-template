import axios from "axios";

export default {
    upload(file) {
        let formData = new FormData();
        formData.append('file', file);
        return axios.post(
            '/api/studiengang-upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
    },
    findAll() {
        return axios.get("/api/studiengaenge");
    }
};
