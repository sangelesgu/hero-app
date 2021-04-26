import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/ui/Navbar';
import { types } from '../../../types/types';
const { mount } = require("enzyme")

describe('Test in <Navabar />', () => {

  const historyMock = {
    push: jest.fn(),
    replace: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn()
  }
  const contextValue = {
    dispatch : jest.fn(),
    user: {
      logged: true, 
      name: 'Pepe'
    }
  }

  const wraper = mount(
    <AuthContext.Provider value={contextValue}>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar/>
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
    
  )

  afterEach(()=> {
    jest.clearAllMocks();
  });

  test('should display component', () => {
    expect(wraper).toMatchSnapshot();
    expect(wraper.find('.text-info').text().trim()).toBe('Pepe')
  });

  test('should call logout and use history', () => {
    wraper.find('button').prop('onClick')();
    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.logout
    })

    expect(historyMock.replace).toHaveBeenCalledWith('/login')
  }); 
  
  
})
