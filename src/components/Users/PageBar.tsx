import React from "react";
import s from "./PageBar.module.css"

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    countFlip: number,
    currentPage:  number,
    pageBarLength: number,
    pageBar: Array<number>,

    flipNext: (pagesArray: Array<number>, countClick: number) => void,
    flipBack: (pagesArray: Array<number>, countClick: number) => void,
    onPageChanged: (currentPage: number) => void
}

export const PageBar: React.FC<PropsType> = ({
    totalUsersCount,
    pageSize,
    countFlip,
    currentPage,
    pageBarLength,
    pageBar,
    
    flipNext,
    flipBack,
    onPageChanged
}) => {

    //округляем число страниц в большую сторону для ограничителя длины pageBar
    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let onFlipNext = () => {
        let countClick = countFlip + 1;
        let pagesArray = [];
        for (let i = countClick; i <= pageBarLength + countClick && i <= pagesCount; i++) {
            pagesArray.push(i);
        }
        flipNext(pagesArray, countClick)
        onPageChanged(currentPage + 1)// связываем активную страницу с номером массива pageBar
    }
    let onFlipBack = () => {
        let countClick = countFlip - 1;
        let pagesArray = [];
        for (let i = countClick; i <= pageBarLength + countClick; i++) {
            pagesArray.push(i);
        }
        flipBack(pagesArray, countClick)
        onPageChanged(currentPage - 1)// связываем активную страницу с номером массива pageBar
    }

    let pageBarElement = pageBar.map(pages => {
        return <span
            className={`${s.page} ${currentPage === pages && s.selectedPage}`}//скленивание двух классов
            onClick={(e) => {
                onPageChanged(pages);
            }}>{pages}</span>
    })

    return (
            <div className={s.pageNumberBar}>
                <button disabled={pageBar[0] <= 1} onClick={onFlipBack}>{"<"}</button>
                {pageBarElement}
                <button disabled={pageBar[pageBarLength] >= pagesCount}
                        onClick={onFlipNext}>{">"}</button>
            </div>
        )
}