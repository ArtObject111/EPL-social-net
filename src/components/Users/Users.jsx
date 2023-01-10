import React from "react";
import s from "./Users.module.css";
import userPhoto from "../../assets/images/user_image.png";
import {NavLink} from "react-router-dom";

let Users = (props) => {
    //округляем число страниц в большую сторону для ограничителя длины pageBar
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let setPageBar = () => {
        let pageBarElement = props.pageBar.map(pages => {
            return <span
                className={`${s.page} ${props.currentPage === pages && s.selectedPage}`}//скленивание двух классов
                onClick={(e) => {
                    props.onPageChanged(pages);
                }}>{pages}</span>
        })
        return <>
            <div className={s.pageNumberBar}>
                <button disabled={props.pageBar[0] <= 1} onClick={flipBack}>{"<"}</button>
                {pageBarElement}
                <button disabled={props.pageBar[props.pageBarLength] >= pagesCount}
                        onClick={flipNext}>{">"}</button>
            </div>
        </>
    }

    let flipNext = () => {
        let countClick = props.countFlip + 1;
        let pagesArray = [];
        for (let i = countClick; i <= props.pageBarLength + countClick && i <= pagesCount; i++) {
            pagesArray.push(i);
        }
        props.flipNext(pagesArray, countClick)
        props.onPageChanged(props.currentPage + 1)// связываем активную страницу с номером массива pageBar
    }
    let flipBack = () => {
        let countClick = props.countFlip - 1;
        let pagesArray = [];
        for (let i = countClick; i <= props.pageBarLength + countClick; i++) {
            pagesArray.push(i);
        }
        props.flipBack(pagesArray, countClick)
        props.onPageChanged(props.currentPage - 1)// связываем активную страницу с номером массива pageBar
    }
    return <div>
        {setPageBar()}
        {
            props.usersData.map(u => <div key={u.id}>
                    <span>
                        <div>
                            <NavLink to={"/profile/" + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} className={s.userPhoto}/>
                            </NavLink>
                        </div>
                        <div>
                            {u.followed
                                ? <button disabled={props.followingInProgress.some(id => id === u.id)}
                                          onClick={() => {
                                              props.unfollowbro(u.id);
                                              //код до followBroThunkContainer
                                              /*props.toggleFollowingInProgress(true, u.id)
                                              usersAPI.unfollowUser(u.id).then(data => {
                                                  if (data.resultCode === 0) {
                                                      props.unfollowbro(u.id)
                                                  };
                                                  props.toggleFollowingInProgress(false, u.id)
                                              });*/
                                          }}>Unollow</button>
                                : <button disabled={props.followingInProgress.some(id => id === u.id)}
                                          onClick={() => {
                                              props.followbro(u.id);
                                          }}>Follow</button>}
                        </div>
                    </span>
                <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.country"}</div>
                            <div>{"u.location.city"}</div>
                        </span>
                    </span>
            </div>)
        }
    </div>

}

export default Users;