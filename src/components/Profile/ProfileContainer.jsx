import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";

class ProfileContainer extends React.Component {

    /*constructor(props) //эта запись в таком виде идёт по умолчанию
        super(props);
    }*/

    componentDidMount() {
        let userId = this.props.router.params.userId;
        if (!userId) {
            userId = 2
        };
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(responce => {
                this.props.setUserProfile(responce.data);
            });
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
const withRouter = (ProfileContainer) => {
    return (props) => {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <ProfileContainer
                {...props}
                router={{ location, navigate, params }}
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

export default connect(mapStateToProps, {setUserProfile})(withRouter(ProfileContainer));//оборачиваем контейнерную компоненту ещё одной компонентой с помощью connect