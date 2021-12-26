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
    area?: string
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
          area,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => response.data);
  };

  changePassword = (
    token?: string,
    // id?: string,
    permission?: any,
    password?: string
  ) => {
    const url = "/user/update_password/" + permission;
    return axiosClient
      .post(
        url,
        {
          permission,
          password,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((response) => response.data);
  };
}

const userApi = new UserApi();
export default userApi;
