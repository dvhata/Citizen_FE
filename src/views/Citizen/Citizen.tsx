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
  Table,
  Typography,
} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import provinceApi from "api/ProvinceApi";
import userApi from "api/UserApi";
import Sidenav from "components/layout/Sidenav";
import { Province } from "models/Province/Province";
import { User } from "models/User/User";
import moment from "moment";
import { useEffect, useState } from "react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "components/layout/Header";
import Footer from "components/layout/Footer";
import { useCitizen } from "./CitizenHook";
import { CitizenData } from "models/Citizen/CitizenData";
import CitizenDetail from "./CitizenDetail";
import CitizenPreview from "./CitizenPreview";

let token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const { Header: AntHeader, Content, Sider } = Layout;
const { Option } = Select;
function Citizen() {
  const {
    list,
    permission,
    handleChangeFilter,
    filter,
    handleResetFilter,
    LoadList,
    deleteCitizen,
    disableProvince,
    disableDistrict,
    disableWard,
    disableHamlet,
    provinceList,
    districtList,
    wardList,
    hamletList,
    selectedProvince,
    selectedDistrict,
    selectedWard,
    selectedHamlet,

    handleChangeProvince,
    handleChangeDistrict,
    handleChangeWard,
    handleChangeHamlet,
  } = useCitizen();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [selectedModel, setSelectedModel] = React.useState<CitizenData>(
    new CitizenData()
  );
  const [openPreviewModal, setOpenPreviewModal] =
    React.useState<boolean>(false);

  const handleGoPreview = React.useCallback((model: CitizenData) => {
    setSelectedModel(model);
    setOpenPreviewModal(true);
  }, []);

  const closePreviewModal = React.useCallback(() => {
    setOpenPreviewModal(false);
  }, []);

  const handleGoToCreate = React.useCallback((model: CitizenData) => {
    setSelectedModel(model);
    setOpenModal(true);
  }, []);

  const closeModalCreate = React.useCallback(() => {
    setOpenModal(false);
    LoadList(filter, permission);
    setSelectedModel(new CitizenData());
  }, [LoadList, permission]);

  const columns = [
    {
      title: <div className="table__title--column">Tên </div>,
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: <div className="table__title--column">CCCD </div>,
      dataIndex: "ID_number",
      key: "ID_number",
    },

    {
      title: <div className="table__title--column">Ngày sinh</div>,
      key: "date_of_birth",
      dataIndex: "date_of_birth",
      render: (date_of_birth: Date) => {
        return moment(date_of_birth).format("DD-MM-YYYY");
      },
    },
    {
      title: <div className="table__title--column">Ciới tính </div>,
      key: "gender",
      dataIndex: "gender",
      render: (gender: number) => {
        return gender === 1 ? "nam" : "nữ";
      },
    },

    {
      title: <div className="table__title--column">Quê quán </div>,
      key: "hometown",
      dataIndex: "hometown",
    },
    {
      title: "Tác vụ",
      render: (model: CitizenData) => {
        return (
          <>
            <button onClick={() => handleGoPreview(model)}>xem</button>
            {role && (role === '4' || (role === '5'))
              && (<button onClick={() => handleGoToCreate(model)}>sửa</button>)
            }
            {role && (role === '4' || (role === '5'))
              && (<button onClick={() => deleteCitizen(model.id)}>xóa</button>)
            }

          </>
        );
      },
    },
  ];

  // format
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
            className={`layout-dashboard ${pathname === "profile" ? "layout-profile" : ""
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
              className={`drawer-sidebar ${pathname === "rtl" ? "drawer-sidebar-rtl" : ""
                } `}
            >
              <Layout
                className={`layout-dashboard ${pathname === "rtl" ? "layout-dashboard-rtl" : ""
                  }`}
              >
                <Sider
                  trigger={null}
                  width={250}
                  theme="light"
                  className={`sider-primary ant-layout-sider-primary ${sidenavType === "#fff" ? "active-route" : ""
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
              className={`sider-primary ant-layout-sider-primary ${sidenavType === "#fff" ? "active-route" : ""
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
                <div className="Citizen__page__master">
                  <Card>
                    <Row className="master--title mt-3">Danh sách dân cư</Row>
                    <Row justify="space-around" className="search__componet">
                      <Col lg={5}>
                        <div className="input__component">
                          <span className="input__label">
                            Tìm kiếm theo tên
                          </span>
                          <Input
                            value={filter.name}
                            onChange={(e) =>
                              handleChangeFilter("name", e.target.value)
                            }
                            placeholder="Nhập tên để tìm kiếm ....."
                          ></Input>
                        </div>
                      </Col>
                      <Col lg={5}>
                        <div className="input__component">
                          <span className="input__label">
                            Tìm kiếm theo CCCD
                          </span>
                          <Input
                            value={filter.ID_number}
                            onChange={(e) =>
                              handleChangeFilter("ID_number", e.target.value)
                            }
                            placeholder="Nhập CCCD để tìm kiếm ....."
                          ></Input>
                        </div>
                      </Col>
                      <Col lg={5}>
                        <div className="input__component">
                          <span className="input__label">Ngày sinh</span>
                          <DatePicker
                            value={filter.date_of_birth}
                            onChange={(e) =>
                              handleChangeFilter("date_of_birth", e)
                            }
                            placeholder="Chọn ngày để tìm kiếm ....."
                          ></DatePicker>
                        </div>
                      </Col>
                      <Col lg={5}>
                        <div className="input__component">
                          <span className="input__label">
                            Tìm kiếm theo quê quán
                          </span>
                          <Input
                            value={filter.hometown}
                            onChange={(e) =>
                              handleChangeFilter("hometown", e.target.value)
                            }
                            placeholder="Nhập quê quán để tìm kiếm ....."
                          ></Input>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={5}>
                        <div className="input__component">
                          <span className="input__label">
                            Tỉnh/thành phố
                          </span>
                          <Select
                            onChange={(value) => handleChangeProvince(value)}
                            placeholder="Chọn tỉnh/ thành phố"
                            value={selectedProvince}
                            disabled={disableProvince}
                          >
                            {
                              provinceList.map((item, index) => {
                                return <Option value={item?.id ? item?.id : index}>{item.name}</Option>
                              })
                            }

                          </Select>
                        </div>
                      </Col>
                      <Col lg={5}>
                        <div className="input__component">
                          <span className="input__label">
                            Quận/ huyện
                          </span>
                          <Select
                            onChange={(value) => handleChangeDistrict(value)}
                            placeholder="Chọn quận/ huyện"
                            value={selectedDistrict}
                            disabled={disableDistrict}
                          >
                            {
                              districtList.map((item, index) => {
                                return <Option value={item?.id ? item?.id : index}>{item.name}</Option>
                              })
                            }

                          </Select>
                        </div>
                      </Col>
                      <Col lg={5}>
                        <div className="input__component">
                          <span className="input__label">
                            Xã/phường
                          </span>
                          <Select
                            placeholder="Chọn xã/phường"
                            onChange={(value) => handleChangeWard(value)}
                            disabled={disableWard}
                          >
                            {
                              wardList.map((item, index) => {
                                return <Option value={item?.id ? item?.id : index}>{item.name}</Option>
                              })
                            }

                          </Select>
                        </div>
                      </Col>
                      <Col lg={5}>
                        <div className="input__component">
                          <span className="input__label">
                            Thôn xóm
                          </span>
                          <Select
                            placeholder="Chọn thôn/xóm"
                            onChange={(value) => handleChangeHamlet(value)}
                            disabled={disableHamlet}
                          >
                            {
                              wardList.map((item, index) => {
                                return <Option value={item?.id ? item?.id : index}>{item.name}</Option>
                              })
                            }

                          </Select>
                        </div>
                      </Col>
                    </Row>
                    <Row className="button__component">
                      {role && (role === '4' || (role === '5')) && (<Button
                        onClick={() => handleGoToCreate(selectedModel)}
                        className="button__create"
                      >
                        Tạo mới
                      </Button>)}

                      <Button
                        onClick={handleResetFilter}
                        className="button__resetFilter"
                      >
                        Bỏ lọc
                      </Button>
                    </Row>
                  </Card>
                  <Card className="Citizen__table">
                    <Table
                      columns={columns}
                      dataSource={list}
                      bordered={false}
                    />
                  </Card>
                </div>
                <CitizenDetail
                  isOpenModel={openModal}
                  model={selectedModel}
                  handleCloseModal={closeModalCreate}
                  setModel={setSelectedModel}
                />
                <CitizenPreview
                  isOpenPreview={openPreviewModal}
                  model={selectedModel}
                  handleCloseModal={closePreviewModal}
                />
              </Content>
              <Footer />
            </Layout>
          </Layout>
        </>
      )
      }
    </>
  );
}

export default Citizen;
