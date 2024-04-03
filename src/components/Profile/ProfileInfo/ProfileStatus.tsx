import React, { ChangeEvent } from "react";
import s from "./ProfileInfo.module.css"

type PropsType = {
    status: string
    updateStatus: (newStatus: string) => void
}

type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {

        !this.state.editMode &&
        this.setState({
            editMode: true
        })

        if (this.state.editMode) {
            this.setState({
                editMode: false
            })
            this.props.updateStatus(this.state.status)
        }
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
       if (prevProps.status !== this.props.status) {
           this.setState({
               status: this.props.status
           })
       }
        //console.log("didUpdate")
    }

    render() {
        return (
            <>
                <div className={s.statusLabel}>Status: </div>
                {!this.state.editMode &&
                    <div>
                        <span onClick={this.activateEditMode}>{this.props.status || "---"}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.activateEditMode}
                               value={this.state.status}/>
                    </div>
                }
            </>
        )
    }
}

export default ProfileStatus