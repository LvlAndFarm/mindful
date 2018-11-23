import styles from './index.css';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';

import router from 'umi/router';
import Link from 'umi/link';
import NavLink from 'umi/navlink';
import React from 'react';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function BasicLayout(props) {
  return (
    <div >
      {/*<div className={styles.welcome} />*/}
      {/*<ul className={styles.list}>*/}
      {/*<li>To get started, edit <code>src/pages/index.js</code> and save to reload.</li>*/}
      {/*<li><a href="https://umijs.org/guide/getting-started.html">Getting Started</a></li>*/}
      {/*</ul>*/}
      <Layout>
        <Header className="header">
          {/*<div className={styles.logo}>Mindful</div>*/}
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key={"0"}>
              <div className={styles.logo}>Mindful</div>
            </Menu.Item>

            <Menu.Item key="1"><NavLink to="/">Home</NavLink></Menu.Item>
            <Menu.Item key="2"><Link to="/products">Feedback</Link></Menu.Item>
            <Menu.Item key="3">Logout</Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              theme={"dark"}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <SubMenu key="sub1" title={<span><Icon type="user" />Dashboard</span>}>
                <Menu.Item key="1"><span><Icon type="area-chart" />Summary</span></Menu.Item>
                <SubMenu key="sub2" title={<span><Icon type="bars" />Subjects</span>}>
                  <Menu.Item key="13">Maths</Menu.Item>
                  <Menu.Item key="14">Further Maths</Menu.Item>
                  <Menu.Item key="15">Physics</Menu.Item>
                  <Menu.Item key="16">Chemistry</Menu.Item>
                </SubMenu>
              </SubMenu>
              <SubMenu key="sub3" title={<span><Icon type="laptop" />Revise</span>}>
                <Menu.Item key="5">option5</Menu.Item>
                <Menu.Item key="6">option6</Menu.Item>
                <Menu.Item key="7">option7</Menu.Item>
                <Menu.Item key="8">option8</Menu.Item>
              </SubMenu>
              <SubMenu key="sub4" title={<span><Icon type="setting" />Settings</span>}>
                <Menu.Item key="9">option9</Menu.Item>
                <Menu.Item key="10">option10</Menu.Item>
                <Menu.Item key="11">option11</Menu.Item>
                <Menu.Item key="12">option12</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              <Breadcrumb.Item>Summary</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 834 }}>
              {props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default BasicLayout;
