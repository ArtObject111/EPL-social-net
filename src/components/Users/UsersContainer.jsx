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

class UsersContainer extends React.Component {

    /*constructor(props) //эта запись в таком виде идёт по умолчанию для классов
        super(props);
    }*/

    componentDidMount() {

        this.props.getUsers(this.props.currentPage, this.props.pageSize);// вызывает какой-то коллбэк,

        let pagesArray = [];
        for (let i = 1; i <= this.props.pageBarLength; i++) {
            pagesArray.push(i);
        }
        this.props.setPageBar(pagesArray)

        //this.props.getUsersThunkCreator();//вызвываем функцию, которая возвращает функцию, делающую ajax запрос и передающую данные в store

        /*this.props.toggleIsFetching(true); // код до getUsersThunkCreator
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => { //ajax запрос
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
            });*/
    }

    onPageChanged = (pageNumber) => {


        this.props.setCurrentPage(pageNumber, this.props.pageSize); //callback, который приходит из connect

        /*this.props.toggleIsFetching(true);//p - номер страницы
        this.props.setCurrentPage(pageNumber);
        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => { //data вместо responce, т.к мы передали в api.js только те данные, кот. нужны компоненте
                this.props.toggleIsFetching(false);
                this.props.setUsers(data.items)
            });*/
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
} //"контейнерная" компонента, которая делает ajax запросы

let mapStateToProps = (state) => { //объекты, которая получает компонента UsersFuncComp
    return {
        usersData: state.usersPage.usersData,
        totalUsersCount: state.usersPage.totalUsersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress,
        pageBarLength: state.usersPage.pageBarLength,
        pageBar: state.usersPage.pageBar,
        countNext: state.usersPage.countNext,
        countBack: state.usersPage.countBack,
        countFlip: state.usersPage.countFlip
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

/*let withRedirect = withAuthRedirect(UsersContainer)//защитили страницу Users от неавторизованного пользователя м помощью HOC(a)*/

/*export default connect(mapStateToProps, {// до compose()
    followBroThunkContainer, unfollowBroThunkContainer,
    toggleFollowingInProgress, setPageBar,
    getUsers: getUsersThunkCreator, setCurrentPage: setCurrentPageThunkCreator,
    setTotalUsersCount, flipNext, flipBack})(withRedirect); //2я "контейнерная" компонента, которая получается с помощью оборачивания connect*/

export default compose(connect(mapStateToProps, {
    followBroThunkContainer, unfollowBroThunkContainer,
    toggleFollowingInProgress, setPageBar,
    getUsers: getUsersThunkCreator, setCurrentPage: setCurrentPageThunkCreator,
    setTotalUsersCount, flipNext, flipBack})
)(UsersContainer)