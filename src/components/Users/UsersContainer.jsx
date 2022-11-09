import React from "react";
import {connect} from "react-redux";
import Users from "./Users";
import {followActionCreator, setUsersActionCreator, unfollowActionCreator} from "../../redux/users-reducer";

let mapStateToProps = (state) => { //объекты, которая получает компонента Users
    return {
        usersData: state.usersPage.usersData
    }
};

let mapDispatchToProps = (dispatch) => { //колбэки, которая получает компонента Users, которая она может вызвать
    return {
        followbro: (userID) => {
            dispatch(followActionCreator(userID));
        },
        unfollowbro: (userID) => {
            dispatch(unfollowActionCreator(userID));
        },
        setUsers: (users) => {
            dispatch(setUsersActionCreator(users));
        }
    }
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps) (Users);

export default UsersContainer;