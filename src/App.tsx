import React from "react";
import "./App.css";
import BoardItem from "components/BoardItem";
import { latestBoardListMock, top3boardListMock } from "mocks";
import Top3Item from "components/Top3Item";

function App() {
    return (
        <>
            {/* {latestBoardListMock.map((boardListItem) => (
                <BoardItem boardListItem={boardListItem} />
            ))} */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "24px",
                }}
            >
                {top3boardListMock.map((top3ListItem) => (
                    <Top3Item top3ListItem={top3ListItem} />
                ))}
            </div>
        </>
    );
}

export default App;
