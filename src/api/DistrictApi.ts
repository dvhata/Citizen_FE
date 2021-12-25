import axiosClient from "../config/axiosClient";
class DistrictApi {
  districtList = (token?: string, permission?: string, value?: string) => {
    const url = "/district/list";
    return axiosClient
      .post(
        url,
        {
          permission,
          name: value,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => response.data);
  };

  districtRegist = (
    token?: string,
    permission?: string,
    name?: string,
    id?: string
  ) => {
    const url = "/district";
    return axiosClient
      .post(
        url,
        { permission, name, id },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => response.data);
  };

  districtDelete = (token?: string, id?: any) => {
    const url = "/district/" + id;
    return axiosClient
      .delete(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => response.data);
  };

  districtUpdate = (
    token?: string,
    permission?: any,
    name?: string,
    id?: string
  ) => {
    const url = "/district/" + permission;
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

const districtApi = new DistrictApi();
export default districtApi;
