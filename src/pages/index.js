import styles from './index.css';
import { Layout, Divider, Button, Card, Progress, Menu, Breadcrumb, Icon } from 'antd';
import { Row, Col, Modal, List,Skeleton,Avatar } from 'antd';
import { RevisionPopup } from '../components/revision-popup';

export default function() {
  return (
    <div className={styles.normal}>
      <Row className={styles.shaded}><h1>Welcome back, Walid</h1></Row>
      <Row className={styles.shaded}><Divider>Your stats for today</Divider></Row>
      <Row>
        <Col span={6}>
          <Card title="Concepts due" bordered={true} extra={<Button htmlType={"button"} type={"primary"}><Icon type="build" /> Revise</Button>}>
              <Progress type="circle" percent={50} format={percent => `5/10`} />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Retain rate" bordered={true} extra={<Button htmlType={"button"} type={"primary"}><Icon type="fund" /> Details</Button>}>
            <Progress type="circle" percent={75} />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Daily goal" bordered={true} extra={<Button htmlType={"button"} type={"primary"}><Icon type="setting" /> Settings</Button>}>
            <Progress type="circle" percent={1600/30} format={percent => `16/30 mins.`} />
          </Card>
        </Col>
        <Col span={6}>
          <Card title="Revision streak" bordered={true} extra={<Button htmlType={"button"} type={"primary"}><Icon type="ordered-list" /> Rankings</Button>}>
            <Progress type="circle" percent={100} format={percent => `6 Days`} />
          </Card>
        </Col>
      </Row>
      <Modal
        visible={true}
        title="Revision time!"
        centered={true}
        // onOk={this.handleOk}
        // onCancel={this.handleCancel}
        footer={[
          <Button key="back" >Return</Button>,
          <Button key="submit" type="primary" loading={false} >
            Start
          </Button>,
        ]}
      >
        <h3>Here's the revision plan for today:</h3>
        <RevisionPopup/>
      </Modal>
    </div>
  );
}
