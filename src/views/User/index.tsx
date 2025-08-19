import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import "./style.css";
import defaultProfileImage from "assets/image/default-profile-image.png";
import { useNavigate, useParams } from "react-router-dom";
import { BoardListItem } from "types/interface";
import { latestBoardListMock } from "mocks";
import BoardItem from "components/BoardItem";
import { BOARD_CREATE_PATH, BOARD_PATH, USER_PATH } from "constant";
import { useLoginUserStore } from "stores";

//          component: 유저 컴포넌트             //
export default function UserPage() {
    //          state: email path variable 상태            //
    const { userEmail } = useParams();
    //          state: 로그인 유저 상태           //
    const { loginUser } = useLoginUserStore();
    //          state: 마이페이지 여부 상태           //
    const [isMyPage, setMyPage] = useState<boolean>(true);

    //          state: 네비게이션 상태           //
    const navigate = useNavigate();

    //          component: 유저 상단 컴포넌트             //
    const UserTop = () => {
        //          state: 이미지 업로드 참조 상태            //
        const imageInputRef = useRef<HTMLInputElement | null>(null);
        //          state: 닉네임 변경 여부 상태           //
        const [isChangeNickname, setIsChangeNickname] =
            useState<boolean>(false);
        //          state: 닉네임 상태           //
        const [nickname, setNickname] = useState<string>("");
        //          state: 닉네임 변경 상태           //
        const [changeNickname, setChangeNickname] = useState<string>("");
        //          state: 프로필 이미지 상태           //
        const [profileImage, setProfileImage] = useState<string>("");

        //         event  handler: 프로필 박스 클릭 이벤트 처리        //
        const onProfileBoxClickHandler = () => {
            if (!isMyPage) return;
            if (!imageInputRef.current) return;
            imageInputRef.current.click();
        };
        //         event  handler: 닉네임 수정 버튼 클릭 이벤트 처리        //
        const onNicknameEditButtonClickHandler = () => {
            setChangeNickname(nickname);
            setIsChangeNickname(!isChangeNickname);
        };
        //         event  handler: 이미지 변경 이벤트 처리        //
        const onProfileImageChangeHandler = (
            event: ChangeEvent<HTMLInputElement>
        ) => {
            if (!event.target.files || !event.target.files.length) return;
            const file = event.target.files[0];
            const data = new FormData();
            data.append("file", file);
        };
        //         event  handler: 닉네임 변경 이벤트 처리        //
        const onNicknameChangeHandler = (
            event: ChangeEvent<HTMLInputElement>
        ) => {
            const { value } = event.target;
            setChangeNickname(value);
        };

        //          effect: email path variable 변경 시 실행할 함수     //
        useEffect(() => {
            if (!userEmail) return;
            setNickname("논빈이");
            setProfileImage(
                "https://cdn.pixabay.com/photo/2018/05/13/16/57/dog-3397110_640.jpg"
            );
        }, [userEmail]);

        //          component: 유저 상단 컴포넌트             //
        return (
            <div id="user-top-wrapper">
                <div className="user-top-container">
                    {isMyPage ? (
                        <div
                            className="user-top-myprofile-img-box"
                            onClick={onProfileBoxClickHandler}
                        >
                            {profileImage !== null ? (
                                <div
                                    className="user-top-profile-img"
                                    style={{
                                        backgroundImage: `url(${profileImage})`,
                                    }}
                                ></div>
                            ) : (
                                <div className="icon-box-large">
                                    <div className="icon image-box-white-icon"></div>
                                </div>
                            )}
                            <input
                                ref={imageInputRef}
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={onProfileImageChangeHandler}
                            />
                        </div>
                    ) : (
                        <div
                            className="user-top-profile-img-box"
                            style={{
                                backgroundImage: `url(${
                                    profileImage
                                        ? profileImage
                                        : defaultProfileImage
                                })`,
                            }}
                        ></div>
                    )}

                    <div className="user-top-user-info-box">
                        <div className="user-top-info-nickname-box">
                            {isMyPage ? (
                                <>
                                    {isChangeNickname ? (
                                        <input
                                            className="user-top-info-nickname-input"
                                            type="text"
                                            size={changeNickname.length + 1}
                                            value={changeNickname}
                                            onChange={onNicknameChangeHandler}
                                        />
                                    ) : (
                                        <div className="user-top-user-info-nickname">
                                            {nickname}
                                        </div>
                                    )}
                                    <div
                                        className="icon-button"
                                        onClick={
                                            onNicknameEditButtonClickHandler
                                        }
                                    >
                                        <div className="icon edit-icon"></div>
                                    </div>
                                </>
                            ) : (
                                <div className="user-top-user-info-nickname">
                                    {nickname}
                                </div>
                            )}
                        </div>
                        <div className="user-top-user-info-email">
                            {"eun@gmail.com"}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    //          component: 유저 하단 컴포넌트             //
    const UserBottom = () => {
        //          state: 게시물 개수 상태           //
        const [count, setCount] = useState<number>(2);
        //          state: 게시물 리스트 상태(임시)           //
        const [userBoardList, setUserBoardList] = useState<BoardListItem[]>([]);

        //          effect: user email path variable 변경 시 실행할 함수     //
        useEffect(() => {
            if (!userEmail) return;
            setUserBoardList(latestBoardListMock);
        }, [userEmail]);

        //          event handler: side card 클릭 이벤트 처리        //
        const onSideCardClickHandler = () => {
            if (isMyPage) navigate(BOARD_PATH() + "/" + BOARD_CREATE_PATH);
            else if (loginUser) navigate(USER_PATH(loginUser.email));
        };

        //          component: 유저 하단 컴포넌트             //
        return (
            <div id="user-bottom-wrapper">
                <div className="user-bottom-container">
                    <div className="user-bottom-title">
                        {isMyPage ? "내 게시물 " : "게시물 "}
                        <span className="emphasis">{count}</span>
                    </div>
                    <div className="user-bottom-contents-box">
                        {count === 0 ? (
                            <div className="user-bottom-contents-nothing">
                                {"게시물이 없습니다."}
                            </div>
                        ) : (
                            <div className="user-bottom-contents">
                                {userBoardList.map((boardListItem) => (
                                    <BoardItem
                                        key={boardListItem.boardNumber}
                                        boardListItem={boardListItem}
                                    />
                                ))}
                            </div>
                        )}
                        <div className="user-bottom-side-box">
                            <div
                                className="user-bottom-side-card"
                                onClick={onSideCardClickHandler}
                            >
                                <div className="user-bottom-side-container">
                                    {isMyPage ? (
                                        <>
                                            <div className="icon-box">
                                                <div className="icon edit-icon"></div>
                                            </div>
                                            <div className="user-bottom-side-text">
                                                {"글쓰기"}
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="user-bottom-side-text">
                                                {"내 게시물로 가기"}
                                            </div>
                                            <div className="icon-box">
                                                <div className="icon arrow-right-icon"></div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="user-bottom-pagination-box"></div>
                </div>
            </div>
        );
    };

    //          render: 유저 화면 컴포넌트 렌더링          //
    return (
        <>
            <UserTop />
            <UserBottom />
        </>
    );
}
