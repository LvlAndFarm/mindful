import {Component} from "react";

import {List, Skeleton, Avatar, Icon, Popover, Row, Col, Button} from "antd";
import Anime from 'react-anime';

import styles from './revision-resources.css';

import {NoteEditor} from './note-editor';

export class RevisionResources extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notepad: false
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(item) {
    if (item.title.includes("Sketchboard")) {
      this.setState({
        notepad: true
      })
    }
  }

  render() {
    if (this.state.notepad) {
      return <NoteEditor/>;
    }

    return (
      <List
        className={styles.resourcebox}
        bordered={true}
        itemLayout="horizontal"
        dataSource={this.props.list}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.icon} />}
              title={<a href={item.link} onClick={() => {this.handleClick(item)} } target={"_blank"}>{item.title}</a>}
              // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </List.Item>
        )}
      />
    )
  }
}
