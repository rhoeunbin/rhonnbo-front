import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./style.css";
import { useBoardStore, useLoginUserStore } from "stores";
import { useNavigate } from "react-router-dom";
import { MAIN_PATH } from "constant";

//      component : 게시물 작성 화면 컴포넌트        //
export default function BoardCreate() {
    //      state : 제목 영역 요소 참조 상태        //
    const titleRef = useRef<HTMLTextAreaElement | null>(null);
    //      state : 본문 영역 요소 참조 상태        //
    const contentRef = useRef<HTMLTextAreaElement | null>(null);
    //      state : 이미지 입력 요소 참조 상태      //
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    //      state : 게시물 상태     //
    const { title, setTitle } = useBoardStore();
    const { content, setContent } = useBoardStore();
    const { boardImageFileList, setBoardImageFileList } = useBoardStore();
    const { resetBoard } = useBoardStore();

    //      state : 로그인 유저 상태        //
    const { loginUser } = useLoginUserStore();

    //      state : 게시물 이미지 미리보기 url 상태     //
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    //      function : 네비게이트 함수      //
    const navigator = useNavigate();

    //      event handler : 제목 변경 이벤트 처리       //
    const onTitleChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        setTitle(value);
        if (!titleRef.current) return;
        titleRef.current.style.height = "auto";
        titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    };
    //      event handler : 내용 변경 이벤트 처리       //
    const onContentChangeHandler = (
        event: ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { value } = event.target;
        setContent(value);
        if (!contentRef.current) return;
        contentRef.current.style.height = "auto";
        contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
    };
    //      event handler : 이미지 변경 이벤트 처리       //
    const onImageChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || !event.target.files.length) return;
        const file = event.target.files[0];

        // 미리보기용 url
        const imageUrl = URL.createObjectURL(file); // 임시 파일 url
        const newImageUrls = imageUrls.map((item) => item);
        newImageUrls.push(imageUrl);
        setImageUrls(newImageUrls);

        // 이미지 업로드
        const newBoardImageFileList = boardImageFileList.map((item) => item);
        newBoardImageFileList.push(file);
        setBoardImageFileList(newBoardImageFileList);

        if (!imageInputRef.current) return;
        imageInputRef.current.value = "";
    };

    //      event handler : 이미지 업로드 버튼 클릭 이벤트 처리     //
    const onImageUploadBtnClickHandler = () => {
        if (!imageInputRef.current) return;
        imageInputRef.current.click();
    };
    //      event handler : 이미지 닫기 버튼 클릭 이벤트 처리     //
    const onImageCloseBtnClickHandler = (deleteIndex: number) => {
        if (!imageInputRef.current) return;
        imageInputRef.current.value = "";

        const newImageUrls = imageUrls.filter(
            (url, index) => index !== deleteIndex
        );
        setImageUrls(newImageUrls);

        const newBoardImageFileList = boardImageFileList.filter(
            (file, index) => index !== deleteIndex
        );
        setBoardImageFileList(newBoardImageFileList);
    };

    //      effect : 마운트 실 실행할 함수      //
    useEffect(() => {
        if (!loginUser) {
            navigator(MAIN_PATH());
            return;
        }
        resetBoard();
    }, []);

    //      render: 게시물 작성 화면 컴포넌트 렌더링        //
    return (
        <div id="board-create-wrapper">
            <div className="board-create-container">
                <div className="board-create-box">
                    <div className="board-create-title-box">
                        <textarea
                            ref={titleRef}
                            className="board-create-title-textarea"
                            rows={1}
                            placeholder="제목을 작성해주세요."
                            value={title}
                            onChange={onTitleChangeHandler}
                        />
                    </div>
                    <div className="divider"></div>
                    <div className="board-create-content-box">
                        <textarea
                            ref={contentRef}
                            className="board-create-content-textarea"
                            placeholder="본문을 작성해주세요."
                            value={content}
                            onChange={onContentChangeHandler}
                        />
                        <div
                            className="icon-button"
                            onClick={onImageUploadBtnClickHandler}
                        >
                            <div className="icon image-box-light-icon"></div>
                        </div>
                        <input
                            ref={imageInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={onImageChangeHandler}
                        />
                    </div>
                    <div className="board-create-images-box">
                        {imageUrls.map((imageUrl, index) => (
                            <div className="board-create-image-box">
                                <img
                                    className="board-create-image"
                                    src={imageUrl}
                                />
                                <div
                                    className="icon-button image-close"
                                    onClick={() =>
                                        onImageCloseBtnClickHandler(index)
                                    }
                                >
                                    <div className="icon close-icon"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
