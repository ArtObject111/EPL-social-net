import React from "react";
import {PageBar} from "./PageBar";
import {User} from "./User";

let Users = (props) => {
    return <div>
        <PageBar
            totalUsersCount={props.totalUsersCount}
            pageSize={props.pageSize}
            pageBarLength={props.pageBarLength}
            currentPage={props.currentPage}
            onPageChanged={props.onPageChanged}
            pageBar={props.pageBar}
            flipNext={props.flipNext}
            flipBack={props.flipBack}
            countNext={props.countNext}
            countBack={props.countBack}
            countFlip={props.countFlip}
        />
        {
            props.usersData.map(u => <User
                user={u}
                followingInProgress={props.followingInProgress}
                unfollowBro={props.unfollowBro}
                followBro={props.followBro}/>)
        }
    </div>
}

export default Users;