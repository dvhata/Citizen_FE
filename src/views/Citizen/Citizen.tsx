import {
  Button,
  Card,
  Col,
  DatePicker,
  Input,
  Row,
  Table,
} from "antd";
import { CitizenData } from "models/Citizen/CitizenData";
import moment from "moment";
import React from "react";
import "./Citizen.css";
import CitizenDetail from "./CitizenDetail";
import { useCitizen } from "./CitizenHook";
import CitizenPreview from "./CitizenPreview";

function Citizen() {

  const {
    list,
    handleChangeFilter,
    filter,
    handleResetFilter,
    LoadList,
    deleteCitizen,
  } = useCitizen();
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [selectedModel, setSelectedModel] = React.useState<CitizenData>(new CitizenData());
  const [openPreviewModal, setOpenPreviewModal] = React.useState<boolean>(false);

  const handleGoPreview = React.useCallback(
    (model: CitizenData) => {
      setSelectedModel(model);
      setOpenPreviewModal(true);
    }, []
  );

  const closePreviewModal = React.useCallback(
    () => {
      setOpenPreviewModal(false);

    }, []);

  const handleGoToCreate = React.useCallback(
    (model: CitizenData) => {
      setSelectedModel(model);
      setOpenModal(true);
    }, []
  );

  const closeModalCreate = React.useCallback(
    () => {
      setOpenModal(false);
      LoadList(filter);
      setSelectedModel(new CitizenData());

    }, [LoadList]);

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
        return moment(date_of_birth).format('DD-MM-YYYY');
      }
    },
    {
      title: <div className="table__title--column">Ciới tính </div>,
      key: "gender",
      dataIndex: "gender",
      render: (gender: number) => {
        return gender === 1 ? "nam" : "nữ";
      }
    },

    {
      title: <div className="table__title--column">Quê quán </div>,
      key: "hometown",
      dataIndex: "hometown",
    },
    {
      title: "Tác vụ",
      render: (model: CitizenData) => {
        return <>
          <button
            onClick={() => handleGoPreview(model)}>xem</button>
          <button
            onClick={() => handleGoToCreate(model)}>sửa</button>
          <button
            onClick={() => deleteCitizen(model.id)}>xóa</button>
        </>
      }
    }
  ];

  return (
    <>
      <div className="Citizen__page__master">
        <Card>
          <Row className="master--title mt-3">
            Danh sách dân cư
          </Row>
          <Row justify="space-around" className="search__componet">
            <Col lg={5}>
              <div className="input__component">
                <span className="input__label">Tìm kiếm theo tên</span>
                <Input
                  value={filter.name}
                  onChange={(e) => handleChangeFilter("name", e.target.value)}
                  placeholder="Nhập tên để tìm kiếm .....">
                </Input>
              </div>
            </Col>
            <Col lg={5}>
              <div className="input__component">
                <span className="input__label">Tìm kiếm theo CCCD</span>
                <Input
                  value={filter.ID_number}
                  onChange={(e) => handleChangeFilter("ID_number", e.target.value)}
                  placeholder="Nhập CCCD để tìm kiếm .....">
                </Input>
              </div>
            </Col>
            <Col lg={5}>
              <div className="input__component">
                <span className="input__label">Ngày sinh</span>
                <DatePicker
                  value={filter.date_of_birth}
                  onChange={(e) => handleChangeFilter("date_of_birth", e)}
                  placeholder="Chọn ngày để tìm kiếm .....">
                </DatePicker>
              </div>
            </Col>
            <Col lg={5}>
              <div className="input__component">
                <span className="input__label">Tìm kiếm theo quê quán</span>
                <Input
                  value={filter.hometown}
                  onChange={(e) => handleChangeFilter("hometown", e.target.value)}
                  placeholder="Nhập quê quán để tìm kiếm .....">
                </Input>
              </div>
            </Col>
          </Row>
          <Row className="button__component">

            <Button
              onClick={() => handleGoToCreate(selectedModel)}
              className="button__create"
            >
              Tạo mới
            </Button>

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
        handleCloseModal={closePreviewModal} />
    </>
  );
}

export default Citizen;
