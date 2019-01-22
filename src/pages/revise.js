import {Component} from "react";
import styles from './index.css';
import styles2 from './revise.css';

import elec_img from '../assets/electricity-note.JPG';

import {Row, Col, Layout, Icon, Spin, Button} from 'antd';

import Timer from 'react-compound-timer';

import { RevisionPopup } from '../components/revision-popup';

import router from 'umi/router';
import { connect } from 'dva';

class RevisionPage extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    Notification.requestPermission();

    this.state = {
      started: false,
      loaded: false,
      ended: false
    };

    this.RenderLoading = this.RenderLoading.bind(this);
    this.RenderIntro = this.RenderIntro.bind(this);
    this.RenderConcept = this.RenderConcept.bind(this);
    this.LoadRevision = this.LoadRevision.bind(this);
  }

  render() {
    if (this.state.started) {
      return this.state.loaded ? this.RenderConcept() : this.RenderLoading();
    } else {
      return this.RenderIntro();
    }
  }

  RenderLoading() {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    var concept = this.GetCurrentConcept();
    console.log(this.props.pending);
    return(
      <div className={styles.normal} style={{height: "100%"}}>
        <Col className={styles2['container-flex']}>
          <Row className={styles.shaded}><h1>Loading Concept {this.props.pending.indexOf(concept)+1}...</h1></Row>
          <Row className={styles.shaded}><img src={concept.icon}/>  </Row>
          <Row className={styles.shaded}><h2>{concept.subject}</h2></Row>
          <Row className={styles.shaded}><h3>{concept.concept}</h3></Row>
          <Row>
            <Col offset={6} span={12} className={styles2.loading_spinner}><Spin indicator={antIcon} size={'large'}/></Col>
          </Row>
          {/*<Layout.Footer>*/}
          {/*<Row type="flex" justify="end">*/}
          {/*<Col><Button>Start</Button></Col>*/}
          {/*</Row>*/}
          {/*</Layout.Footer>*/}
        </Col>
      </div>
    );
  }

  RenderConcept() {
    const concept = this.GetCurrentConcept();
    console.log(this.props.pending);
    return(
      <div className={styles.normal} style={{height: "100%"}}>
        <Col className={styles2['container-flex']}>
          <Row className={styles.shaded}><h1>{this.state.finished?"Finished!":"Started!"}</h1></Row>

          <Row className={styles.shaded}><h2>{concept.subject}</h2></Row>
          <Row className={styles.shaded}><h3>{concept.concept}</h3></Row>
          <Row className={styles.shaded}><img alt={''} src={elec_img}/>  </Row>
          <Row>
            <Col offset={6} span={12}>
              <Timer initialTime={67 * 1000} direction={'backward'} lastUnit={'m'}
              checkpoints={[
                {
                  time: 0,
                  callback: this.NotifyEnd
                }
              ]}>
                <div className={styles2.countdown_timer}>
                  0<Timer.Minutes/>:0<Timer.Seconds/>
                </div>
              </Timer>
            </Col>
          </Row>
          <Row>
            {this.state.finished ? <Button type={'primary'}>Next</Button>:null}
          </Row>
          {/*<Layout.Footer>*/}
          {/*<Row type="flex" justify="end">*/}
          {/*<Col><Button>Start</Button></Col>*/}
          {/*</Row>*/}
          {/*</Layout.Footer>*/}
        </Col>
      </div>
    );
  }

  GetCurrentConcept() {
    return this.props.pending[0];
  }

  RenderIntro() {
    console.log(this.props.pending);
    return(
      <div className={styles.normal} style={{height: "100%"}}>
        <Col className={styles2['container-flex']}>
          <Row className={styles.shaded}><h1>Today's revision plan</h1></Row>
          <Row>
            <Col offset={6} span={12}><RevisionPopup subjectData={this.props.pending }/></Col>
          </Row>
          <Layout.Footer>
            <Row type="flex" justify="end">
              <Col><Button onClick={this.LoadRevision}>Start</Button></Col>
            </Row>
          </Layout.Footer>
        </Col>
      </div>
    );
  }

  LoadRevision () {
    this.setState({
      started: true
    });

    setTimeout(() => {
      this.setState({
        loaded: true
      });
    }, 3000);
  }

  NotifyEnd() {
    if (window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission((status) => {
        // status is "granted", if accepted by user
        var n = new Notification('Times up!', {
          body: '10mins have elapsed, time for your next concept!',
          //icon: '/path/to/icon.png' // optional
        });
      })
    }

    this.setState({
      ended: true
    });
  }
}

function mapStateToProps(state) {

  return {
    pending: state.index.pending,
    showPreview: state.index.showPreview
  };
}

export default connect(mapStateToProps)(RevisionPage);
