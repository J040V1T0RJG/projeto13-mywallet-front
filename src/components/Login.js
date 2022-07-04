import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";

import UserContext from "./UserContext";

function Login () {
    const navigate = useNavigate();
    const [dataLogin, setDataLogin] = useState({email: "", password: ""});
    const { setUserToken } = useContext(UserContext);

    function sendLogin (e) {
        e.preventDefault();

        const URL = "https://j040v1t0rprojeto13mywalletback.herokuapp.com/login"
        const promise = axios.post(URL, dataLogin);
        promise.then(response => {
            console.log("response:", response);
            setUserToken(response.data);
            navigate("/wallet");
        });
        promise.catch(err => {
            console.log("err promise: ", err)
            alert(`${err.response.data}`);
        });
    };



    return (
        <>
            <LoginStyles>
                <img src="media/MyWallet.png" alt="logomarca" />
                <LoginFormStyle onSubmit={sendLogin}>
                    <input 
                        type="email" 
                        placeholder="E-mail"
                        value={dataLogin.email}
                        required
                        onChange={e => setDataLogin({...dataLogin, email: e.target.value})}
                    />
                    <input 
                        type="password" 
                        placeholder="Senha"
                        value={dataLogin.password}
                        required
                        onChange={e => setDataLogin({...dataLogin, password: e.target.value})}
                    />
                    <button type="submit"><p>Entrar</p></button>
                </LoginFormStyle>
                <LinkStyles to={"/sign-up"}>
                    <div className="dontHaveAccount"><p>Primeira vez? Cadastre-se!</p></div>
                </LinkStyles>
            </LoginStyles>
        </>
    )
};

const LoginStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 160px;

    img {
        width: 150px;
        margin-bottom: 24px;
    }
`;

const LoginFormStyle = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        width: 290px;
        height: 52px;
        background: #FFFFFF;
        border-radius: 8px;
        padding-left: 10px;
        margin-bottom: 10px;
    }

    input::placeholder {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        color: #7E7E7E;
    }

    button {
        width: 300px;
        height: 52px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 18px 122px;
        gap: 10px;
        background: #A75ED7;
        border-radius: 8px;
        border: none;
        margin-top: 14px;
        margin-bottom: 24px; 
        cursor: pointer;
    }

    button p {
        width: 54px;
        height: 16px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 16px;
        color: #FFFFFF;
    }
`;

const LinkStyles = styled(Link)`
     text-decoration: none;

    .dontHaveAccount p {
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 16px;
            text-decoration-line: none;
            color: #FFFFFF;
        }
`;

export default Login;