import styles from './index.css';
import { Layout, Divider, Button, Card, Progress, Menu, Breadcrumb, Icon } from 'antd';
import { Row, Col, Modal, List,Skeleton,Avatar } from 'antd';
import { RevisionPopup } from '../components/revision-popup';
import router from 'umi/router';
import { connect } from 'dva';

function Dashboard(props) {

  function ShowPreview() {
    props.dispatch({
      type: "index/preview",
      payload: true
    });
  }

  function HidePreview() {
    props.dispatch({
      type: "index/preview",
      payload: false
    });
  }

  function LoadRevision() {
    HidePreview();
    router.push("/revise");
  }

  return (
    <div className={styles.normal}>
      <Row className={styles.shaded}><h1>Welcome back, Walid</h1></Row>
      <Row className={styles.shaded}><Divider>Your stats for today</Divider></Row>
      <Row>
        <Col span={6}>
          <Card title="Concepts due" bordered={true} extra={<Button htmlType={"button"} onClick={ShowPreview} type={"primary"}><Icon type="build" /> Revise</Button>}>
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
        visible={props.showPreview}
        title="Revision time!"
        centered={true}
        onOk={HidePreview}
        onCancel={HidePreview}
        footer={[
          <Button key="back" onClick={HidePreview} >Return</Button>,
          <Button key="submit" onClick={LoadRevision} type="primary" loading={false} >
            Start
          </Button>,
        ]}
      >
        <h3>Here's the revision plan for today:</h3>
        <RevisionPopup subjectData={props.pending}/>
      </Modal>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    pending: state.index.pending,
    showPreview: state.index.showPreview
  };
}

export default connect(mapStateToProps)(Dashboard);
