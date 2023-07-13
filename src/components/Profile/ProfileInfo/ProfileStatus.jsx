import React from "react";
import s from "./ProfileInfo.module.css"

class ProfileStatus extends React.Component {

    state = {
        editMode: false,
        status: this.props.status
    }

    activateEditMode = () => {

        !this.state.editMode &&
        this.setState({
            editMode: true
        })

        this.state.editMode && (
            this.setState({
                editMode: false
            })
        )
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps, prevState) {
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
                <span className={s.statusLabel}>Status: </span>
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