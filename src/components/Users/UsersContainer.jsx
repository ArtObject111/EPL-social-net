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
        this.props.getUsers(this.props.currentPage, this.props.pageSize);

        let pagesArray = [];
        for (let i = 1; i <= this.props.pageBarLength; i++) {
            pagesArray.push(i);
        }
        this.props.setPageBar(pagesArray)
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber, this.props.pageSize); //callback, который приходит из connect
    }

    render() {
        // console.log("render users")
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                pageBarLength={this.props.pageBarLength}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                followbro={this.props.followBroThunkContainer}
                unfollowbro={this.props.unfollowBroThunkContainer}
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

// let mapStateToProps = (state) => { //объекты, которая получает компонента UsersFuncComp
//     return {
//         usersData: state.usersPage.usersData,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         pageSize: state.usersPage.pageSize,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,
//         pageBarLength: state.usersPage.pageBarLength,
//         pageBar: state.usersPage.pageBar,
//         countNext: state.usersPage.countNext,
//         countBack: state.usersPage.countBack,
//         countFlip: state.usersPage.countFlip
//     }
// };

let mapStateToProps = (state) => { //объекты, которая получает компонента UsersFuncComp
    // console.log("mapStateToProps users")
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