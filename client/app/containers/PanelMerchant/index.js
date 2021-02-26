/*
 *
 * Panel Merchant
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { Switch, Route } from 'react-router-dom';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';

import AccountMenu from '../../components/AccountMenu';
import Page404 from '../../components/Page404';

import Account from '../Account';
import AccountSecurity from '../AccountSecurity';
import Product from '../Product';
import Brand from '../Brand';
import Order from '../Order';

class PanelMerchant extends React.PureComponent {
  render() {
    const { isMenuOpen, panelMerchantLinks, togglePanelMerchantMenu } = this.props;

    return (
      <div className='admin'>
        <Row>
          <Col xs='12' md='5' xl='4'>
            <AccountMenu
              isMenuOpen={isMenuOpen}
              accountLinks={panelMerchantLinks}
              toggleMenu={togglePanelMerchantMenu}
            />
          </Col>
          <Col xs='12' md='7' xl='8'>
            <div className='panel-body'>
              <Switch>
                <Route exact path='/dashboard' component={Account} />
                <Route
                  exact
                  path='/dashboard/security'
                  component={AccountSecurity}
                />
                <Route path='/dashboard/products' component={Product} />
                <Route path='/dashboard/brands' component={Brand} />
                <Route path='/dashboard/orders' component={Order} />
                <Route path='*' component={Page404} />
              </Switch>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isMenuOpen: state.panelMerchant.isMenuOpen,
    panelMerchantLinks: state.panelMerchant.panelMerchantLinks
  };
};

export default connect(mapStateToProps, actions)(PanelMerchant);
