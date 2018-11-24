import {Component} from "react";
import styles from './index.css';
import styles2 from './revise.css';



import {Row, Col, Layout, Button} from 'antd';

import { RevisionPopup } from '../components/revision-popup';

import router from 'umi/router';
import { connect } from 'dva';

class RevisionPage extends Component {
  constructor(props) {
    super(props);
    console.log(props)
  }

  render() {
    console.log(this.props.pending)
    return(
      <div className={styles.normal} style={{height: "100%"}}>
        <Col className={styles2['container-flex']}>
          <Row className={styles.shaded}><h1>Get ready for this!</h1></Row>
          <Row>
            <Col offset={6} span={12}><RevisionPopup subjectData={this.props.pending }/></Col>
          </Row>
          <Layout.Footer>
            <Row type="flex" justify="end">
              <Col><Button>Start</Button></Col>
            </Row>
          </Layout.Footer>
        </Col>
      </div>
    );
  }
}

function mapStateToProps(state) {

  return {
    pending: state.index.pending,
    showPreview: state.index.showPreview
  };
}

export default connect(mapStateToProps)(RevisionPage);
