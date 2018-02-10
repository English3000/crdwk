import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AuthForm from '../AuthForm';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);
const testStore = mockStore({ session: {currentUser: null}, errors: [] });

//integration testing
describe('AuthForm', () => {
  let AuthFormWrapper;

  beforeEach(() => {
    AuthFormWrapper = mount(<AuthForm store={testStore}/>).find(AuthForm);
  });

  it('handles invalid Sign Up', () => {
    const paragraphs = AuthFormWrapper.find('p');
    AuthFormWrapper.first('button').simulate('click');
    expect(AuthFormWrapper.find('p').length).toBeGreaterThan(paragraphs.length);
  });

  it('handles invalid Sign In', () => {
    const paragraphs = AuthFormWrapper.find('p');
    AuthFormWrapper.last('button').simulate('click');
    //component doesn't render its errors
    expect(AuthFormWrapper.find('p').length).toBeGreaterThan(paragraphs.length);
  });
});
