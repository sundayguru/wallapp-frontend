/**
 * Created by sundayguru on 03/04/2017.
 */

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import {Config} from '../../Utils';
import * as actions from '../../actions/WallActions';
import nock from 'nock';
import expect from 'expect';


const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('Wall Posts', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('postNewMessage creates NEW_MESSAGE_POSTED after success post', () => {
      const mock_response = {
          "id": 1,
          "message": "test"
      };
    nock(Config.domain)
      .post('/api/walls/')
      .reply(200, mock_response);

    const expectedActions = [
      { type: actions.POST_NEW_MESSAGE,  payload: undefined },
      { type: actions.NEW_MESSAGE_POSTED, payload: mock_response }
    ];
    const store = mockStore({ user: {}, requesting: false });

    return store.dispatch(actions.postNewMessage({"message":"test"}))
      .then(() => { 
        expect(store.getActions()).toEqual(expectedActions);
      })
  });

});