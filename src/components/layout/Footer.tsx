import { Layout, Row, Col } from "antd";
import { HeartFilled } from "@ant-design/icons";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter style={{ background: "#fafafa" }}>
      <Row className="just">
        <Col xs={24} md={12} lg={12}>
          <div className="copyright">
            © 2021, CitizenV
            {<HeartFilled />} - 
            <a href="#pablo" className="font-weight-bold" target="_blank">
            Hệ thống 
            </a>
            điều tra dân số
          </div>
        </Col>
        
      </Row>
    </AntFooter>
  );
}

export default Footer;
