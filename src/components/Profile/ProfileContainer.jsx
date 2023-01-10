import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatusThunkCreator, getUserProfileThunkCreator, updateStatusThunkCreator} from "../../redux/profile-reducer";
import {Navigate, useLocation, useNavigate, useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    /*constructor(props) //эта запись в таком виде идёт по умолчанию
        super(props);
    }*/

    componentDidMount() {


        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = 26748
        }

        this.props.getUserProfile(userId); //callback, который приходит из connect
        this.props.getUserStatus(userId);

    }

    render() {

        if (!this.props.isAuth) {
            alert("You are not authorized")
            return (<Navigate to={"/login"}/>)
        }

        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                         updateStatus={this.props.updateStatus}/>
            </div>
        )
    }
}

/*let AuthRedirectComponent = withAuthRedirect(ProfileContainer) //вызываем HOC с нужным параметром*/ //код до compose()

let mapStateToProps = (state) => { //функция, которая принимает state целиком, а возвращает только те данные, которые нужны dump компоненте
    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status
    }
};

//wrapper to use router's v6 hooks in class comp (to use HOC pattern like in router v5) // по документации
//другими словами прокидываем router = {params} в контейнерную компоненту
const withRouter = (ProfileContainer) => {
    return (props) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <ProfileContainer
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

export default compose(
    connect(mapStateToProps, {getUserProfile: getUserProfileThunkCreator,
        getUserStatus: getStatusThunkCreator, updateStatus: updateStatusThunkCreator}), // самый нижний слой контейнера
    withRouter, // средний слой контейнера
    withAuthRedirect)// самый внешний слой контейнера
(ProfileContainer);