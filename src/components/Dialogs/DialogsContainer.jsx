import React from "react";
import {sendMessageActionCreator, updateNewMessageTextActionCreator} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

/*const DialogsContainer = () => {

    return <StoreContext.Consumer>
            {
                store => {
                    let state = store.getState().dialogsPage;

                    let onSendMessage = () => {
                        store.dispatch(sendMessageActionCreator());
                    }

                    let onMessageChange = (messageText) => {
                        let action = updateNewMessageTextActionCreator(messageText);
                        store.dispatch(action);
                    }
                    return <Dialogs
                        dialogsPage={state}
                        sendMessage={onSendMessage}
                        updateNewMessageText={onMessageChange}/>
                }
            }
        </StoreContext.Consumer>
}*/ //код до connect(a)

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageActionCreator());
        },
        updateNewMessageText: (messageText) => {
            let action = updateNewMessageTextActionCreator(messageText);
            dispatch(action);
        }
    }
}

/*let AuthRedirectComponent = withAuthRedirect(Dialogs); //код до compose()

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);*/

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect)(Dialogs);