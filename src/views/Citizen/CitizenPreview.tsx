import { Descriptions, Modal, ModalProps, Row, Select } from "antd";
import { CitizenData } from "models/Citizen/CitizenData";
import moment from "moment";


interface CitizenPreviewProps extends ModalProps {
    isOpenPreview: boolean;
    model: CitizenData,
    handleCloseModal: () => void,
}
const { Option } = Select;
function CitizenPreview(props: CitizenPreviewProps
) {
    const { handleCloseModal, model, isOpenPreview } = props;


    return (
        <Modal
            footer={false}
            visible={isOpenPreview}
            onCancel={handleCloseModal}
            width={900}
        >
            <Descriptions title={`Thông tin công dân ${model.name}`}>
                <Descriptions.Item label="Họ và tên">{model.name}</Descriptions.Item>
                <Descriptions.Item label="Căn cước/ cmtnd">{model.ID_number}</Descriptions.Item>
                <Descriptions.Item label="Giới tính">{model.gender === 1 ? `nam` : `nữ`}</Descriptions.Item>
                <Descriptions.Item label="Ngày sinh">{moment(model.date_of_birth).format('DD-MM-YYYY')}</Descriptions.Item>
                <Descriptions.Item label="Quê quán">{model.hometown}</Descriptions.Item>
                <Descriptions.Item label="Địa chỉ thường trú">{model.permanent_address}</Descriptions.Item>
                <Descriptions.Item label="Địa chỉ hiện tại">{model.temporary_address}</Descriptions.Item>
                <Descriptions.Item label="Tôn giáo">{model.religion}</Descriptions.Item>
                <Descriptions.Item label="Trình độ học vấn">{model.education_level}</Descriptions.Item>
                <Descriptions.Item label="Nghề nghiệp">{model.job}</Descriptions.Item>
            </Descriptions>
        </Modal >
    )
};
export default CitizenPreview;
