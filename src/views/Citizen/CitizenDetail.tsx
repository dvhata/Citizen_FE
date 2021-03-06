import { Button, DatePicker, Input, Modal, ModalProps, Select } from "antd";
import provinceApi from "api/citizenApi";
import { CitizenData } from "models/Citizen/CitizenData";
import { HamletData } from "models/Hamlet/HamletData";
import moment, { Moment } from "moment";
import React, { useState } from "react";
import "./CitizenDetail.css";

interface CitizenModalProps extends ModalProps {
    isOpenModel?: boolean,
    model: CitizenData,
    setModel: React.Dispatch<React.SetStateAction<CitizenData>>,
    handleCloseModal: () => void,
    handleChangeField?: (field: keyof CitizenData, value: any) => void,
    hamletList: HamletData[],
}
const { Option } = Select;
function CitizenDetail(props: CitizenModalProps) {
    const { isOpenModel, handleCloseModal, model, hamletList } = props;
    const gender = [
        { id: 1, name: 'Nam' },
        { id: 2, name: 'Nữ' }
    ]
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const [disable, setDisable] = React.useState<boolean>(true);
    const [permission, setPermisstion] = React.useState<any>(localStorage.getItem("permission"));
    const [name, setName] = React.useState<string>(model.name ? model.name : '');
    const [ID_number, setID_number] = React.useState<string>(model.ID_number ? model.ID_number : '');
    const [Gender, setGender] = React.useState<number>(model.gender ? model.gender : 0);
    const [dateOfBirth, setDateOfBirth] = React.useState<Moment>(model.date_of_birth ? model.date_of_birth : moment());
    const [hometown, setHometown] = React.useState<string>(model.hometown ? model.hometown : '');
    const [temporary_address, setTemporary_address] = React.useState<string>(model.temporary_address ? model.temporary_address : '');
    const [permanent_address, setPermanent_address] = React.useState<string>(model.permanent_address ? model.permanent_address : '');
    const [education_level, setEducation_level] = React.useState<string>(model.education_level ? model.education_level : '');
    const [religion, setReligion] = React.useState<string>(model.religion ? model.religion : '');
    const [job, setJob] = React.useState<string>(model.job ? model.job : '');
    React.useEffect(() => {
        if (model.name) { setName(model.name) } else setName('');
        if (model.ID_number) { setID_number(model.ID_number) } else setID_number('');
        if (model.gender) { setGender(model.gender) } else setGender(1);
        if (model.date_of_birth) { setDateOfBirth(moment(model.date_of_birth)) } else setDateOfBirth(moment());
        if (model.hometown) { setHometown(model.hometown) } else setHometown('');
        if (model.temporary_address) { setTemporary_address(model.temporary_address) } else setTemporary_address('');
        if (model.permanent_address) { setPermanent_address(model.permanent_address) } else setPermanent_address('');
        if (model.religion) { setReligion(model.religion) } else setReligion('');
        if (model.education_level) { setEducation_level(model.education_level) } else setEducation_level('');
        if (model.job) { setJob(model.job) } else setJob('');
    }, [model]);

    const handleCreate = React.useCallback(
        (
            name,
            ID_number,
            date_of_birth,
            gender,
            hometown,
            permanent_address,
            temporary_address,
            religion,
            education_level,
            job,
        ) => {
            const fetchCreateCitizen = async () => {
                try {
                    const res = await provinceApi
                        .create(
                            permission,
                            token,
                            name,
                            ID_number,
                            date_of_birth.format('YYYY-MM-DD HH:mm:ss'),
                            gender,
                            hometown,
                            permanent_address,
                            temporary_address,
                            religion,
                            education_level,
                            job,
                        );
                    if (res.success) {
                        alert('tạo mới thành công');
                        setName('');
                        setGender(1);
                        setHometown('');
                        setTemporary_address('');
                        setEducation_level('');
                        setPermanent_address('');
                        setID_number('');
                        handleCloseModal();
                    }
                    else alert(res.message);
                } catch (error) {
                    alert(error);
                }
            };
            if (!name || !hometown || !temporary_address || permission.length === 6) {
                alert("Cần nhập các trường thông tin bắt buộc(*)")
            }
            else { fetchCreateCitizen(); }

        }, [handleCloseModal, permission]);

    const handleUpdate = React.useCallback(
        (
            id,
            name,
            ID_number,
            date_of_birth,
            gender,
            hometown,
            permanent_address,
            temporary_address,
            religion,
            education_level,
            job,
        ) => {
            const fetchUpdateCitizen = async () => {
                try {
                    const res = await provinceApi
                        .update(
                            permission,
                            id,
                            token,
                            name,
                            ID_number,
                            date_of_birth.format('YYYY-MM-DD HH:mm:ss'),
                            gender,
                            hometown,
                            permanent_address,
                            temporary_address,
                            religion,
                            education_level,
                            job,
                        );
                    if (res.success) {
                        alert('Sửa thông tin thành công');
                        setName('');
                        setGender(1);
                        setHometown('');
                        setTemporary_address('');
                        setEducation_level('');
                        setPermanent_address('');
                        setID_number('');
                        handleCloseModal();
                    }
                    else alert(res.message)

                } catch (error) {
                    alert(error);
                }
            };
            if (!name || !hometown || !temporary_address || permission.length === 6) {
                alert("Cần nhập các trường thông tin bắt buộc(*)")
            }
            else { fetchUpdateCitizen(); }

        }, [handleCloseModal, permission]);

    return (
        <Modal
            footer={false}
            visible={isOpenModel}
            onCancel={handleCloseModal}
            width={600}
        >
            <div className="modal__detail">
                <div className="Modal__title">
                    {model?.id
                        ? `Chỉnh sửa thông tin công dân ${model.name}`
                        : `Tạo mới công dân`}
                </div>

                {role === '4' && (
                    <div className="input__component">
                        <div>
                            <span>
                                Thôn xóm
                            </span>
                            <span className="text-danger">*</span>
                        </div>
                        <Select
                            placeholder="Chọn thôn/xóm"
                            onChange={(value) => setPermisstion(value)}
                        >
                            {
                                hamletList.map((item, index) => {
                                    return <Option value={item?.id ? item?.id : index}>{item.name}</Option>
                                })
                            }

                        </Select>
                        {permission.length === '6' && (<div className="text-danger"> Chưa nhập họ và tên </div>)}
                    </div>)}

                <div className="input__component">
                    <div>
                        <span>
                            Họ và tên
                        </span>
                        <span className="text-danger">*</span>
                    </div>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên công dân ..."
                    >
                    </Input>
                    {!name && <div className="text-danger"> Chưa nhập họ và tên </div>}
                </div>

                <div className="input__component">
                    <span>CCCD</span>
                    <Input
                        value={ID_number}
                        onChange={(e) => setID_number(e.target.value)}
                        placeholder="Nhập CCCD công dân ..."
                    >
                    </Input>
                </div>


                {<div className="input__component">
                    <span>Ngày sinh</span>
                    <DatePicker
                        value={dateOfBirth}
                        onChange={(value) => setDateOfBirth(value ? value : moment())}
                        placeholder="Chọn ngày sinh">
                    </DatePicker>
                </div>}

                <div className="input__component">
                    <span>Giới tính</span>
                    <Select
                        onChange={(value) => setGender(value)}
                        defaultValue={Gender}
                    >
                        {
                            gender.map(item => {
                                return <Option value={item.id}>{item.name}</Option>
                            })
                        }

                    </Select>
                </div>

                <div className="input__component">
                    <div>
                        <span>
                            Quê quán
                        </span>
                        <span className="text-danger">*</span>
                    </div>
                    <Input
                        value={hometown}
                        onChange={(e) => setHometown(e.target.value)}
                        placeholder="Nhập quê quán công dân ..."
                    >
                    </Input>
                    {!hometown && <div className="text-danger"> Chưa nhập quê quán </div>}
                </div>

                <div className="input__component">
                    <div>
                        <span>
                            Địa chỉ thường trú
                        </span>
                        <span className="text-danger">*</span>
                    </div>
                    <Input
                        value={temporary_address}
                        onChange={(e) => setTemporary_address(e.target.value)}
                        placeholder="Nhập địa chỉ thường trú công dân ..."
                    >
                    </Input>
                    {!temporary_address && <div className="text-danger"> Chưa nhập địa chỉ thường trú</div>}
                </div>

                <div className="input__component">
                    <span>Tạm trú</span>
                    <Input
                        value={permanent_address}
                        onChange={(e) => setPermanent_address(e.target.value)}
                        placeholder="Nhập tạm trú công dân ..."
                    >
                    </Input>
                </div>

                <div className="input__component">
                    <span>Tôn giáo</span>
                    <Input
                        value={religion}
                        onChange={(e) => setReligion(e.target.value)}
                        placeholder="Nhập tôn giáo ..."
                    >
                    </Input>
                </div>

                <div className="input__component">
                    <span>Trình độ học vấn</span>
                    <Input
                        value={education_level}
                        onChange={(e) => setEducation_level(e.target.value)}
                        placeholder="Nhập trình độ học vấn ..."
                    >
                    </Input>
                </div>

                <div className="input__component">
                    <span>Nghề nghiệp</span>
                    <Input
                        value={job}
                        onChange={(e) => setJob(e.target.value)}
                        placeholder="Nhập nghề nghiệp ..."
                    >
                    </Input>
                </div>

                <div className="button__component">
                    <Button
                        onClick={() => !model.id
                            ? handleCreate(
                                name,
                                ID_number,
                                dateOfBirth,
                                Gender,
                                hometown,
                                permanent_address,
                                temporary_address,
                                religion,
                                education_level,
                                job)
                            : handleUpdate(
                                model.id,
                                name,
                                ID_number,
                                dateOfBirth,
                                Gender,
                                hometown,
                                permanent_address,
                                temporary_address,
                                religion,
                                education_level,
                                job
                            )
                        }> {model.id ? 'Sửa' : 'Tạo'}</Button>
                </div>
            </div>
        </Modal >
    )
};
export default CitizenDetail;
