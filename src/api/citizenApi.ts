import axiosClient from "../config/axiosClient";

const citizenApi = {
    getAll: (
        permission: any,
        token?: any,
        name?: any,
        ID_number?: any,
        date_of_birth?: any,
        gender?: any,
        hometown?: any,
    ) => {
        const url = '/citizen/list';
        return axiosClient
            .post(
                url,
                {
                    permission,
                    name,
                    ID_number,
                    date_of_birth,
                    gender,
                    hometown,
                },
                {
                    headers: { Authorization: "Bearer " + token },
                }
            )
            .then((response) => response.data);
    },

    create: (
        permission?: any,
        token?: any,
        name?: any,
        ID_number?: any,
        date_of_birth?: any,
        gender?: any,
        hometown?: any,
        permanent_address?: any,
        temporary_address?: any,
        religion?: any,
        education_level?: any,
        job?: any
    ) => {
        const url = `/citizen`;
        return axiosClient
            .post(
                url,
                {
                    permission,
                    name,
                    ID_number,
                    date_of_birth,
                    gender,
                    hometown,
                    permanent_address,
                    temporary_address,
                    religion,
                    education_level,
                    job
                },
                {
                    headers: { Authorization: "Bearer " + token },
                }
            )
            .then((response) => response.data);
    },

    update: (
        permission?: any,
        id?: any,
        token?: any,
        name?: any,
        ID_number?: any,
        date_of_birth?: any,
        gender?: any,
        hometown?: any,
        permanent_address?: any,
        temporary_address?: any,
        religion?: any,
        education_level?: any,
        job?: any
    ) => {
        const url = `/citizen/${id}`;
        return axiosClient
            .put(
                url,
                {
                    permission,
                    token,
                    name,
                    ID_number,
                    date_of_birth,
                    gender,
                    hometown,
                    permanent_address,
                    temporary_address,
                    religion,
                    education_level,
                    job
                },
                {
                    headers: { Authorization: "Bearer " + token },
                }
            )
            .then((response) => response.data);
    },
    delete: (
        token: any,
        id: any
    ) => {
        const url = `/citizen/${id}`;
        return axiosClient
            .delete(
                url,
                {
                    headers: { Authorization: "Bearer " + token },
                }
            )
            .then((response) => response.data);
    },

    provinceList: (token?: any, value?: any) => {
        const url = "/province/list";
        return axiosClient
            .post(
                url,
                {

                    id: value,
                },
                {
                    headers: { Authorization: "Bearer " + token },
                }
            )
            .then((response) => response.data);
    },

    districtList: (token?: any, value?: any) => {
        const url = "/district/list";
        return axiosClient
            .post(
                url,
                {
                    permission: value,
                },
                {
                    headers: { Authorization: "Bearer " + token },
                }
            )
            .then((response) => response.data);
    },

    wardList: (token?: any, value?: any) => {
        const url = "/ward/list";
        return axiosClient
            .post(
                url,
                {
                    permission: value,
                },
                {
                    headers: { Authorization: "Bearer " + token },
                }
            )
            .then((response) => response.data);
    },

    hamletList: (token?: any, value?: any) => {
        const url = "/hamlet/list";
        return axiosClient
            .post(
                url,
                {
                    permission: value,
                },
                {
                    headers: { Authorization: "Bearer " + token },
                }
            )
            .then((response) => response.data);
    },

}

export default citizenApi;