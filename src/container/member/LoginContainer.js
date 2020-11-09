// import {bindActionCreator, bindActionCreators} from 'redux';
// import {reduxAwait, setTitle} from '../../../utils/index';

// import Login from '../../../components/pages/member/Login';

import React from 'react';

// import {authLogin} from '../../actions/AuthAction';
// import {reduxForm} from 'redux-form';
// import validator from 'validator';

export default function LoginContainer() {
    return (
        <div>
            LoginContainer
        </div>
    )
}



// class LoginContainer extends React.Component {
//     onSubmit(...args) {
//         this.props.authLogin(...args);
//     }
//     componentDidMount(){
//         setTitle('Login');
//     }
//     render() {
//         return (
//             <Login {...this.props} onSubmit={this.onSubmit.bind(this)}/>
//         )
//     }
// }

// const fields = ['email', 'password'];

// const validate = (values) => {
//     const {email, password} = values;
//     const errors = {};

//     if (!email) errors.email = 'Required';
//     else if (!validator.isEmail(email)) errors.email = 'Not valid email';

//     if (!password) errors.password = 'Required';

//     return errors;
// }

// const mapStateToProps = (state)=> {
//     return {
//         guest: state.auth.authenticated.guest
//     }
// }

// const mapDispatchToProps = (dispatch)=> {
//     return bindActionCreators({authLogin}, dispatch)
// }

// let LoginForm = reduxForm({
//     form: 'Login',
//     fields,
//     validate
// })(LoginContainer);

// export default reduxAwait.connect(mapStateToProps, mapDispatchToProps)(LoginForm);