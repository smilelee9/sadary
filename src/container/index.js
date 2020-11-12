import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CreatePostContainer, EditPostContainer, PostViewContainer, PostsListContainer } from './posts/index';
import { LoginContainer, RegisterContainer } from './member/index';

import HeaderContainer from './HeaderContainer'
import { Provider } from 'react-redux'
import React from 'react';
import { Redirect } from 'react-router'
import store from '../common/store'

export default function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <HeaderContainer />
          <Switch>
            <Route exact path="/register" component={RegisterContainer} />
            <Route exact path="/login" component={LoginContainer} />
            {/* <Route path="logout" component={LogoutContainer} /> */}
            <Route exact path="/create" component={CreatePostContainer} />
            <Route exact path="/edit/:id" component={EditPostContainer} />
            <Route exact path="/:id" component={PostViewContainer} />
            <Route exact path="/">
              <PostsListContainer />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>

  )
}