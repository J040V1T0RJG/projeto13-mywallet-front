import styled from "styled-components";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import scrollIntoView from "scroll-into-view";

import UserContext from "./UserContext";

function Wallet () {
    let count = 0;
    const [countPrice, setCountPrice] = useState(0);
    const [dataWallet, setDataWallet] = useState([]);
    const { userToken } = useContext(UserContext);
    console.log("userToken: ", userToken)

    const config = {
        headers: {
            "Authorization": `Bearer ${userToken?.token}`,
            id: userToken.user.id
        }
    };
    
    useEffect(() => {
        const URL = "https://j040v1t0rprojeto13mywalletback.herokuapp.com/wallet";
        const promise = axios.get(URL,config);

        promise.then( response => {
            setDataWallet([...response.data].reverse())
        }).catch((err) => {
            console.log("err axios.post /new-entry: ", err)
            alert(`${err.data}`);
        });
    },[]);


    function BuildListRegisters (props) {
        let color;
        let { day, text, price, type} = props;
        price = parseFloat(price).toFixed(2)
        console.log("price",price)

        console.log("price: ", price)
        console.log("countPrice", countPrice)
        console.log("count", count)
        
        if (type === "input value") {
            color = "green"
            count += parseFloat(price)
        } else {
            color = "red"
            count -= parseFloat(price)
        };
        setCountPrice(count)

        return (
            <>
                <div className="listOfRegisters">
                    <p>{day}</p>
                    <p>{text}</p>
                    <p className={color}>R${price}</p>
                </div>
            </>
        )
    };

    


    function RenderRegister () {
        return (
            <>
                {dataWallet.map((list, index) => (
                   <BuildListRegisters key={index} day={list.time} text={list.description} price={list.value} type={list.type} />
                ))}
                {setCountPrice(countPrice + count)}
                { console.log("countPrice ultimate",countPrice)}
                    <div className="credit">
                        <p>SALDO</p>
                        <p>{countPrice.toFixed(2)}</p>
                    </div>
            </>
        )
    };

    return (
        <>
            <WalletStyles>
                <HeaderStyles>
                    <p>Olá, {userToken.user.userName}</p>
                    <ion-icon name="exit-outline"></ion-icon>
                </HeaderStyles>
                <RegisterStyles>
                    {(dataWallet.length === 0) ? <div className="noRegister" ><p>Não há registros de entrada ou saída</p></div> : <RenderRegister />}
                </RegisterStyles>
                <BoottomButtonsStyles>
                    <LinkStyles to={"/new-entry"}>
                        <div className="newEntry">
                            <ion-icon name="add-circle-outline"></ion-icon>
                            <p>Nova entrada</p>
                        </div>
                    </LinkStyles>
                    <LinkStyles to={"/new-exit"}>
                        <div className="newExit">
                            <ion-icon name="remove-circle-outline"></ion-icon>
                            <p>Nova saída</p>
                        </div>
                    </LinkStyles>
                </BoottomButtonsStyles>
            </WalletStyles>
        </>
    )
};

const WalletStyles = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`;

const HeaderStyles = styled.div`
    width: 330px;
    height: 25px;
    margin-top: 25px;
    margin-bottom: 25px;
    position: relative;
    display: flex;
    //justify-content: center;
    //align-items: center;

    p {
        height: 31px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
        position: absolute;
        left: 0px;
    }

    ion-icon {
        color: #FFFFFF;
        font-size: 26px;
        position: absolute;
        right: 0px;
    }
`;

const RegisterStyles = styled.div`
    width: 330px;
    height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
    position: relative;

    .noRegister {
        width: 330px;
        height: 446px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .noRegister > p {
        width: 180px;
        height: 46px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        color: #868686;
    }

    .listOfRegisters {
        width: 330px;
        margin-top: 22px;
        display: flex;
        align-items: center;
        position: relative;
    }

    .listOfRegisters > :nth-child(1) {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #C6C6C6;
        margin-left: 10px;
    }
    .listOfRegisters > :nth-child(2) {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        color: #000000;
        margin-left: 4px;
    }

    .listOfRegisters > .red {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-align: right;
        color: #C70000;
        position: absolute;
        right: 10px;
    }

    .listOfRegisters > .green {
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 19px;
        text-align: right;
        color: #03AC00;
        position: absolute;
        right: 10px;
    }

    .credit {
        display: flex;
        width: 330px;
        justify-content: space-between;
        position: absolute;
        bottom: 10px;
    }

    .credit :first-child {
        width: 57px;
        height: 20px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #000000;
        margin-left: 10px;
    }

    .credit :last-child {
        width: 63px;
        height: 20px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        text-align: right;
        color: #03AC00;
        margin-right: 10px;

    }
    

`;
const BoottomButtonsStyles = styled.div`
    width: 330px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;

    .newEntry {
        width: 155px;
        height: 114px;
        background-color: #A328D6;
        border-radius: 5px;
    }
    .newExit {
        width: 155px;
        height: 114px;
        background-color: #A328D6;
        border-radius: 5px;
    }

    p {
        width: 64px;
        height: 40px;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 700;
        font-size: 17px;
        line-height: 20px;
        color: #FFFFFF;
        margin-top: 32px;
        margin-left: 10px;
    }

    ion-icon {
        font-size: 22px;
        color: #FFFFFF;
        margin-top: 10px;
        margin-left: 10px;
    }

`;
const LinkStyles = styled(Link)`
    text-decoration: none;

`


export default Wallet;