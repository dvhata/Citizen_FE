import axiosClient from "../config/axiosClient";

const statisticApi = {
    amount: (
        permission: any,
        token?: any,
    ) => {
        const url = '/statistic/amount';
        return axiosClient
            .post(
                url,
                {
                    permission,
                },
                {
                    headers: { Authorization: "Bearer " + token },
                }
            )
            .then((response) => response.data);
    },

    gender: (
        permission?: any,
        token?: any,

    ) => {
        const url = `/statistic/gender`;
        return axiosClient
            .post(
                url,
                {
                    permission,
                },
                {
                    headers: { Authorization: "Bearer " + token },
                }
            )
            .then((response) => response.data);
    },

    age: (
        permission?: any,

        token?: any,

    ) => {
        const url = `/statistic`;
        return axiosClient
            .post(
                url,
                {
                    permission,

                },
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

export default statisticApi;