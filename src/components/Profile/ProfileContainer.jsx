import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getStatusThunkCreator,
    getUserProfileThunkCreator,
    updatePhotoThunkCreator,
    updateProfileThunkCreator,
    updateStatusThunkCreator
} from "../../redux/profile-reducer";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    refreshProfile = () => {
        let userId = this.props.router.params.userId;

        if (!userId) {
            userId = this.props.authorizedUserId
            if (!userId) {
                return
            }
        }

        this.props.getUserProfile(userId); // callbacks вызываются когда переходим в Мой профиль, будучи авторизованныи
        this.props.getUserStatus(userId);  // или в профиль другого пользователя, кроме случая
    }
    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.router.params.userId !== prevProps.router.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        let userId = this.props.router.params.userId;

        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) return <Navigate to={"/login"}/>
        }
        return (
            <div>
                <Profile {...this.props}
                         isOwner={!this.props.router.params.userId}
                         profile={this.props.profile}
                         status={this.props.status}
                         updateStatus={this.props.updateStatus}
                         updatePhoto={this.props.updatePhoto}
                         updateProfile={this.props.updateProfile}
                    />
            </div>
        )
    }
}

//wrapper to use router's v6 hooks in class comp (to use HOC pattern like in router v5) // по документации
//другими словами прокидываем router = {params} в контейнерную компоненту
const withRouter = (WrappedContainer) => {
    return (props) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();

        return (
            <WrappedContainer
                {...props}
                router={{location, navigate, params}}
            />
        );
    }
}
/*const TakeParams = (props) => { //комментатор
    return <ProfileContainer
        {...props}
        params={useParams()}
    />
}*/

/*let withRouter = (ProfileContainer) => { //комментатор
    return (props) => {
        const match = {params: useParams()};
        return <ProfileContainer {...props} match={match}/>
    }
}*/

//по Димычу
//let WithUrlDataContainerComponent = withRouter(ProfileContainer);

/*// код до compose()
export default connect(mapStateToProps, {getUserProfile: getUserProfileThunkCreator})
(/!*AuthRedirectComponent*!/withRouter(AuthRedirectComponent));//оборачиваем контейнерную компоненту ещё одной компонентой с помощью connect*/

let mapStateToProps = (state) => { //функция, которая принимает state целиком, а возвращает только те данные, которые нужны dump компоненте
    // console.log("mapStateToProps profile")
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        userPhoto: state.profilePage.userPhoto,
        authorizedUserId: state.authUserBro.data.id,
        isAuth: state.authUserBro.isAuth
    }
};

export default compose(
    connect(mapStateToProps, {
        getUserProfile: getUserProfileThunkCreator,
        getUserStatus: getStatusThunkCreator,
        updateStatus: updateStatusThunkCreator,
        updatePhoto: updatePhotoThunkCreator,
        updateProfile: updateProfileThunkCreator}), // самый нижний слой контейнера
    withRouter)// самый внешний слой контейнера
(ProfileContainer);