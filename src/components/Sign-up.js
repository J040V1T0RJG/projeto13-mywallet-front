import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


function SignUp () {
    console.log("entrou na função singup")
    const navigate = useNavigate();
    const [dataSignUp, setDataSignUp] = useState({
                                                    name: "",
                                                    email: "",
                                                    password: "",
                                                    confirmPassword: ""
                                            });

    function sendSignUp (e) {
        e.preventDefault();
        console.log("entrou na função sendsingup")

        const URL = "https://j040v1t0rprojeto13mywalletback.herokuapp.com/sign-up";
        const promise = axios.post(URL, dataSignUp)
        promise.then(response => {
            alert(`${response.data}`)
            navigate("/");
        });
        promise.catch(err => {
            setDataSignUp({                                                    
                            name: "",
                            email: "",
                            password: "",
                            confirmPassword: ""
                        });
            alert(`${err.response.data}`)
        });
    };

    return (
        <>
            <SignUpStyles>
                <img src="media/MyWallet.png" alt="logomarca" />  
                <SignUpFormStyles onSubmit={sendSignUp}>
                    <input 
                        type="text"
                        placeholder="Nome"
                        value={dataSignUp.name}
                        required
                        onChange={e => setDataSignUp({...dataSignUp, name: e.target.value})}
                    />
                    <input 
                        type="email"
                        placeholder="E-mail"
                        value={dataSignUp.email}
                        required
                        onChange={e => setDataSignUp({...dataSignUp, email: e.target.value})}
                    />
                    <input 
                        type="password"
                        placeholder="Senha"
                        value={dataSignUp.password}
                        required
                        onChange={e => setDataSignUp({...dataSignUp, password: e.target.value})}
                    />

                    <input 
                        type="password"
                        placeholder="Confirme a senha"
                        value={dataSignUp.confirmPassword}
                        required
                        onChange={e => setDataSignUp({...dataSignUp, confirmPassword: e.target.value})}
                    />
                    <button type="submit"><p>Cadastrar</p></button>
                </SignUpFormStyles>
                <LinkStyles to={"/"}> 
                    <div className="haveAccount"><p>Já tem uma conta? Entre agora!</p></div>
                </LinkStyles>
            </SignUpStyles>


        </>
    )
}

const SignUpStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 100px;

    img {
        width: 150px;
        margin-bottom: 28px;
    }
`;

const SignUpFormStyles = styled.form`
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

    .haveAccount p {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
        text-decoration-line: none;
        color: #FFFFFF;
    }
`;
















export default SignUp;