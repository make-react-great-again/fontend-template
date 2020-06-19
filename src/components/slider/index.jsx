import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import history from '../../js/history';
import './style.scss';
import menusList from '../../routes';
const { SubMenu } = Menu;

const { Sider } = Layout;
class LayoutComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      menuList: [],
    };
  }

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  goMenuItem(item) {
    history.push(item.path);
  }

  render() {
    return (
      <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
        <Menu theme="dark" mode="inline">
          {menusList.map((item, index) =>
            item.children ? (
              <SubMenu
                key={item.path}
                title={
                  <span>
                    {item.icon && <Icon type={item.icon} />}
                    <span>{item.title}</span>
                  </span>
                }
              >
                {item.children.map((element, index1) => (
                  <Menu.Item key={element.path} onClick={this.goMenuItem.bind(this, element)}>
                    {item.icon && <Icon type={item.icon} />}
                    <span>{element.title}</span>
                  </Menu.Item>
                ))}
              </SubMenu>
            ) : (
              <Menu.Item key={item.path} onClick={this.goMenuItem.bind(this, item)}>
                {item.icon && <Icon type={item.icon} />}
                <span>{item.title}</span>
              </Menu.Item>
            ),
          )}
        </Menu>
      </Sider>
    );
  }
}

export default LayoutComponent;
