import axiosClient from "../config/axiosClient";
class ProvinceApi {
  provinceList = (token?: string, value?: string) => {
    const url = "/province/list";
    return axiosClient
      .post(
        url,
        {
          name: value,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => response.data);
  };

  provinceRegist = (token?: string, name?: string, id?: string) => {
    const url = "/province";
    return axiosClient
      .post(
        url,
        { name, id },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => response.data);
  };

  provinceDelete = (token?: string, id?: any) => {
    const url = "/province/" + id;
    return axiosClient
      .delete(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => response.data);
  };

  provinceUpdate = (
    token?: string,
    permission?: any,
    name?: string,
    id?: string
  ) => {
    const url = "/province/" + permission;
    return axiosClient
      .put(
        url,
        {
          name,
          id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => response.data);
  };

  //     list = (params?: any) => {
  //         const url = "/apartments";
  //         return axiosClient.get(url, {
  //           params
  //          }).then(response => response.data);
  //       };

  //       get = (name?: string) => {
  //         const url = "/apartments/" + name;
  //         return axiosClient.get(url).then(response => response.data);
  //       };

  //       count = (params?: any) => {
  //         const url = "/apartments/all-count";
  //         return axiosClient.get(url, {
  //           params
  //          }).then(response => response.data);
  //       };

  //       sort = (sortType?: string) => {
  //         const url = "/apartments/sort/" + sortType;
  //         return axiosClient.get(url,).then(response => response.data);
  //       };

  //       relate = (slug?: string, apartmentSlug?:string) => {
  //         const url = "/apartments/" + apartmentSlug + "/related-products/" + slug;
  //         return axiosClient.get(url).then(response => response.data);
  //       };

  //       checkOrder = (apartmentSlug?: string) => {
  //         const url = "/apartments/" + apartmentSlug + "/check-order";
  //         return axiosClient.get(url).then(response => response.data);
  //       };

  //       getFeedback = (apartmentSlug?: string) => {
  //         const url = "/apartments/" + apartmentSlug + "/get-feedbacks";
  //         return axiosClient.get(url).then(response => response.data);
  //       };

  //   authentication = (token?: any) => {
  //     const url = "/users/auth-token";
  //     return axiosClient
  //       .get(url, {
  //         headers: { Authorization: token },
  //       })
  //       .then((response) => response.data);
  //   };

  //   get = (slug?: string) => {
  //     const url = "/admins/" + slug;
  //     return axiosClient.get(url).then((response) => response.data);
  //   };

  //   waiting = (token?: any) => {
  //     const url = "/admins/orders/waiting";
  //     return axiosClient
  //       .get(url, {
  //         headers: { Authorization: token },
  //       })
  //       .then((response) => response.data);
  //   };

  //   confirmed = (token?: any) => {
  //     const url = "/admins/orders/confirmed";
  //     return axiosClient
  //       .get(url, {
  //         headers: { Authorization: token },
  //       })
  //       .then((response) => response.data);
  //   };

  //   staying = (token?: any) => {
  //     const url = "/admins/orders/staying";
  //     return axiosClient
  //       .get(url, {
  //         headers: { Authorization: token },
  //       })
  //       .then((response) => response.data);
  //   };
}

const provinceApi = new ProvinceApi();
export default provinceApi;
