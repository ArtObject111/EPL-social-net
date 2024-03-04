import Header from "./Header";
import {connect} from "react-redux";
import {logoutTC} from "../../redux/auth-reducer";

let mapStateToProps = (state) => ({ //пропсы передаем в контейнерную компоненту
    isAuth: state.authUserBro.data.isAuth,
    login: state.authUserBro.data.login,
    authUserPhoto: state.authUserBro.authUserPhoto,
    id: state.authUserBro.data.id
})

export default connect(mapStateToProps, {
    logout: logoutTC
})(Header)