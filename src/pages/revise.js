import {Component} from "react";
import styles from './index.css';
import styles2 from './revise.css';

import elec_img from '../assets/electricity-note.JPG';

import {Row, Col, Layout, Icon, Spin, Button, List, Avatar} from 'antd';

import Timer from 'react-compound-timer';

import { RevisionPopup } from '../components/revision-popup';
import { RevisionResources } from '../components/revision-resources';

import router from 'umi/router';
import { connect } from 'dva';

const leftPad = require('left-pad');

class RevisionPage extends Component {
  constructor(props) {
    super(props);
    console.log(props);

    Notification.requestPermission();

    this.state = {
      started: false,
      loaded: false,
      ended: false,
      concept_index: 0
    };

    this.RenderLoading = this.RenderLoading.bind(this);
    this.RenderIntro = this.RenderIntro.bind(this);
    this.RenderConcept = this.RenderConcept.bind(this);
    this.LoadRevision = this.LoadRevision.bind(this);
    this.NotifyEnd = this.NotifyEnd.bind(this);
    this.AdvanceNext = this.AdvanceNext.bind(this);
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

    const resource_list = [
      {
        title: 'Educational videos',
        icon: 'https://image.flaticon.com/icons/svg/187/187209.svg',
        link: 'https://www.youtube.com/results?search_query=' + concept.concept
      },
      {
        title: 'TheStudentRoom notes',
        icon: 'https://pbs.twimg.com/profile_images/905387421004640256/1U2sixHB_400x400.jpg',
        link: 'https://www.thestudentroom.co.uk/a-level/subjects/' + concept.subject
      },
      {
        title: 'Personal notes',
        icon: 'https://cdn2.iconfinder.com/data/icons/business-and-internet/512/Note-512.png'
      },
      {
        title: 'Sketchboard',
        icon: 'https://cdn3.iconfinder.com/data/icons/stroke/53/Clipboard-512.png'
      },
    ];

    console.log(this.props.pending);
    return(
      <div className={styles.normal} style={{height: "100%"}}>
        <Col className={styles2['container-flex']}>
          <Row className={styles.shaded}><h1>{this.state.finished?"Finished!":"Started!"}</h1></Row>

          <Row className={styles.shaded}><h2>{concept.subject}</h2></Row>
          <Row className={styles.shaded}><h3>{concept.concept}</h3></Row>
          {/*<Row className={styles.shaded}><img alt={''} src={elec_img}/>  </Row>*/}
          <Row className={styles.shaded}>
            <Col offset={8} span={8}>
              <RevisionResources list={resource_list}/>
            </Col>
          </Row>
          {/*<Row>*/}
            {/*<Col offset={6} span={12}>*/}
              {/*<Timer initialTime={4 * 1000} direction={'backward'} lastUnit={'m'}*/}
              {/*checkpoints={[*/}
                {/*{*/}
                  {/*time: 0,*/}
                  {/*callback: this.NotifyEnd*/}
                {/*}*/}
              {/*]}>*/}
                {/*<div className={styles2.countdown_timer}>*/}
                  {/*<Timer.Minutes/> mins, <Timer.Seconds/> secs left*/}
                {/*</div>*/}
              {/*</Timer>*/}
            {/*</Col>*/}
          {/*</Row>*/}
          <Row>
            {this.state.ended ? <Button onClick={this.AdvanceNext} type={'primary'}>Next</Button>:null}
          </Row>
          {/*<Layout.Footer>*/}
          {/*<Row type="flex" justify="end">*/}
          {/*<Col><Button>Start</Button></Col>*/}
          {/*</Row>*/}
          {/*</Layout.Footer>*/}
        </Col>
        <Timer initialTime={4 * 1000} direction={'backward'} lastUnit={'m'}
               checkpoints={[
                 {
                   time: 0,
                   callback: this.NotifyEnd
                 }
               ]}>
          <div className={styles2.countdown_timer}>
            <Timer.Minutes/> mins, <Timer.Seconds/> secs left
          </div>
        </Timer>
      </div>
    );
  }

  GetCurrentConcept() {
    return this.props.pending[this.state.concept_index];
  }

  AdvanceNext() {
    this.setState({
      concept_index: this.state.concept_index+1
    });
    this.LoadRevision();
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
      loaded: false,
      ended: false,
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
