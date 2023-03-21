import React, {useState} from 'react'; // nạp thư viện react
import ReactDOM from 'react-dom/client'; // nạp thư viện react-dom
import * as Web3 from "web3";

// Tạo component App

const contractAddress = "0x2f6A6652699f26DBD6B778F45e7167E689465A91";
const ABI = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"returnValue","type":"uint256"}],"name":"PetadoptHandlered","type":"event"},{"inputs":[{"internalType":"uint256","name":"petId","type":"uint256"}],"name":"adoptHandler","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"adoptHandlerers","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getadoptHandlerersHandler","outputs":[{"internalType":"address[16]","name":"","type":"address[16]"}],"stateMutability":"view","type":"function"}];


function App() {
    const [address, setAddress] = useState("");
    const [contract, setContract] = useState(null);
    const [web3, setWeb3] = useState(null);

    function connectContract(){
        setContract(new web3.eth.Contract(ABI, contractAddress), {
            from: address[0]
        });
    }

    async function connectHandler(){
        if (window.ethereum){
            setWeb3(new Web3(window.ethereum));
            window.ethereum.request({method:'eth_requestAccounts'})
            .then(res=>{
                connectContract();
                setAddress(res);
            })
        }
        else{
            alert("PLEASE INSTALL METAMASK");
        }
    }

    async function getadoptHandlerersHandler(){
        const res = await contract.methods.getadoptHandlerers().call();
        console.log(res);
    }

    async function adoptHandler(){
        const res = await contract.methods.adopt(0).send({
            from: address[0]
        })
        console.log(res);
    }


    return (
        <div>
            <p>Wallet address: 
                {address !== "" ? 
                    (<span id="wallet-address">{address}</span>) : 
                    (<button onClick={connectHandler}>Connect</button>)}
            </p>

            <button onClick={ getadoptHandlerersHandler }>Get adopters</button>
            <button onClick={ adoptHandler }>Adopt number 2</button>

        </div>
    )
}

// Render component App vào #root element
// ReactDOM.render(<App />, document.getElementById('root'))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

