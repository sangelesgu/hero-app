import { mount } from 'enzyme';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('Test in <SearchScreen/>', () => {
  
  test('should display corretly with default values', () => {
    const wrapper = mount (
      <MemoryRouter initialEntries={['/search']}>
        <Route path="/search" component={SearchScreen}/>
      </MemoryRouter>
    );    
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.alert-info').text().trim()).toBe('Search a hero..')
  }); 

  test('should show batman and input with value of queryString', () => {
    const wrapper = mount (
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Route path="/search" component={SearchScreen}/>
      </MemoryRouter>
    );
    
    expect(wrapper.find('input').prop('value')).toBe('batman');
    expect(wrapper).toMatchSnapshot();
  })
  
  test('should return error if not find hero', () => {
    const wrapper = mount (
      <MemoryRouter initialEntries={['/search?q=batman123131']}>
        <Route path="/search" component={SearchScreen}/>
      </MemoryRouter>
    );
    expect(wrapper.find('.alert-danger').text().trim()).toBe('There is not a hero with batman123131');
    expect(wrapper).toMatchSnapshot();
  }); 

  test('should call push of history', () => {
    const history = {
      push: jest.fn()
    }

    const wrapper = mount (
      <MemoryRouter initialEntries={['/search?q=batman123131']}>
        <Route 
          path="/search" 
          component={ () => <SearchScreen history={history}/>}
        />
      </MemoryRouter>
    );

    wrapper.find('input').simulate('change', {
      target: {
        name: 'searchText', 
        value: 'batman'
      }
    }); 

    wrapper.find('form').prop('onSubmit')({
      preventDefault(){}
    }); 

    expect(history.push).toHaveBeenCalledWith('?q=batman');
  })
  
  
  
})
