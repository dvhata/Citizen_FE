import axiosClient from "../config/axiosClient";
class HamletApi {
  hamletList = (token?: string, permission?: string, value?: string) => {
    const url = "/hamlet/list";
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

  hamletRegist = (
    token?: string,
    permission?: string,
    name?: string,
    id?: string
  ) => {
    const url = "/hamlet";
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

  hamletDelete = (token?: string, id?: any) => {
    const url = "/hamlet/" + id;
    return axiosClient
      .delete(url, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => response.data);
  };

  hamletUpdate = (
    token?: string,
    permission?: any,
    name?: string,
    id?: string
  ) => {
    const url = "/hamlet/" + permission;
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

const hamletApi = new HamletApi();
export default hamletApi;
