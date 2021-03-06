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
 
}

const provinceApi = new ProvinceApi();
export default provinceApi;