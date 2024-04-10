import Header from "./Header";
import {connect} from "react-redux";
import {logoutTC} from "../../redux/auth-reducer";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
    isAuth: boolean
    authUserName: string | null
    authUserPhoto: string | null
}

type MapDispatchPropsType = {
    logout: () => void
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => ({ //пропсы передаем в контейнерную компоненту
    isAuth: state.authUserBro.data.isAuth,
    authUserName: state.authUserBro.data.login,
    authUserPhoto: state.authUserBro.authUserPhoto
})

export default connect<MapStatePropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps, {
    logout: logoutTC
})(Header)