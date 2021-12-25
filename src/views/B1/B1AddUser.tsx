import {
  Affix,
  Button,
  Card,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Layout,
  message,
  Modal,
  Result,
  Row,
  Select,
  Switch,
  Typography,
} from "antd";
import { Footer, Header } from "antd/lib/layout/layout";
import Paragraph from "antd/lib/typography/Paragraph";
import userApi from "api/UserApi";
import Sidenav from "components/layout/Sidenav";
import { User } from "models/User/User";
import moment from "moment";
import { useEffect, useState } from "react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Hamlet } from "models/Hamlet/Hamlet";
import hamletApi from "api/HamletApi";


const { Header: AntHeader, Content, Sider } = Layout;

function B1AddUser() {
  const { Title, Text } = Typography;
  const { Search } = Input;

  // const onChange = (e: any) => console.log(`radio checked:${e.target.value}`);

  const [reverse, setReverse] = useState(false);

  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#1890ff");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type: any) => setSidenavType(type);
  const handleSidenavColor = (color: any) => setSidenavColor(color);
  const handleFixedNavbar = (type: any) => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);

  const [name, setName] = React.useState("");
  const [area, setArea] = React.useState("");
  const [password, setPassword] = React.useState();
  const [start_at, setStartAt] = React.useState<Date>();
  const [end_at, setEndAt] = React.useState<Date>();
  const [permission, setPermission] = React.useState(
    localStorage.getItem("permission")
  );

  const [status, setStatus] = React.useState<boolean>();
  const [isLogin, setLogin] = React.useState();
  const [userData, setUserData] = React.useState<User>();
  const [hamletList, setHamletList] = React.useState<Hamlet>();
  const [userList, setUserList] = React.useState<User>();
  const dateFormat = "YYYY-MM-DD";

  let token = localStorage.getItem("token");
  let role_temp = localStorage.getItem("role");
  let role: number;
  if (typeof role_temp === "string") {
    role = JSON.parse(localStorage.getItem("role") as string);
  }
  let startAt = localStorage.getItem("start_at");
  let endAt = localStorage.getItem("end_at");
  let isActive = localStorage.getItem("is_active");

  const { Option } = Select;
  const { RangePicker } = DatePicker;

  React.useEffect(() => {
    const fetchData = () => {
      hamletApi
        .hamletList(token as string, permission as string)
        .then((response) => {
          setHamletList(response);
        });
      userApi
        .list(token as string, role as number, permission as string)
        .then((response) => {
          setUserList(response);
        });
    };
    fetchData();
  }, []);

  //Form register
  const handleSelectHamlet = async (e: any) => {
    setPermission(e);
    setName(e);
    hamletList?.hamlets?.map((hamlet) => {
      if (hamlet?.id === e) {
        setArea(hamlet.name as string);
      }
    });
  };

  const handleChangePassword = React.useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleChangeDate = React.useCallback((e) => {
    setStartAt(moment(e.at(0)).format("YYYY/MM/DD") as any);
    setEndAt(moment(e.at(1)).format("YYYY/MM/DD") as any);
  }, []);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async () => {
    userApi
      .register(
        token as string,
        password,
        permission as string,
        role + 1,
        area as string
      )
      .then((response: User) => {
        if (response.success === true) {
          alert("Create Account Successfully ");
          window.location.reload();
        } else {
          alert(response.message);
        }
      });
  };

  // log out
  const handleLogOut = React.useCallback((e) => {
    localStorage.removeItem("token");
    window.location.reload();
  }, []);

  // delete
  const onDelete = async (e: any) => {
    alert("Are you sure you want to delete this");
    userApi
      .delete(token as string, e.target.value as string)
      .then((response: User) => {
        setUserList(response);
        window.location.reload();
      });
  };

  //search
  const onSearch = async (value: string) => {
    userApi
      .list(token as string, role as number, permission as string, value)
      .then((response: User) => {
        if (response.success === true) {
          setUserList(response);
        } else {
          alert(response.message);
        }
      });
  };

  // modal update
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [initialModalUserName, setInitialModalModalUserName] =
    React.useState("");
  const [initialModalUserArea, setInitialModalModalUserArea] =
    React.useState("");
  // const [initialModalUserStartAt, setInitialModalModalUserStartAt] =
  //   React.useState();
  // const [initialModalUserEndAt, setInitialModalModalUserEndAt] =
  //   React.useState();
  const [initialModalUserStatus, setInitialModalModalUserStatus] =
    React.useState<boolean>();

  const [permissionModal, setPermissionModal] = React.useState("");

  const showModalUpdate = async (e: any) => {
    setPermissionModal(e.target.value);
    console.log(e.target.value);
    userList?.users?.map((user) => {
      if (e.target.value === user.permission) {
        console.log(user);
        setInitialModalModalUserName(user.permission as string);
        setInitialModalModalUserArea(user.area as string);
        // setInitialModalModalUserStartAt(user.start_at as any);
        // setInitialModalModalUserEndAt(user.end_at as any);
        setInitialModalModalUserStatus(user.is_active as boolean);
        setArea(user.area as string);
        setStartAt(startAt as any);
        setEndAt(endAt as any);
        setStatus(user.is_active as boolean);
      }
    });
    setIsModalVisible(true);
  };

  const handleOkUpdate = async () => {
    let id, is_active, password: any;
    userApi
      .update(
        token as string,
        // (id = idModal),
        permissionModal as string,
        role as number,
        start_at as any,
        end_at as any,
        (is_active = status),
        area as string
      )
      .then((response: User) => {
        if (response.success === true) {
          setUserList(response);
          alert("Successfully");
          window.location.reload();
        } else {
          alert(response.message);
          window.location.reload();
        }
      });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    window.location.reload();
  };

  function disableDateRanges(range: any) {
    const { startDate, endDate } = range;
    return function disabledDate(current: any) {
      let startCheck = true;
      let endCheck = true;
      if (startDate) {
        startCheck = current && current < moment(startDate, "YYYY-MM-DD");
      }
      if (endDate) {
        endCheck = current && current > moment(endDate, "YYYY-MM-DD");
      }
      return (startDate && startCheck) || (endDate && endCheck);
    };
  }

  function handleChangeStatus(checked: boolean) {
    setStatus(checked);
  }

  return (
    <>
      {!token && (
        <Result
          status="warning"
          title="Bạn chưa đăng nhập"
          extra={
            <Button type="primary" key="console">
              <Link to={"/sign-in"}>đăng nhập </Link>
            </Button>
          }
        />
      )}
      {token && (
        <>
          {" "}
          <Layout
            className={`layout-dashboard ${
              pathname === "profile" ? "layout-profile" : ""
            } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
          >
            <Drawer
              title={false}
              placement={placement === "right" ? "left" : "right"}
              closable={false}
              onClose={() => setVisible(false)}
              visible={visible}
              key={placement === "right" ? "left" : "right"}
              width={250}
              className={`drawer-sidebar ${
                pathname === "rtl" ? "drawer-sidebar-rtl" : ""
              } `}
            >
              <Layout
                className={`layout-dashboard ${
                  pathname === "rtl" ? "layout-dashboard-rtl" : ""
                }`}
              >
                <Sider
                  trigger={null}
                  width={250}
                  theme="light"
                  className={`sider-primary ant-layout-sider-primary ${
                    sidenavType === "#fff" ? "active-route" : ""
                  }`}
                  style={{ background: sidenavType }}
                >
                  <Sidenav /* color={sidenavColor} */ />
                </Sider>
              </Layout>
            </Drawer>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onCollapse={(collapsed, type) => {
                // console.log(collapsed, type);
              }}
              trigger={null}
              width={250}
              theme="light"
              className={`sider-primary ant-layout-sider-primary ${
                sidenavType === "#fff" ? "active-route" : ""
              }`}
              style={{ background: sidenavType }}
            >
              <Sidenav /* color={sidenavColor} */ />
            </Sider>
            <Layout>
              <Affix>
                <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
                  Header here
                  <Button onClick={handleLogOut}>Log out</Button>
                  <Header
                  // onPress={openDrawer}
                  // name={pathname}
                  // subName={pathname}
                  // handleSidenavColor={handleSidenavColor}
                  // handleSidenavType={handleSidenavType}
                  // handleFixedNavbar={handleFixedNavbar}
                  />
                </AntHeader>
              </Affix>

              <Content className="content-ant">
                <div className="layout-content">
                  <Row gutter={[24, 0]}>
                    <Col
                      xs={24}
                      sm={24}
                      md={12}
                      lg={12}
                      xl={16}
                      className="mb-24"
                    >
                      <Card
                        bordered={false}
                        className="criclebox cardbody h-full"
                      >
                        <div className="project-ant">
                          <div>
                            <Title level={5}>
                              Tài khoản đã cấp (Quận/huyện)
                            </Title>
                            <Paragraph className="lastweek">
                              Tổng số:
                              <span className="blue">
                                {userList?.users?.length} / {hamletList?.hamlets?.length}
                              </span>
                            </Paragraph>
                          </div>
                          <div className="ant-filtertabs">
                            <Search
                              placeholder="Enter Hamlet Username"
                              allowClear
                              enterButton="Search"
                              onSearch={onSearch}
                            />
                          </div>
                        </div>
                        <div className="ant-list-box table-responsive">
                          <table className="width-100">
                            <thead>
                              <tr>
                                <th>USERNAME</th>
                                <th>HAMLET</th>
                                <th>RANGE</th>
                                <th>STATUS</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {userList?.users?.map((d, index) => (
                                <tr key={index}>
                                  <td>{d.permission}</td>
                                  <td>
                                    <h6>
                                      <img
                                        src={d.name}
                                        alt=""
                                        className="avatar-sm"
                                      />{" "}
                                      {d.area}
                                    </h6>
                                  </td>
                                  <td>
                                    {d.start_at} - {d.end_at}
                                  </td>
                                  <td>
                                    <Switch
                                      checked={
                                        d.is_active
                                      } /* onChange={onChange} */
                                    />
                                  </td>
                                  <td>
                                    <div className="percent-progress">
                                      <button
                                      className="button"
                                        value={d.permission}
                                        onClick={onDelete}
                                      >
                                        Delete
                                      </button>
                                      <button
                                      className="button"
                                        value={d.permission}
                                        onClick={showModalUpdate}
                                      >
                                        Update
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </Card>
                    </Col>
                    <Col
                      xs={24}
                      sm={24}
                      md={12}
                      lg={12}
                      xl={8}
                      className="mb-24"
                    >
                      <div>
                        <Title level={5}>Cấp tài khoản cho cán bộ B2</Title>
                        <Title className="font-regular text-muted" level={5}>
                          {/* Titlesub */}
                        </Title>
                        <Form
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                          layout="vertical"
                          className="row-col"
                        >
                          <Form.Item
                            className="username"
                            name="name"
                            label="Hamlet"
                            rules={[
                              {
                                required: true,
                                message: "Please select the Hamlet!",
                                whitespace: true,
                              },
                            ]}
                          >
                            <Select
                              onSelect={handleSelectHamlet}
                              showSearch
                              placeholder="Select Hamlet"
                              optionFilterProp="children"
                              filterOption={(input: any, option: any) =>
                                option.children
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0
                              }
                              filterSort={(optionA: any, optionB: any) =>
                                optionA.children
                                  .toLowerCase()
                                  .localeCompare(optionB.children.toLowerCase())
                              }
                            >
                              {hamletList?.hamlets?.map((item: any) => {
                                return (
                                  <Option key={item.id} value={item.id}>
                                    {item.name}
                                  </Option>
                                );
                              })}
                            </Select>
                          </Form.Item>

                          <Form.Item
                            className="username"
                            name="username"
                            label="Username"
                          >
                            <Input placeholder={name} disabled />
                          </Form.Item>

                          <Form.Item
                            className="username"
                            label="Password"
                            name="password"
                            rules={[
                              {
                                required: true,
                                message: "Please input your password!",
                              },
                            ]}
                          >
                            <Input.Password
                              onChange={handleChangePassword}
                              placeholder="Enter your password"
                            />
                          </Form.Item>

                          <Form.Item
                            className="username"
                            name="confirm"
                            label="Confirm Password"
                            dependencies={["password"]}
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message: "Please confirm your password!",
                              },
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  if (
                                    !value ||
                                    getFieldValue("password") === value
                                  ) {
                                    return Promise.resolve();
                                  }
                                  return Promise.reject(
                                    new Error(
                                      "The two passwords that you entered do not match!"
                                    )
                                  );
                                },
                              }),
                            ]}
                          >
                            <Input.Password placeholder="Enter your password confirmation" />
                          </Form.Item>

                          <Form.Item>
                            <Button
                              type="primary"
                              htmlType="submit"
                              style={{ width: "100%" }}
                            >
                              Cấp tài khoản
                            </Button>
                          </Form.Item>
                        </Form>
                      </div>
                    </Col>
                  </Row>
                </div>
                <Modal
                  title="Chỉnh sửa thông tin"
                  visible={isModalVisible}
                  onOk={handleOkUpdate}
                  onCancel={handleCancel}
                >
                  <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    className="row-col"
                  >
                    <Form.Item
                      className="username"
                      label="Hamlet"
                      name="Hamlet"
                      initialValue={initialModalUserArea}
                    >
                      <Select
                        onSelect={handleSelectHamlet}
                        showSearch
                        placeholder="Select Hamlet"
                        optionFilterProp="children"
                        filterOption={(input: any, option: any) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        filterSort={(optionA: any, optionB: any) =>
                          optionA.children
                            .toLowerCase()
                            .localeCompare(optionB.children.toLowerCase())
                        }
                      >
                        {hamletList?.hamlets?.map((item: any) => {
                          return (
                            <Option key={item.id} value={item.id}>
                              {item.name}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      className="username"
                      name="username"
                      label="Username"
                    >
                      <Input placeholder={initialModalUserName} disabled />
                    </Form.Item>
                    <Form.Item
                      className="username"
                      name="Status"
                      label="Status"
                      initialValue={initialModalUserStatus}
                    >
                      <Switch
                        disabled={isActive === "0"}
                        checked={status}
                        onChange={handleChangeStatus}
                      />
                    </Form.Item>

                    <Form.Item
                      className="username"
                      label="Range Time"
                      name="Range Time"
                    >
                      <RangePicker
                        disabled={!status}
                        disabledDate={disableDateRanges({
                          endDate: new Date(endAt as any),
                          startDate: new Date(startAt as any),
                        })}
                        onChange={handleChangeDate}
                      />
                    </Form.Item>
                  </Form>
                </Modal>
              </Content>
              <Footer />
            </Layout>
          </Layout>
        </>
      )}
    </>
  );
}

export default B1AddUser;
