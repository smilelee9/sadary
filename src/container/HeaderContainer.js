import Header from '../component/Header'
import React from 'react'
import { connect } from 'react-redux'

function HeaderContainer(props) {
  return (
    <div>
      <Header guest={props.guest} user={props.user.data} />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    guest: state.auth.authenticated.guest,
    user: state.auth.authenticated.user,
  }
}

export default connect(mapStateToProps)(HeaderContainer)