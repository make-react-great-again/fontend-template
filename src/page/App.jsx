import React, { Suspense } from 'react';
import { flatRoutes } from '../js/routes_helper';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Routes from '../routes';
import './style.scss';
import Loading from '../components/loading';
import Slider from '../components/slider';
import CommonHeader from '../components/header';
import { Layout } from 'antd';

const { Header, Sider, Content } = Layout;
class App extends React.Component {
  render() {
    return (
      <Layout>
        <Sider>
          <Slider />
        </Sider>
        <Layout>
          <Header>
            <CommonHeader />
          </Header>
          <Content>
            <Router>
              <Suspense
                fallback={
                  <div className="loading">
                    <Loading />
                  </div>
                }
              >
                <Switch>
                  {flatRoutes(Routes).length &&
                    flatRoutes(Routes).map((item) => (
                      <Route path={item.path} exact component={item.component} key={item.path} />
                    ))}
                </Switch>
              </Suspense>
            </Router>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default App;
