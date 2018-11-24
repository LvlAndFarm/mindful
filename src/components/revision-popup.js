import {List, Skeleton, Avatar, Icon, Popover, Row, Col, Button} from "antd";

function ItemMenu() {
  const MenuContent = function() {
    return (
      <Row style={{width: "200px"}} gutter={16}>
        <Col span={8}>
          <Row>
            <Col>
              <Button>
                <Icon type="fast-forward" />
              </Button>
            </Col>
          </Row>

        </Col>
        <Col span={8}>
          <Row>
            <Col>
              <Button>
                <Icon type="edit" />
              </Button>
            </Col>
          </Row>

        </Col>
        <Col span={8}>
          <Row>
            <Col>
              <Button type="danger">
                <Icon type="delete" />
              </Button>
            </Col>
          </Row>

        </Col>
      </Row>
    )
  }

  return (
    <Popover placement="bottom" content={MenuContent()}>
      <Icon type="down-circle" />
    </Popover>
  )
}

export function RevisionPopup(props) {
  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={props.subjectData }
      renderItem={item => (
        <List.Item actions={[ItemMenu()]}>
          <Skeleton avatar title={false} loading={false} active>
            <List.Item.Meta
              avatar={<Avatar src={item.icon} />}
              title={<a href="https://ant.design">{item.subject}</a>}
              description={item.concept}
            />
          </Skeleton>
        </List.Item>
      )}
    />
  )
}
