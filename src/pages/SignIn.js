import React from "react";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
const SignIn = () => {
    const [emailErrors, setEmailErrors] = useState(true);
    const [passwordErrors, setPasswordErrors] = useState(true);
    const [sendData, setSendData] = useState({
        email: "",
        password: "",
    });

    const nav = useNavigate();

    const onchange = (e) => {
        setSendData({
            ...sendData,
            [e.target.name]: e.target.value,
        });
    };

    const checkEmail = (e) => {
        var regExp =
            /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/;
        setEmailErrors(!regExp.test(e.target.value));
    };

    const checkPassword = (e) => {
        var regExp2 =
            /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[0-9])(?=.*[a-zA-Z]).{8,}$/;
        setPasswordErrors(!regExp2.test(e.target.value));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/signin",
                sendData
            );

            if (response.data.status === 200) {
                nav("/main", {
                    state: { userEmail: sendData.email },
                });
            } else if (response.data.status === 401) {
                //올바르게 입력하라는 모달창 띄우기
            }
        } catch (error) {
            //로그인 중에 오류가 났다고 모달창 띄우기
        }
    };

    const HorizonLine = ({ text }) => {
        return (
            <div
                style={{
                    width: "100%",
                    textAlign: "center",
                    borderBottom: "1px solid #aaa",
                    lineHeight: "0.1em",
                    margin: "10px 0 20px",
                    color: "gray",
                    fontSize: "10px",
                }}
            >
                <span style={{ background: "#fff", padding: "0 10px" }}>
                    {text}
                </span>
            </div>
        );
    };

    return (
        <div className="SignIn">
            <div className="whole">
                <div className="head">
                    <h2>📝 오픈한끼 로그인</h2>
                    <h5>오픈한끼로 친구를 만드세요</h5>
                </div>
                <HorizonLine text="Let have a meal together some day." />
                <form onSubmit={handleSubmit}>
                    <div className="email_textfield">
                        <TextField
                            value={sendData.email}
                            label="이메일"
                            required
                            name="email"
                            autoComplete="email"
                            autoFocus
                            margin="normal"
                            color="secondary"
                            fullWidth
                            error={emailErrors && sendData.email !== ""}
                            onChange={(e) => {
                                onchange(e);
                                checkEmail(e);
                            }}
                            helperText={
                                emailErrors && sendData.email !== ""
                                    ? "이메일 형식을 지켜주세요"
                                    : null
                            }
                        />
                    </div>
                    <div className="password_textfield">
                        <TextField
                            value={sendData.password}
                            label="비밀번호"
                            type="password"
                            required
                            name="password"
                            autoComplete="current-password"
                            margin="normal"
                            color="secondary"
                            fullWidth
                            error={passwordErrors && sendData.password !== ""}
                            onChange={(e) => {
                                onchange(e);
                                checkPassword(e);
                            }}
                            helperText={
                                passwordErrors && sendData.password !== ""
                                    ? "비밀번호 형식을 지켜주세요"
                                    : null
                            }
                        />
                    </div>
                    <Button
                        className="submit_button"
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        login
                    </Button>
                </form>
                <Grid className="signup_link">
                    아이디가 없으신가요? <Link to="/SignUp">Sign up</Link>
                </Grid>
            </div>
        </div>
    );
};

export default SignIn;
