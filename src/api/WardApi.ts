import axiosClient from "../config/axiosClient";
class WardApi {
  wardList = (token?: string, permission?: string, value?: string) => {
    const url = "/ward/list";
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

  wardRegist = (
    token?: string,
    permission?: string,
    name?: string,
    id?: string
  ) => {
    const url = "/ward";
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

  wardDelete = (token?: string, id?: any) => {
    const url = "/ward/" + id;
    return axiosClient
      .delete(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => response.data);
  };

  wardUpdate = (
    token?: string,
    permission?: any,
    name?: string,
    id?: string
  ) => {
    const url = "/ward/" + permission;
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

const wardApi = new WardApi();
export default wardApi;
