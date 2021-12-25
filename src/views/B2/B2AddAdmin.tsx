import {
    Affix,
    Alert,
    Button,
    Card,
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
  import { Footer, Header } from "antd/lib/layout/layout";
  import Paragraph from "antd/lib/typography/Paragraph";
  import provinceApi from "api/ProvinceApi";
  import Sidenav from "components/layout/Sidenav";
  import { Province } from "models/Province/Province";
  import { User } from "models/User/User";
  import { useEffect, useState } from "react";
  import React from "react";
  import { Link, useLocation } from "react-router-dom";
  import Icon, {
    CheckCircleOutlined,
    CloseCircleOutlined,
    InfoCircleOutlined,
  } from "@ant-design/icons";
  
  const { Header: AntHeader, Content, Sider } = Layout;
  
  function A1AddAdmin() {
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
    const [provinceList, setProvinceList] = React.useState<Province>();
  
    const { Option } = Select;
    const { RangePicker } = DatePicker;
  
    React.useEffect(() => {
      const fetchData = () => {
        provinceApi.provinceList(token as string).then((response) => {
          setProvinceList(response);
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
  
    const handleChangeProvinceId = React.useCallback((e) => {
      const temp = parseInt(e.target.value);
      temp >= parseInt("01") && temp <= parseInt("63")
        ? setId(e.target.value)
        : setId("");
      if (e.target.value.length > 2) {
        setId("");
      }
      if (e.target.value === "1") setId("");
      // for (let i = 1; i <= 9; i++) {
      //   if (e.target.value === i.toString) setId("");
      // }
    }, []);
    const suffix = id !== "" ? <CheckCircleOutlined /> : <CloseCircleOutlined />;
  
    const handleChangeProvinceName = React.useCallback((e) => {
      setName(e.target.value);
    }, []);
  
    const onFinish = async () => {
      provinceApi
        .provinceRegist(token as string, name as string, id as string)
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
  
    // log out
    const handleLogOut = React.useCallback((e) => {
      localStorage.removeItem("token");
      window.location.reload();
    }, []);
  
    //search
    const onSearch = async (value: string) => {
      provinceApi
        .provinceList(token as string, value as string)
        .then((response: Province) => {
          if (response.success === true) {
            setProvinceList(response);
          } else {
            alert(response.message);
          }
        });
    };
  
    // delete
    const onDelete = async (e: any) => {
      alert("Are you sure you want to delete this");
      provinceApi
        .provinceDelete(token as string, e.target.value as string)
        .then((response: Province) => {
          setProvinceList(response);
          window.location.reload();
        });
    };
  
    // update modal
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const [initialModalProvinceId, setInitialModalProvinceId] =
      React.useState("");
    const [initialModalProvinceName, setInitialModalProvinceName] =
      React.useState("");
  
    const [permissionModal, setPermissionModal] = React.useState("");
    const showModalUpdate = async (e: any) => {
      setPermissionModal(e.target.value);
      console.log(e.target.value);
      provinceList?.provinces?.map((province) => {
        if (e.target.value === province.id) {
          console.log(e.target.value, province);
          setInitialModalProvinceId(province.id as string);
          setInitialModalProvinceName(province.name as string);
          setId(province.id as string);
          setName(province.name as string);
        }
      });
      setIsModalVisible(true);
    };
  
    const handleOkUpdate = async () => {
      console.log(permissionModal);
      provinceApi
        .provinceUpdate(
          token as string,
          permissionModal as string,
          name as string,
          id as string
        )
        .then((response: Province) => {
          if (response.success === true) {
            setProvinceList(response);
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
                              <Title level={5}>Tỉnh/Thành phố đã cấp mã</Title>
                              <Paragraph className="lastweek">
                                Tổng số:
                                <span className="blue">
                                  {provinceList?.provinces?.length} / 63
                                </span>
                              </Paragraph>
                            </div>
                            <div className="ant-filtertabs">
                              <Search
                                placeholder="Nhập Tỉnh/ Thành phố"
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
                                  <th>TỈNH/THÀNH PHỐ</th>
                                  <th>TIẾN ĐỘ NHẬP LIỆU</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {provinceList?.provinces?.map((d, index) => (
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
                                      <div className="ant-progress-project">
                                        <Progress percent={d.id_done} />
                                      </div>
                                    </td>
                                    <td>
                                      <div className="percent-progress">
                                        <button className="button" value={d.id} onClick={onDelete}>
                                          Delete
                                        </button>
  
                                        <button
                                          value={d.id}
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
                        <Card bordered={false} className="criclebox h-full">
                          <div className="timeline-box">
                            <Title level={5}>
                              {" "}
                              Khai báo và cấp mã cho 63 tỉnh/thành phố
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
                                label="Province Id"
                                name="Province Id"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Please input your Province Id! from 01-63",
                                  },
                                ]}
                              >
                                <Input
                                  suffix={suffix}
                                  onChange={handleChangeProvinceId}
                                  placeholder="Enter your Province Id"
                                />
                              </Form.Item>
  
                              <Form.Item
                                className="username"
                                label="Province Name"
                                name="Province Name"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your Province Name!",
                                  },
                                ]}
                              >
                                <Input
                                  allowClear
                                  onChange={handleChangeProvinceName}
                                  placeholder="Enter your Province Name"
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
                        label="Province Id"
                        name="Province Id"
                        initialValue={initialModalProvinceId}
                      >
                        <Input
                          suffix={suffix}
                          onChange={handleChangeProvinceId}
                        />
                      </Form.Item>
  
                      <Form.Item
                        className="username"
                        label="Province Name"
                        name="Province Name"
                        initialValue={initialModalProvinceName}
                      >
                        <Input onChange={handleChangeProvinceName} />
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
  
  export default A1AddAdmin;
  