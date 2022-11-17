import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import axios from "axios";
import {setAuthUserData, setAuthUserDescription} from "../../redux/auth-reducer";


class HeaderContainer extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true //второй параметр нужен для привязки кукис
        })
            .then(responce => {
               if (responce.data.resultCode === 0) {
                   this.props.setAuthUserData(responce.data.data);
                   axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${this.props.auth.data.id}`)
                       .then(responce => {
                           this.props.setAuthUserDescription(responce.data.photos.small)
                       });
               }
            });
    }

    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.data.isAuth,
    login: state.auth.data.login,
    authUserPhoto: state.auth.authUserPhoto
})

export default connect(mapStateToProps, {setAuthUserData, setAuthUserDescription})(HeaderContainer)