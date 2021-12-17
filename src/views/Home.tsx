import {
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Progress,
  Upload,
  message,
  Button,
  Timeline,
  Radio,
  Form,
  Input,
  Menu,
  Dropdown,
  Select,
  Space,
  DatePicker,
} from "antd";
import {
  ToTopOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  DownOutlined,
} from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";
import Echart from "../components/chart/EChart";
import LineChart from "../components/chart/LineChart";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer, Affix, Table } from "antd";
import Sidenav from "components/layout/Sidenav";
import { Footer, Header } from "antd/lib/layout/layout";
import React from "react";
import axiosClient from "config/axiosClient";
import { User } from "models/User/User";
import userApi from "api/UserApi";
import { Province } from "models/Province/Province";
import { Moment } from "moment";
import moment from "moment";

const { Header: AntHeader, Content, Sider } = Layout;

function Home() {
  const { Title, Text } = Typography;

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

  const [password, setPassword] = React.useState("");
  const [isLogin, setLogin] = React.useState();
  const [userData, setUserData] = React.useState<User>();
  const [provinceList, setProvinceList] = React.useState<Province>();

  const { Option } = Select;
  const { RangePicker } = DatePicker;

  React.useEffect(() => {
    const fetchData = () => {
      userApi.provinceList().then((response) => {
        // console.log(response);
      });
    };
    fetchData();
  }, []);

  //Form register
  let start_at: any, end_at: any;
  let token = localStorage.getItem("token");
  let permission = localStorage.getItem("permission");
  let role_temp = localStorage.getItem("role");
  console.log(token, permission, role_temp)
  let role: number;
  if (typeof role_temp === "string") {
    role = JSON.parse(localStorage.getItem("role") as string);
    console.log(role)
  }

  const handleSelectProvince = React.useCallback((e) => {
    let permission = e;
  }, []);

  const handleChangePassword = React.useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const handleChangeDate = React.useCallback((e) => {
    start_at = moment(e.at(0)).format("YYYY/MM/DD");
    end_at = moment(e.at(1)).format("YYYY/MM/DD");
    console.log(start_at, end_at);
  }, []);

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async () => {
    userApi
      .register(token as string, password, start_at, end_at, permission as string, role + 1)
      .then((response: User) => {
        if (response.success === true) {
          alert("Create Account Successfully ");
        } else {
          alert(response.message);
        }
      });
  };

  return (
    <>
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
              <div>
                <Title className="mb-15">Cấp tài khoản cho cán bộ A2</Title>
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
                    label="Province"
                    rules={[
                      {
                        required: true,
                        message: "Please select the province!",
                        whitespace: true,
                      },
                    ]}
                  >
                    <Select
                      onSelect={handleSelectProvince}
                      showSearch
                      placeholder="Select Province"
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
                      <Option value="1">Not Identified</Option>
                      <Option value="2">Closed</Option>
                      <Option value="3">Communicated</Option>
                      <Option value="4">Identified</Option>
                      <Option value="5">Resolved</Option>
                      <Option value="6">Cancelled</Option>
                    </Select>
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
                          if (!value || getFieldValue("password") === value) {
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

                  <Form.Item
                    className="username"
                    label="Date"
                    name="Date"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please input your date!",
                    //   },
                    // ]}
                  >
                    <Space direction="vertical" /* size={32} */>
                      <RangePicker onChange={handleChangeDate} />
                    </Space>
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
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    </>
  );
}

export default Home;
