import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { DashboardRoutes } from '../../components/routers/DashboardRoutes';
const { mount } = require("enzyme")

describe('Test in <DashboardRoutes/>', () => {

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: 'Pepe'
    }
  }
  
  test('should display correctly', () => {
    const wraper = mount(
      <AuthContext.Provider value={contextValue}>
        <MemoryRouter>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(wraper).toMatchSnapshot();
    expect(wraper.find('.text-info').text().trim()).toBe('Pepe')
  })
  
})
