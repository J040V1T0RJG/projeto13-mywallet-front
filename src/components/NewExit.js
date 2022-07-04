import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import UserContext from "./UserContext";

function NewExit () {
    const navigate = useNavigate();
    const { userToken } = useContext(UserContext);
    const [dataExit, setDataExit] = useState({value: "", description: "", type: "output value", id: userToken.user.id});

    function sendInputData (e) {
        e.preventDefault();

        const URL = "https://j040v1t0rprojeto13mywalletback.herokuapp.com/new-entryorexit";
        const requisicao = axios.post(URL, dataExit);
        requisicao.then((response) => {
            navigate("/wallet");
            console.log("response axios.post /new-entry", response)

        }).catch((err) => {
            console.log("err axios.post /new-entry: ", err)
            alert(`${err.data}`);
        });
    };



    return (
        <>
            <NewExitStyles>
                <div className="title"><p>Nova saída</p></div>
                <NewExitForm onSubmit={sendInputData}>
                    <input 
                        type="number"
                        placeholder="Valor"
                        value={dataExit.value}
                        required
                        onChange={e => setDataExit({...dataExit, value: e.target.value})}
                    />
                    <input 
                        type="text"
                        placeholder="Descrição"
                        value={dataExit.description}
                        required
                        onChange={e => setDataExit({...dataExit, description: e.target.value})}
                    />
                    <button ><p>Salvar saída</p></button>
                </NewExitForm>
                
            </NewExitStyles>
            
        </>
    )
};

const NewExitStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    .title {
        width: 330px;
        margin-top: 25px;
        margin-bottom: 40px;
    }
    .title p {
        width: 168px;
        height: 31px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
    }
`;

const NewExitForm = styled.form`
    width: 330px;
    display: flex;
    flex-direction: column;

    input {
        width: 320px;
        height: 58px;
        border-radius: 5px;
        padding-left: 10px;
        border: none;
        margin-bottom: 12px;
    }

    input::placeholder {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        color: #000000;
    }

    button {
        width: 330px;
        height: 46px;
        background: #A328D6;
        border-radius: 5px;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    button p {
        width: 140px;
        height: 23px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        color: #FFFFFF;
    }
`;

export default NewExit;