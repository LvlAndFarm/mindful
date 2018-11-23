import {List, Skeleton, Avatar} from "antd";

export function RevisionPopup() {
  return (
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      dataSource={[{
        subject: "Physics",
        concept: "Electricity: Resistivity of an element/compound",
        icon: "https://static.thenounproject.com/png/98751-200.png"
      },
        {
          subject: "Chemistry",
          concept: "Dative covalent bonding",
          icon: "https://cdn0.iconfinder.com/data/icons/industrial-icons/164/5-512.png"
        },
        {
          subject: "Further Maths",
          concept: "Equation of a plane",
          icon: "https://png.pngtree.com/svg/20170124/function_1249798.png"
        }
      ]}
      renderItem={item => (
        <List.Item actions={[<a>edit</a>, <a>more</a>]}>
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
