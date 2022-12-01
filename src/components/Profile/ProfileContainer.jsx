import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getUserProfileThunkCreator} from "../../redux/profile-reducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";

class ProfileContainer extends React.Component {

    /*constructor(props) //эта запись в таком виде идёт по умолчанию
        super(props);
    }*/

    componentDidMount() {


        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = 2
        }

        this.props.getUserProfile(userId); //callback, который приходит из connect

    }

    render() {
        return (
            <div>
                <Profile {...this.props} profile={this.props.profile}/>
            </div>
        )
    }
}

let mapStateToProps = (state) => { //функция, которая принимает state целиком, а возвращает только те данные, которые нужны dump компоненте
    return {
        profile: state.profilePage.profile
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

export default connect(mapStateToProps, {getUserProfile: getUserProfileThunkCreator})(withRouter(ProfileContainer));//оборачиваем контейнерную компоненту ещё одной компонентой с помощью connect