/*
 *
 * Sell
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import { Row, Col } from 'reactstrap';

import actions from '../../actions';

import Input from '../../components/Input';
import Button from '../../components/Button';

class Sell extends React.PureComponent {
  render() {
    const { sellFormData, formErrors, sellFormChange, sellWithUs } = this.props;

    const handleSubmit = event => {
      event.preventDefault();
      sellWithUs();
    };

    return (
      <div className='sell'>
        <h2>Become A MERN Store Seller!</h2>
        <hr />
        <Row>
          <Col xs='12' md='6' className='order-2 order-md-1'>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col xs='12'>
                  <Input
                    type={'text'}
                    error={formErrors['firstName']}
                    label={'First Name'}
                    name={'firstName'}
                    placeholder={'Your First Name'}
                    value={sellFormData.firstName}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='12'>
                  <Input
                    type={'text'}
                    error={formErrors['lastName']}
                    label={'Last Name'}
                    name={'lastName'}
                    placeholder={'Your Last Name'}
                    value={sellFormData.lastName}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='12'>
                  <Input
                    type={'text'}
                    error={formErrors['email']}
                    label={'Email Address'}
                    name={'email'}
                    placeholder={'Your Email Address'}
                    value={sellFormData.email}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='12'>
                  <Input
                    type={'text'}
                    error={formErrors['mobileNumber']}
                    label={'Mobile Number'}
                    name={'mobileNumber'}
                    placeholder={'Your Mobile Number'}
                    value={sellFormData.mobileNumber}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='12'>
                  <Input
                    type={'text'}
                    error={formErrors['brand']}
                    label={'Brand'}
                    name={'brand'}
                    placeholder={'Your Business Brand'}
                    value={sellFormData.brand}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
                <Col xs='12'>
                  <Input
                    type={'textarea'}
                    error={formErrors['business']}
                    label={'Business'}
                    name={'business'}
                    placeholder={'Please Describe Your Business'}
                    value={sellFormData.business}
                    onInputChange={(name, value) => {
                      sellFormChange(name, value);
                    }}
                  />
                </Col>
              </Row>
              <hr />
              <div className='sell-actions'>
                <Button type='submit' text='Submit' />
              </div>
            </form>
          </Col>
          <Col xs='12' md='6' className='order-1 order-md-2'>
            <Row>
              <Col xs='12' className='order-2 order-md-1 text-md-center mb-3'>
                <div className='agreement-banner-text'>
                  <h3>Would you like to sell your products on MERN Store!</h3>
                  <h4>Grow your business with MERN Store</h4>
                  <b>Apply Today</b>
                </div>
              </Col>

              <Col
                xs='12'
                className='order-1 order-md-2 text-center mb-3 mb-md-0'
              >
                <img
                  className='agreement-banner'
                  src={'/images/banners/agreement.svg'}
                  alt='agreement banner'
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    sellFormData: state.merchant.sellFormData,
    formErrors: state.merchant.formErrors
  };
};

export default connect(mapStateToProps, actions)(Sell);
