import {
  Affix,
  Alert,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  InputNumber,
  Layout,
  message,
  Modal,
  Progress,
  Result,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import Sidenav from "components/layout/Sidenav";
import { User } from "models/User/User";
import { useEffect, useState } from "react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon, {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Hamlet } from "models/Hamlet/Hamlet";
import hamletApi from "api/HamletApi";
import Header from "components/layout/Header";
import Footer from "components/layout/Footer";

const { Header: AntHeader, Content, Sider } = Layout;

function B1AddAdmin() {
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

  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  // const [start_at, setStartAt] = React.useState("");
  // const [end_at, setEndAt] = React.useState("");
  const [permission, setPermission] = React.useState(
    localStorage.getItem("permission")
  );
  const [isLogin, setLogin] = React.useState();
  const [userData, setUserData] = React.useState<User>();
  const [hamletList, setHamletList] = React.useState<Hamlet>();

  const { Option } = Select;
  const { RangePicker } = DatePicker;

  React.useEffect(() => {
    const fetchData = () => {
      hamletApi
        .hamletList(token as string, permission as string)
        .then((response) => {
          setHamletList(response);
        });
    };
    fetchData();
  }, []);

  //Form register
  let token = localStorage.getItem("token");
  let role_temp = localStorage.getItem("role");
  let role: number;
  if (typeof role_temp === "string") {
    role = JSON.parse(localStorage.getItem("role") as string);
  }

  const handleChangeHamletId = React.useCallback((e) => {
    if (e.target.value.length > 2) {
      setId("");
    } else {
      setId(e.target.value);
    }
  }, []);
  const suffix = id !== "" ? <CheckCircleOutlined /> : <CloseCircleOutlined />;

  const handleChangeHamletName = React.useCallback((e) => {
    setName(e.target.value);
  }, []);

  const onFinish = async () => {
    hamletApi
      .hamletRegist(
        token as string,
        permission as string,
        name as string,
        id as string
      )
      .then((response) => {
        if (response.success === true) {
          alert(" Successfully ");
          window.location.reload();
        } else {
          alert(response.message);
        }
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  //search
  const onSearch = async (value: string) => {
    hamletApi
      .hamletList(token as string, permission as string, value as string)
      .then((response: Hamlet) => {
        if (response.success === true) {
          setHamletList(response);
        } else {
          alert(response.message);
        }
      });
  };

  // delete
  const onDelete = async (e: any) => {
    alert("Are you sure you want to delete this");
    hamletApi
      .hamletDelete(token as string, e.target.value as string)
      .then((response: Hamlet) => {
        setHamletList(response);
        window.location.reload();
      });
  };

  // update modal
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [initialModalHamletId, setInitialModalHamletId] = React.useState("");
  const [initialModalHamletName, setInitialModalHamletName] =
    React.useState("");

  const [permissionModal, setPermissionModal] = React.useState("");
  const showModalUpdate = async (e: any) => {
    setPermissionModal(e.target.value);
    console.log(e.target.value);
    hamletList?.hamlets?.map((hamlet) => {
      if (e.target.value === hamlet.id) {
        console.log(e.target.value, hamlet);
        setInitialModalHamletId(hamlet.id as string);
        setInitialModalHamletName(hamlet.name as string);
        setId(hamlet.id as string);
        setName(hamlet.name as string);
      }
    });
    setIsModalVisible(true);
  };

  const handleOkUpdate = async () => {
    console.log(permissionModal);
    hamletApi
      .hamletUpdate(
        token as string,
        permissionModal as string,
        permission as string,
        name as string,
        id as string
      )
      .then((response: Hamlet) => {
        if (response.success === true) {
          setHamletList(response);
          alert(" Successfully ");
          window.location.reload();
        } else {
          window.location.reload();
          alert(response.message);
        }
      });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    window.location.reload();
  };

  // checkbox
  function onChangeCheckbox(e: any) {
    hamletApi
      .hamletCheckbox(token as string, e.target.value, e.target.checked)
      .then((response: Hamlet) => {
        alert(" Successfully ");
      });
  }

  return (
    <>
      {!token && (
        <Result
          status="403"
          title="Bạn chưa đăng nhập"
          subTitle="Sorry, you are not authorized to access this page."
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
                  <Header />
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
                            <Title level={5}>Thôn/Tổ đã cấp mã</Title>
                            <Paragraph className="lastweek">
                              Tổng số:
                              <span className="blue">
                                {hamletList?.hamlets?.length}
                              </span>
                            </Paragraph>
                          </div>
                          <div className="ant-filtertabs">
                            <Search
                              placeholder="Nhập Thôn/Tổ"
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
                                <th>MÃ</th>
                                <th>THÔN/TỔ</th>
                                <th>TIẾN ĐỘ NHẬP LIỆU</th>
                                <th></th>
                              </tr>
                            </thead>
                            <tbody>
                              {hamletList?.hamlets?.map((d, index) => (
                                <tr key={index}>
                                  <td>{d.id}</td>
                                  <td>
                                    <h6>
                                      <img
                                        src={d.name}
                                        alt=""
                                        className="avatar-sm"
                                      />{" "}
                                      {d.name}
                                    </h6>
                                  </td>
                                  <td>
                                    <Checkbox
                                      defaultChecked={
                                        d.is_done === 1 ? true : false
                                      }
                                      value={d.id}
                                      onChange={onChangeCheckbox}
                                    >
                                      Hoàn thành
                                    </Checkbox>
                                  </td>
                                  <td>
                                    <div className="percent-progress">
                                      <button
                                        className="button"
                                        value={d.id}
                                        onClick={onDelete}
                                      >
                                        Xóa 
                                      </button>

                                      <button
                                        className="button"
                                        value={d.id}
                                        onClick={showModalUpdate}
                                      >
                                        Sửa
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
                      <Card bordered={false} className="criclebox h-full">
                        <div className="timeline-box">
                          <Title level={5}>
                            {" "}
                            Khai báo và cấp mã cho Thôn/Tổ
                          </Title>
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
                              label="Mã Thôn/Tổ"
                              name="Mã Thôn/Tổ"
                              rules={[
                                {
                                  required: true,
                                  message:
                                    "Nhập Mã Thôn/Tổ! from 01-99",
                                },
                              ]}
                            >
                              <Input
                                prefix={permission}
                                suffix={suffix}
                                onChange={handleChangeHamletId}
                                placeholder="Nhập Mã Thôn/Tổ"
                              />
                            </Form.Item>

                            <Form.Item
                              className="username"
                              label="Tên Thôn/Tổ"
                              name="Tên Thôn/Tổ"
                              rules={[
                                {
                                  required: true,
                                  message: "Nhập Tên Thôn/Tổ!",
                                },
                              ]}
                            >
                              <Input
                                allowClear
                                onChange={handleChangeHamletName}
                                placeholder="Nhập Tên Thôn/Tổ"
                              />
                            </Form.Item>

                            <Form.Item>
                              <Button
                                type="primary"
                                htmlType="submit"
                                style={{ width: "100%" }}
                              >
                                Cấp mã
                              </Button>
                            </Form.Item>
                          </Form>
                        </div>
                      </Card>
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
                      label="Mã Thôn/Tổ"
                      name="Mã Thôn/Tổ"
                      initialValue={initialModalHamletId.slice(6)}
                    >
                      <Input
                        prefix={permission}
                        suffix={suffix}
                        onChange={handleChangeHamletId}
                      />
                    </Form.Item>

                    <Form.Item
                      className="username"
                      label="Tên Thôn/Tổ"
                      name="Tên Thôn/Tổ"
                      initialValue={initialModalHamletName}
                    >
                      <Input onChange={handleChangeHamletName} />
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

export default B1AddAdmin;
