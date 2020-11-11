import Button  from '@material-ui/core/Button'
import Login from "../../component/member/Login";
import React from 'react';
import { authLogin } from '../../state/auth';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import mockData from '../../common/mockData.json'
import { setTitle } from "../../util";

const users = mockData.users
const user1 = users.user1
const user2 = users.user2

function LoginContainer(props) {

    const onSubmit = (email, password) => {
        props.authLogin(email, password)
    }

    const user1Login = () => {
        onSubmit(user1.email, user1.password)
    }

    const user2Login = () => {
        onSubmit(user2.email, user2.password)
    }


    React.useEffect(() => setTitle('로그인하기'), [])

    return (
        <div>
            <Button onClick={user1Login}> user1 로그인 </Button>
            <Button onClick={user2Login}> user2 로그인 </Button>
            <Login {...props} onSubmit={onSubmit} />

        </div>
    )
}

// const fields = ['email', 'password'];

// TODO validate fields
// const validate = (values) => {
//     const {email, password} = values;
//     const errors = {};

//     if (!email) errors.email = 'Required';
//     else if (!validator.isEmail(email)) errors.email = 'Not valid email';

//     if (!password) errors.password = 'Required';

//     return errors;
// }

const mapStateToProps = (state) => {
    return {
        guest: state.auth.authenticated.guest
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ authLogin }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);

// let LoginForm = reduxForm({
//     form: 'Login',
//     fields,
//     validate
// })(LoginContainer);

// export default reduxAwait.connect(mapStateToProps, mapDispatchToProps)(LoginForm);