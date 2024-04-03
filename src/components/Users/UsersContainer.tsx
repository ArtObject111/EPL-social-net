import React from "react";
import {
    toggleFollowingInProgress,
    getUsersThunkCreator,
    followBroTC,
    unfollowBroTC,
    setCurrentPageThunkCreator,
    setPageBar,
    setTotalUsersCount,
    flipNext, flipBack
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCountFlip,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching, getPageBar, getPageBarLength,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/users-selectors";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";
import { connect, ConnectedProps } from "react-redux";

type MapStatePropsType = {
    isFetching: boolean 
    totalUsersCount: number
    pageSize: number
    pageBarLength: number
    currentPage: number
    countFlip: number
    pageBar: Array<number>
    usersData: Array<UserType>
    followingInProgress: Array<number> | []
}

type MapDispatchPropsType = {
    setPageBar: (pagesArray: Array<number>) => void
    getUsers: (currentPage: number, pageSize: number) => void
    setCurrentPage: (pageNumber: number, pageSize: number) => void
    flipNext: (pagesArray: Array<number>, countClick: number) => void,
    flipBack: (pagesArray: Array<number>, countClick: number) => void,
    unfollowBro: (userId: number) => void,
    followBro: (userId: number) => void
}

type OwnPropsType = {

}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        let {currentPage, pageSize, pageBarLength, setPageBar, getUsers} = this.props
        getUsers(currentPage, pageSize);

        let pagesArray = [];
        for (let i = 1; i <= pageBarLength; i++) {
            pagesArray.push(i);
        }
        setPageBar(pagesArray)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber, this.props.pageSize); //callback, который приходит из connect
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                pageBarLength={this.props.pageBarLength}
                currentPage={this.props.currentPage}
                usersData={this.props.usersData}
                followingInProgress={this.props.followingInProgress}
                pageBar={this.props.pageBar}
                countFlip={this.props.countFlip}
                onPageChanged={this.onPageChanged}
                followBro={this.props.followBro}
                unfollowBro={this.props.unfollowBro}
                flipNext={this.props.flipNext}
                flipBack={this.props.flipBack}
            />
        </>
    }
}

// type PropsFromRedux = ConnectedProps<typeof>

let mapStateToProps = (state: AppStateType): MapStatePropsType => { //объекты, которая получает компонента UsersContainer
    return {
        usersData: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        pageBarLength: getPageBarLength(state),
        pageBar: getPageBar(state),
        countFlip: getCountFlip(state)
    }
};

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    followBro: followBroTC, unfollowBro: unfollowBroTC,
    getUsers: getUsersThunkCreator, setCurrentPage: setCurrentPageThunkCreator,
    setPageBar, flipNext, flipBack})
)(UsersContainer)