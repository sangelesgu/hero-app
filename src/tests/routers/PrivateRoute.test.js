import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { PrivateRoute } from '../../components/routers/PrivateRoute';
const { mount } = require("enzyme");

describe('Test in <PrivateRoute/>', () => {

  const props = {
    location: {
      pathname: '/dc'
    }
  }

  Storage.prototype.setItem = jest.fn()
  
  test('should display component if is authenticated and save in localStorage', () => {
   
    const wraper = mount(
      <MemoryRouter>
          <PrivateRoute 
            isAuthenticated={true} 
            component={()=> <span>Listo</span>} 
            {...props}
          /> 
      </MemoryRouter>      
    ); 

    expect(wraper.find('span').exists()).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/dc')
  }); 

  test('should block component if is not authenticated', () => {
    const wraper = mount(
      <MemoryRouter>
          <PrivateRoute 
            isAuthenticated={false} 
            component={()=> <span>Listo</span>} 
            {...props}
          /> 
      </MemoryRouter>      
    ); 

    expect(wraper.find('span').exists()).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/dc')
  });
  
  
})
