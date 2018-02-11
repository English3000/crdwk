import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AuthForm from '../AuthForm';
import { Button } from '../../../utils/elements';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);
const testStore = mockStore({ session: {currentUser: null}, errors: [] });

jest.useFakeTimers(); //otherwise setTimeout fails

//end-to-end testing
describe('AuthForm', () => {
  let AuthFormWrapper;

  beforeEach(() => {
    AuthFormWrapper = mount(<AuthForm store={testStore}/>).find(AuthForm);
  });

  it('handles invalid Sign Up', () => {
    expect(testStore.getState().errors.length).toBe(0);
    AuthFormWrapper.find(Button).first().simulate('click');
  });

  it('handles invalid Sign In', () => {
    expect(testStore.getState().errors.length).toBe(0);
    AuthFormWrapper.find(Button).last().simulate('click');
  });

  afterEach(done => {
    function callback() {
      console.log(testStore.getState());
      expect(testStore.getState().errors.length).toBeGreaterThan(0);
      done();
    }
    console.log(testStore.getState());

    setTimeout(callback, 0);
    // makes 2 AJAX requests
    // errors are dispatched, but never reach reducer

    //Timeout - Async callback was not invoked
    // within the 20-second timeout specified by jest.setTimeout.

    // it's an issue w/ setTimeout (commented out the clicks)

    // jest.runAllTimers();
    // jest.advanceTimersByTime(1000);
    // now the tests run but the AJAX request doesn't have time to reach the server
  });
});
