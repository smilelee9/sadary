import { BrowserRouter, Route } from "react-router-dom";
import { CreatePostContainer, EditPostContainer, PostsListContainer } from './posts/index';
import { LoginContainer, RegisterContainer } from './member/index';

import Header from '../component/Header';
import { Provider } from 'react-redux'
import React from 'react';
import mockData from '../common/mockData'
import store from '../common/store'

export default function Root() {
  const [state, setState] = React.useState({
    user: 'user1',
    posts: mockData.posts,
  })

  // React.useEffect(() => {
  //   setState({ ...state, roomList: mockData.roomList })
  // }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/register" component={RegisterContainer} />
          <Route exact path="/login" component={LoginContainer} />
          {/* <Route path="logout" component={LogoutContainer} /> */}

          <Route exact path="/create">
            <CreatePostContainer />
          </Route>
          <Route exact path="/edit/:id" component={EditPostContainer} />
          <Route exact path="/">
            <PostsListContainer posts={state.posts} />
          </Route>

        </div>
      </BrowserRouter>
    </Provider>

  )
}