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
    permissionModal?: any,
    permission?: any,
    name?: string,
    id?: string
  ) => {
    const url = "/hamlet/" + permissionModal;
    return axiosClient
      .put(
        url,
        {
          permission,
          name,
          id,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => response.data);
  };

  hamletCheckbox = (
    token?: string,
    permission?: any,
    is_done?: boolean
  ) => {
    const url = "/mark_done" ;
    return axiosClient
      .post(
        url,
        {
          permission,
          is_done
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
