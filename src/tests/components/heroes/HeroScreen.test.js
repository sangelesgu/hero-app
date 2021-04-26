import { mount } from "enzyme"
import { MemoryRouter, Route } from "react-router-dom";
import { HeroScreen } from "../../../components/heroes/HeroScreen";

describe('Test in <HeroScreen/>', () => {

  const history = {
    length: 10,
    goBack: jest.fn(),
    push: jest.fn(),
  }

  const wrapper = mount(
    <MemoryRouter initialEntries={['/hero']}>
      <HeroScreen history={history}/>
    </MemoryRouter>
  );

  test('should display redirect if not URL arguments', () => {

    expect(wrapper.find('Redirect').exists()).toBe(true)
  });

  test('should display a hero if parameter exits', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
          <Route path="/hero/:heroId" component={ HeroScreen } />
      </MemoryRouter>
  );
    expect( wrapper.find('.row').exists() ).toBe(true);
  }); 

  test('should return to preview screen with push', () => {

    const history = {
      length: 1, 
      push: jest.fn(),
      goBack: jest.fn()
    }

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route 
          path="/hero/:heroId"
          component={ () => <HeroScreen history={ history } />}
        />
      </MemoryRouter>
    );

    wrapper.find('button').prop('onClick')();

    expect(history.push).toHaveBeenLastCalledWith('/');
    expect( history.goBack).not.toHaveBeenCalled();
  }); 

  test('should go back to preview screen', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route 
          path="/hero/:heroId"
          component={ () => <HeroScreen history={ history } />}
        />
      </MemoryRouter>
    );

    wrapper.find('button').prop('onClick')();
    expect(history.push).toHaveBeenCalledTimes(0);
    expect(history.goBack).toHaveBeenCalled();
  }); 


  test('should call Redirect if id does not exits', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider123123']}>
        <Route 
          path="/hero/:heroId"
          component={ () => <HeroScreen history={ history } />}
        />
      </MemoryRouter>
    );
  
    expect(wrapper.text()).toBe('')
    
  })
  
  
  
  
})
