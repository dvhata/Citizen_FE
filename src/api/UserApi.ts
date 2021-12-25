import axiosClient from "../config/axiosClient";
class UserApi {
  login = (name?: string, password?: string) => {
    const url = "/login";
    return axiosClient
      .post(url, {
        name,
        password,
      })
      .then((response) => response.data);
  };

  register = (
    token?: string,
    password?: string,
    permission?: string,
    role?: number,
    area?: string
  ) => {
    const url = "/register";
    return axiosClient
      .post(
        url,
        { password, permission, role, area },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => response.data);
  };

  list = (
    token?: string,
    role?: number,
    permission?: string,
    name?: string
  ) => {
    const url = "/user/list";
    return axiosClient
      .post(
        url,
        {
          role,
          permission,
          name,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => response.data);
  };

  delete = (token?: string, permission?: any) => {
    const url = "/user/" + permission;
    return axiosClient
      .delete(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => response.data);
  };

  update = (
    token?: string,
    // id?: string,
    permission?: any,
    role?: number,
    start_at?: any,
    end_at?: any,
    is_active?: boolean,
    area?: string,
  ) => {
    const url = "/user/update/" + permission;
    return axiosClient
      .post(
        url,
        {
          permission,
          role,
          start_at,
          end_at,
          is_active,
          area
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => response.data);
  };

  // provinceDelete = (token?: string, id?: any) => {
  //   const url = "/province/" + id;
  //   return axiosClient
  //     .delete(
  //       url,
  //       {
  //         headers: { Authorization: "Bearer " + token },
  //       }
  //     )
  //     .then((response) => response.data);
  // };

  // provinceUpdate = (token?: string, id?: any) => {
  //   const url = "/province/" + id;
  //   return axiosClient
  //     .put(
  //       url,{},
  //       {
  //         headers: { Authorization: "Bearer " + token },
  //       }
  //     )
  //     .then((response) => response.data);
  // };
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

const userApi = new UserApi();
export default userApi;
