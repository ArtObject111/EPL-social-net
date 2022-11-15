import React from "react";
import {connect} from "react-redux";
import {
    setCurrentPage, setTotalUsersCount,
    setUsers, toggleIsFetching,
    followbro, unfollowbro
} from "../../redux/users-reducer";
import axios from "axios";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";

class UsersContainer extends React.Component {

    /*constructor(props) //эта запись в таком виде идёт по умолчанию
        super(props);
    }*/

    componentDidMount() {
        this.props.toggleIsFetching(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(responce => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(responce.data.items);
                this.props.setTotalUsersCount(responce.data.totalCount);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.toggleIsFetching(true);//p - номер страницы
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(responce => {
                this.props.toggleIsFetching(false);
                this.props.setUsers(responce.data.items)
            });
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                followbro={this.props.followbro}
                unfollowbro={this.props.unfollowbro}
                usersData={this.props.usersData}
            />
        </>
    }
} //"контейнерная" компонента, которая делает ajax запросы

let mapStateToProps = (state) => { //объекты, которая получает компонента UsersFuncComp
    return {
        usersData: state.usersPage.usersData,
        totalUsersCount: state.usersPage.totalUsersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
};

/*let mapDispatchToProps = (dispatch) => { //колбэки, которая получает компонента UsersFuncComp, которая она может вызвать
    return {
        followbro: (userID) => {
            dispatch(followActionCreator(userID));
        },
        unfollowbro: (userID) => {
            dispatch(unfollowActionCreator(userID));
        },
        setUsers: (users) => {
            dispatch(setUsersActionCreator(users));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageActionCreator(pageNumber));
        },
        setTotalUsersCount: (totalUsers) => {
            dispatch(setTotalUsersCountActionCreator(totalUsers))
        },
        toggleIsFetching: (isFetching) => {
            dispatch (toggleIsFetchingActionCreator(isFetching))
        }
    }
};// код диспатча до рефакторинга в коннекте*/

export default connect(mapStateToProps, {followbro, unfollowbro, setUsers, setCurrentPage, setTotalUsersCount,
    toggleIsFetching})(UsersContainer); //"контейнерная" 2 компонента, которая получается с помощью оборачивания connect
