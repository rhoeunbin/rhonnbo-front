import axios from "axios";
import { SignInRequestDto, SignUpRequestDto } from "./request/auth";
import { SignInResponseDto } from "./response/auth";
import ResponseDto from "./response/response.dto";

const DOMAIN = "http://localhost:4000";

const API_DOMAIN = `${DOMAIN}/api/v1`;

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

export const signInRequest = async (requestBody: SignInRequestDto) => {
    // async : 동기함수로 처리해서 작업 완료 후 기다리는 작업 하기 위해
    const result = await axios
        .post(SIGN_IN_URL(), requestBody) // (보낼 url, request 받을것)
        .then((response) => {
            const responseBody: SignInResponseDto = response.data;
            return responseBody;
        })
        .catch((error) => {
            if (!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        });
    return result;
};

export const signUpRequest = async (requestBody: SignUpRequestDto) => {};
