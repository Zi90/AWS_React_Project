import React from "react";
import '../component/project-style.css';
import Pagination from "react-js-pagination";
const Paging = ({ currentPage, itemCount, itemPerPage, onPageChange }) => {
    const totalPage = Math.ceil(itemCount / itemPerPage);
    return (
        <Pagination
            activePage={currentPage} // 현재 페이지
            itemsCountPerPage={itemPerPage} // 한 페이지랑 보여줄 아이템 갯수
            totalItemsCount={itemCount} // 총 아이템 갯수
            pageRangeDisplayed={5} // paginator의 페이지 범위
            prevPageText={"‹"} // "이전"을 나타낼 텍스트
            nextPageText={"›"} // "다음"을 나타낼 텍스트
            onChange={onPageChange} // 페이지 변경을 핸들링하는 함수
            itemClass="paging" // CSS 클래스를 추가
            activeClass="active" // 활성화된 페이지에 대한 클래스
            disabledClass="disabled" // 비활성화된 페이지에 대한 클래스
        />
    );
};
export default Paging;