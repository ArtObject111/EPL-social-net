import React from "react";
import Profile from "./Profile";
import axios from "axios";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";

class ProfileContainer extends React.Component {

    /*constructor(props) //эта запись в таком виде идёт по умолчанию
        super(props);
    }*/

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
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

let mapStateToProps = (state) => { //функция, которая принимает state целиком, а возвразает только те данные, которые нужны dump компоненте
    return {
        profile: state.profilePage.profile
    }
};

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);//оборачиваем контейнерную компоненту ещё одной компонентой с помощью connect