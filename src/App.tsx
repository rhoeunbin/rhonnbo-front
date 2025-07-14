import React, { useState } from "react";
import "./App.css";
import BoardItem from "components/BoardItem";
import { latestBoardListMock, top3boardListMock } from "mocks";
import Top3Item from "components/Top3Item";
import InputBox from "components/InputBox";

function App() {
    const [value, setValue] = useState<string>("");
    return (
        <>
            {/* {latestBoardListMock.map((boardListItem) => (
                <BoardItem boardListItem={boardListItem} />
            ))} */}
            {/* <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "24px",
                }}
            >
                {top3boardListMock.map((top3ListItem) => (
                    <Top3Item top3ListItem={top3ListItem} />
                ))}
            </div> */}
            <InputBox
                label="이메일"
                type="text"
                placeholder="이메일 주소를 입력해주세요"
                value={value}
                error={true}
                setValue={setValue}
                message="babo"
            />
        </>
    );
}

export default App;
