import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useParams } from "react-router-dom";
import { BoardListItem } from "types/interface";
import BoardItem from "components/BoardItem";
import { SEARCH_PATH } from "constant";
import { getRelationListRequest, getSearchBoardListRequest } from "apis";
import { GetSearchBoardListResponseDto } from "apis/response/board";
import ResponseDto from "apis/response/response.dto";
import { usePagination } from "hooks";
import Pagination from "components/Pagination";
import { GetRelationListResponseDto } from "apis/response/search";

//          component: 게시물 검색 컴포넌트             //
export default function Search() {
    //          state: searchWord path variable 상태         //
    const { searchWord } = useParams();
    //    state : 페이지네이션 상태   //
    const {
        currentPage,
        setCurrentPage,
        currentSection,
        setCurrentSection,
        viewList,
        viewPageList,
        totalSection,
        setTotalList,
    } = usePagination<BoardListItem>(5);
    //          state: 이전 검색어 상태         //
    const [preSearchWord, setPreSearchWord] = useState<string | null>(null);
    //          state: 검색 게시물 개수 상태         //
    const [count, setCount] = useState<number>(0);

    //          state: 연관 검색어 리스트 상태         //
    const [relationWordList, setRelationWordList] = useState<string[]>([]);

    //          function : navigate         //
    const navigate = useNavigate();

    //          function: get Search Board List Response 처리 함수      //
    const getSearchBoardListResponse = (
        responseBody: GetSearchBoardListResponseDto | ResponseDto | null
    ) => {
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === "DBE") alert("데이터베이스 오류가 발생했습니다.");
        if (code !== "SU") return;

        if (!searchWord) return;
        const { searchList } = responseBody as GetSearchBoardListResponseDto;
        setTotalList(searchList);
        setCount(searchList.length);
        setPreSearchWord(searchWord);
    };
    //          function: get Relation List Response 처리 함수      //
    const getRelationListResponse = (
        responseBody: GetRelationListResponseDto | ResponseDto | null
    ) => {
        console.log("관련 검색어 API 응답:", responseBody);
        if (!responseBody) return;
        const { code } = responseBody;
        if (code === "DBE") alert("데이터베이스 오류가 발생했습니다.");
        if (code !== "SU") return;

        const { relativeWordList } = responseBody as GetRelationListResponseDto;
        console.log("관련 검색어 리스트:", relativeWordList);
        setRelationWordList(relativeWordList);
    };

    //          event handler: 연관 검색어 클릭 핸들러         //
    const onRelationWordClickHandler = (word: string) => {
        navigate(SEARCH_PATH(word));
    };

    //          effect: searchWord가 변경되면 실행되는 함수        //
    useEffect(() => {
        if (!searchWord) return;
        console.log("검색어 변경됨:", searchWord);
        getSearchBoardListRequest(searchWord, preSearchWord).then(
            getSearchBoardListResponse
        );
        getRelationListRequest(searchWord).then(getRelationListResponse);
    }, [searchWord]);

    //          render: 게시물 검색 컴포넌트 렌더링          //
    if (!searchWord) return <></>;

    return (
        <div id="search-wrapper">
            <div className="search-container">
                <div className="search-title-box">
                    <div className="search-title">
                        <span className="search-title-emphasis">
                            {searchWord}
                        </span>
                        {"에 대한 검색 결과 입니다."}
                    </div>
                    <div className="search-count">{count}</div>
                </div>
                <div className="search-contents-box">
                    {count === 0 ? (
                        <div className="search-contents-nothing">
                            검색 결과가 없습니다.
                        </div>
                    ) : (
                        <div className="search-contents">
                            {viewList.map((boardListItem) => (
                                <BoardItem boardListItem={boardListItem} />
                            ))}
                        </div>
                    )}

                    <div className="search-relation-box">
                        <div className="search-relation-card">
                            <div className="search-relation-card-container">
                                <div className="search-relation-card-title">
                                    {"관련 검색어"}
                                </div>
                                {relationWordList.length === 0 ? (
                                    <div className="search-relation-card-contents-nothing">
                                        {"관련 검색어가 없습니다."}
                                    </div>
                                ) : (
                                    <div className="search-relation-card-contents">
                                        {relationWordList.map((word) => (
                                            <div
                                                className="word-badge"
                                                onClick={() =>
                                                    onRelationWordClickHandler(
                                                        word
                                                    )
                                                }
                                            >
                                                {word}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="search-pagination-box">
                    {count !== 0 && (
                        <Pagination
                            currentPage={currentPage}
                            currentSection={currentSection}
                            setCurrentPage={setCurrentPage}
                            setCurrentSection={setCurrentSection}
                            viewPageList={viewPageList}
                            totalSection={totalSection}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
