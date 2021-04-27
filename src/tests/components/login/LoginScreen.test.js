import React from 'react';
import { mount } from "enzyme";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { AuthContext } from '../../../auth/AuthContext';
import { types } from '../../../types/types';

describe('Test in <LoginScreen />', () => {
  const history = {
    replace: jest.fn()
  }
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false
    }
  }

  const wrapper = mount (
    <AuthContext.Provider value={contextValue}> 
      <LoginScreen history={history} />
    </AuthContext.Provider>
  );
  
  test('should return snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  }); 

  test('should do dispatch and navigate', () => {
    const handleClick = wrapper.find('button').prop('onClick'); 
    handleClick();
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: {
        name: 'Samuel'
      }
    }); 

    expect(history.replace).toHaveBeenCalledWith('/');
    localStorage.setItem('lastPath', '/dc');
    handleClick();
    expect(history.replace).toHaveBeenCalledWith('/dc');
  });
  
  
})
