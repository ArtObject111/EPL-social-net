import React from "react";
import s from "./PageBar.module.css"

export const PageBar = (props) => {

    //округляем число страниц в большую сторону для ограничителя длины pageBar
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let flipNext = () => {
        let countClick = props.countFlip + 1;
        let pagesArray = [];
        for (let i = countClick; i <= props.pageBarLength + countClick && i <= pagesCount; i++) {
            pagesArray.push(i);
        }
        debugger
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

    let pageBarElement = props.pageBar.map(pages => {
        return <span
            className={`${s.page} ${props.currentPage === pages && s.selectedPage}`}//скленивание двух классов
            onClick={(e) => {
                props.onPageChanged(pages);
            }}>{pages}</span>
    })

    return (
        <div className={s.pageNumberBar}>
            <button disabled={props.pageBar[0] <= 1} onClick={flipBack}>{"<"}</button>
            {pageBarElement}
            <button disabled={props.pageBar[props.pageBarLength] >= pagesCount}
                    onClick={flipNext}>{">"}</button>
        </div>)
}