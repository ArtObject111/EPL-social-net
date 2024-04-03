import React from "react";
import {PageBar} from "./PageBar";
import {User} from "./User";
import { UserType } from "../../types/types";

type PropsType = {
    totalUsersCount: number
    pageSize: number
    pageBarLength: number
    currentPage: number
    countFlip: number
    pageBar: Array<number>
    usersData: Array<UserType>
    followingInProgress: Array<number> | [],

    flipNext: (pagesArray: Array<number>, countClick: number) => void,
    flipBack: (pagesArray: Array<number>, countClick: number) => void,
    onPageChanged: (currentPage: number) => void

    unfollowBro: (userId: number) => void,
    followBro: (userId: number) => void
}

let Users: React.FC<PropsType> = ({
    totalUsersCount,
    pageSize,
    pageBarLength,
    currentPage,
    pageBar,
    countFlip,
    usersData,
    followingInProgress,

    onPageChanged,
    flipNext,
    flipBack,

    unfollowBro,
    followBro
}) => {
    return <div>
        <PageBar
            totalUsersCount={totalUsersCount}
            pageSize={pageSize}
            pageBarLength={pageBarLength}
            currentPage={currentPage}
            pageBar={pageBar}
            countFlip={countFlip}

            onPageChanged={onPageChanged}
            flipNext={flipNext}
            flipBack={flipBack}
        />
        {
            usersData.map(u => <User
                user={u}
                followingInProgress={followingInProgress}
                unfollowBro={unfollowBro}
                followBro={followBro}/>)
        }
    </div>
}

export default Users;