import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {setAuthUserAvatar, setAuthUserData} from "../../redux/auth-reducer";
import {usersAPI} from "../../api/api";


class HeaderContainer extends React.Component {
    componentDidMount() {
        usersAPI.authUser().then(data => {
               if (data.resultCode === 0) {
                   this.props.setAuthUserData(data.data)
                   usersAPI.authUserPhotoAx(data.data.id).then(avatar => { // айдишник берем из data, которую нам вернула setAuthUserData
                       this.props.setAuthUserAvatar(avatar);
                   })};
            });
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

export default connect(mapStateToProps, {setAuthUserData, setAuthUserAvatar})(HeaderContainer)