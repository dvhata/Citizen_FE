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
import { useStatistic } from "./StatisticHook";

let token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const { Header: AntHeader, Content, Sider } = Layout;
const { Option } = Select;
function Statistic() {
    const {
        ageStatistic,
        genderStatistic,
        amountStatistic,
        provinceList,
        districtList,
        wardList,
        hamletList,
        disableProvince,
        disableDistrict,
        disableWard,
        disableHamlet,
        selectedProvince,
        selectedDistrict,
        selectedWard,
        selectedHamlet,
        handleChangeProvince,
        handleChangeDistrict,
        handleChangeWard,
        handleChangeHamlet,
    } = useStatistic();

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
                                <div className="Statistic__page__master">
                                    <Card>


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
                                                        value={selectedWard}
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
                                                        value={selectedHamlet}
                                                        disabled={disableHamlet}
                                                    >
                                                        {
                                                            hamletList.map((item, index) => {
                                                                return <Option value={item?.id ? item?.id : index}>{item.name}</Option>
                                                            })
                                                        }

                                                    </Select>
                                                </div>
                                            </Col>
                                        </Row>
                                        <button onClick={() => { console.log(ageStatistic) }}>age</button>
                                        <button onClick={() => { console.log(genderStatistic) }}>gender</button>
                                        <button onClick={() => { console.log(amountStatistic) }}>amount</button>
                                    </Card>
                                </div>
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

export default Statistic;
