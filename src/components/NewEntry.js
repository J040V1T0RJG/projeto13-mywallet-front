import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import UserContext from "./UserContext";

function NewEntry () {
    const navigate = useNavigate();
    const { userToken } = useContext(UserContext);
    const [dataEntry, setDataEntry] = useState({value: "", description: "", type: "input value", id: userToken.user.id})

    function sendInputData (e) {
        e.preventDefault();

        const URL = "https://j040v1t0rprojeto13mywalletback.herokuapp.com/new-entryorexit";
        const requisicao = axios.post(URL, dataEntry);
        requisicao.then((response) => {
            navigate("/wallet");
            console.log("response axios.post /new-exit", response)

        }).catch((err) => {
            console.log("err axios.post /new-exit: ", err)
            alert(`${err.data}`);
        });
    };



    return (
        <>
            <NewEntryStyles>
                <div className="title"><p>Nova entrada</p></div>
                <NewEntryForm onSubmit={sendInputData}>
                    <input 
                        type="number"
                        placeholder="Valor"
                        value={dataEntry.value}
                        required
                        onChange={e => setDataEntry({...dataEntry, value: e.target.value})}
                    />
                    <input 
                        type="text"
                        placeholder="Descrição"
                        value={dataEntry.description}
                        required
                        onChange={e => setDataEntry({...dataEntry, description: e.target.value})}
                    />
                    <button ><p>Salvar entrada</p></button>
                </NewEntryForm>
                
            </NewEntryStyles>
            
        </>
    )
};

const NewEntryStyles = styled.div`
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

const NewEntryForm = styled.form`
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

export default NewEntry;