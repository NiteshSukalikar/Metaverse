import abi from "./abi/abi.json" assert {type: "json"};

// SC: 0x9D63572CD587a633E9b765c0E4cCAC678e30966F

const blockchain = new Promise((res, rej) => {

    // If Metamask is not available
    if(typeof window.ethereum == "undefined"){
        rej("You should install Metamask to use it!");
    }

    // Web3 Instance 
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(abi, "0x9D63572CD587a633E9b765c0E4cCAC678e30966F");

    // Get my Metamask address
    web3.eth.requestAccounts().then((accounts) =>{
        console.log("-> My account is: ", accounts[0]);
    });

    // Get the current supply of NFT Tokens
    web3.eth.requestAccounts().then((accounts) =>{
        contract.methods.totalSupply().call({from: accounts[0]}).then((supply) =>{
            console.log("-> Current supply of NFT Tokens is: ", supply);
        });
    });

    // Get the Maximum supply of NFT Tokens
    web3.eth.requestAccounts().then((accounts) =>{
        contract.methods.maxSupply().call({from: accounts[0]}).then((maxsupply) =>{
            console.log("-> Maximum supply of NFT Tokens is: ", maxsupply);
        });
    });

    // Get your buildings made in the Metaverse
    web3.eth.requestAccounts().then((accounts) =>{
        contract.methods.getOwnerBuildings().call({from: accounts[0]}).then((buildings) =>{
            console.log("-> Your buildings: ", buildings);
        });
    });

    // Get all the buildings made in the Metaverse 
    web3.eth.requestAccounts().then((accounts) =>{
        contract.methods.totalSupply().call({from: accounts[0]}).then((supply) =>{
            contract.methods.getBuildings().call({from: accounts[0]}).then((data) => {
                res({supply: supply, building: data });
            });
        });
    });
});

export default blockchain;