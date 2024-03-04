import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import {initializeAppTC} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import store from "./redux/redux-store";
import {withSuspense} from "./hoc/withSuspense";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));

class App extends Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render () {
        if (!this.props.isInitialized) {
            return <Preloader/>
        }
        
        return (
            <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className="app-wrapper-content">
                    <Routes>
                        <Route path="/" element={<Navigate to={"/profile"}/>}/>
                        <Route path="/profile/:userId" element={withSuspense(ProfileContainer)}/>
                        <Route path="/profile" element={
                            withSuspense(ProfileContainer)}/> {/*добавили этот тег из-за использования HOC pattern in router's v6*/}
                        <Route path="/dialogs" element={withSuspense(DialogsContainer)}/>
                        <Route path="/news" element={<News/>}/>
                        <Route path="/users" element={<UsersContainer/>}/>
                        <Route path="/music" element={<Music/>}/>
                        <Route path="/settings" element={<Settings/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="*" element={<div>404 NOT FOUND</div>}/>
                    </Routes>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isInitialized: state.app.isInitialized
})

let AppContainer = connect(mapStateToProps,{
    initializeApp: initializeAppTC
})(App);

export const MainApp = () => {
    return <HashRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </HashRouter>
}
