import {
    ChangeEvent,
    Dispatch,
    KeyboardEvent,
    SetStateAction,
    forwardRef,
} from "react";
import "./style.css";
import { error } from "console";

//           interface: Input Box 컴포넌트 Properties              //
interface Props {
    label: string;
    type: "text" | "password";
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error: boolean;

    icon?:
        | "eye-light-off-icon"
        | "eye-light-on-icon"
        | "expand-right-light-icon"; // 필수가 아님
    onButtonClick?: () => void;

    message?: string;

    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

//          conponent: Input Box 컴포넌트           //
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
    //          state: properties           //
    const { label, type, placeholder, value, error, icon, message } = props;
    const { onChange, onButtonClick, onKeyDown } = props;

    //          event handler : input키 이벤트 처리 함수          //
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (!onKeyDown) return;
        onKeyDown(event);
    };

    //          render: Input Box 컴포넌트 렌더링           //
    return (
        <div className="inputbox">
            <div className="inputbox-label">{label}</div>
            <div
                className={
                    error ? "inputbox-container-error" : "inputbox-container"
                }
            >
                <input
                    ref={ref}
                    type={type}
                    className="input"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={onKeyDownHandler}
                />
                {onButtonClick !== undefined && (
                    <div className="icon-button" onClick={onButtonClick}>
                        {icon !== undefined && (
                            <div className={`icon ${icon}`}></div>
                        )}
                    </div>
                )}
            </div>
            {message !== undefined && (
                <div className="inputbox-message">
                    {"비밀번호는 8자 이상 입력해주세요."}
                </div>
            )}
        </div>
    );
});

export default InputBox;
