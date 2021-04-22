import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe('Test in authReducer', () => {
  
  test('should return default state', () => {

    const state = authReducer({logged: false}, {});
    expect(state).toEqual({logged: false});
  });

  test('should auth and set user name', () => {
    const action = {
      type: types.login,
      payload: {
        name: 'Samuel'
      }
    }

    const state = authReducer({logged: false}, action);
    expect(state).toEqual({
      logged: true,
      name: 'Samuel'
    })
  }); 

  test('should delete user name and set logged in false', () => {

    const action = {
      type: types.logout
    }

    const state = authReducer({logged: true, name: 'Samuel'}, action);
    expect(state).toEqual({ logged: false });
  });
  
})
