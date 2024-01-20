import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {getAuthUserDataThunkCreator, logoutTC} from "../../redux/auth-reducer";


class HeaderContainer extends React.Component {
    componentDidMount() {
        this.props.getAuthUserData();

        /*usersAPI.authUser().then(data => { //код до санок (thunk)
               if (data.resultCode === 0) {
                   this.props.setAuthUserData(data.data)
                   usersAPI.authUserPhotoAx(data.data.id).then(avatar => { // айдишник берем из data, которую нам вернула setAuthUserData
                       this.props.setAuthUserAvatar(avatar);
                   })};
            });*/
    }
    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state) => ({ //пропсы передаем в контейнерную компоненту
    isAuth: state.authUserBro.data.isAuth,
    login: state.authUserBro.data.login,
    authUserPhoto: state.authUserBro.authUserPhoto,
    id: state.authUserBro.data.id
})

export default connect(mapStateToProps, {
    getAuthUserData: getAuthUserDataThunkCreator,
    logout: logoutTC
})(HeaderContainer)