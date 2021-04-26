import React from 'react';
import { mount } from "enzyme";
import { AppRouter } from '../../components/routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';


describe('Test in <AppRouter/>', () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false
    }
  }
  test('should display login is not authenticated', () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue} >
        <AppRouter />
      </AuthContext.Provider>
    )

    expect(wrapper).toMatchSnapshot();

  });
  
  test('should display component marvel if is authenticated', () => {
    
    const contextValue = {
      dispatch: jest.fn(),
      user: {
        logged: true,
        name: 'Samuel'
      }
    }
    const wrapper = mount(
      <AuthContext.Provider value={contextValue} >
        <AppRouter />
      </AuthContext.Provider>
    )

    expect(wrapper.find('.navbar').exists()).toBe(true);
    
  })
  
})
