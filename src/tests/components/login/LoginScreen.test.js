import React from 'react';
import { mount } from "enzyme";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { AuthContext } from '../../../auth/AuthContext';

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
    
  });
  
  
})
