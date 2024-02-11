import React from "react";
import {connect} from "react-redux";
import {
    toggleFollowingInProgress,
    getUsersThunkCreator,
    followBroThunkContainer,
    unfollowBroThunkContainer,
    setCurrentPageThunkCreator,
    setPageBar,
    setTotalUsersCount,
    flipNext, flipBack
} from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCountBack, getCountFlip,
    getCountNext,
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching, getPageBar, getPageBarLength,
    getPageSize,
    getTotalUsersCount, getUsers
} from "../../redux/users-selectors";

class UsersContainer extends React.Component {

    componentDidMount() {
        let {currentPage, pageSize, pageBarLength, setPageBar} = this.props
        this.props.getUsers(currentPage, pageSize);

        let pagesArray = [];
        for (let i = 1; i <= pageBarLength; i++) {
            pagesArray.push(i);
        }
        setPageBar(pagesArray)
    }

    onPageChanged = (pageNumber) => {
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
                onPageChanged={this.onPageChanged}
                followBro={this.props.followBroThunkContainer}
                unfollowBro={this.props.unfollowBroThunkContainer}
                usersData={this.props.usersData}
                followingInProgress={this.props.followingInProgress}
                pageBar={this.props.pageBar}
                flipNext={this.props.flipNext}
                flipBack={this.props.flipBack}
                countNext={this.props.countNext}
                countBack={this.props.countBack}
                countFlip={this.props.countFlip}
            />
        </>
    }
}

let mapStateToProps = (state) => { //объекты, которая получает компонента UsersContainer
    return {
        usersData: getUsers(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        pageBarLength: getPageBarLength(state),
        pageBar: getPageBar(state),
        countNext: getCountNext(state),
        countBack: getCountBack(state),
        countFlip: getCountFlip(state)
    }
};

export default compose(connect(mapStateToProps, {
    followBroThunkContainer, unfollowBroThunkContainer,
    toggleFollowingInProgress, setPageBar,
    getUsers: getUsersThunkCreator, setCurrentPage: setCurrentPageThunkCreator,
    setTotalUsersCount, flipNext, flipBack})
)(UsersContainer)