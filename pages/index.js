import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [totalDeposits, setTotalDeposits] = useState(0);
  const [lastDepositTime, setLastDepositTime] = useState(0);
  const [isAccountVisible, setIsAccountVisible] = useState(false);
  const [depositAmount, setDepositAmount] = useState(1);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const handleDepositChange = (e) => {
    setDepositAmount(e.target.value);
  };

  const toggleAccountVisibility = () => {
    setIsAccountVisible(!isAccountVisible);
  };

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const balanceBigNumber = await atm.getBalance();
      setBalance(ethers.utils.formatEther(balanceBigNumber));
    }
  };

  const getTotalDeposits = async () => {
    if (atm) {
      const totalDepositsBigNumber = await atm.getTotalDeposits();
      setTotalDeposits(ethers.utils.formatEther(totalDepositsBigNumber));
    }
  };

  const getLastDepositTime = async () => {
    if (atm) {
      setLastDepositTime(await atm.getLastDepositTime());
    }
  };

  const deposit = async () => {
    if (atm && depositAmount > 0) {
      const amount = ethers.utils.parseEther(depositAmount.toString());
      try {
        let tx = await atm.deposit(amount);
        await tx.wait();
        getBalance();
        getTotalDeposits();
        getLastDepositTime();
      } catch (error) {
        console.error("Error depositing:", error);
      }
    } else {
      alert("Invalid deposit amount");
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return <button className="btn btn-primary" onClick={connectAccount}>Please connect your Metamask wallet</button>;
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div className="text-center">
        <p className="text-white text-lg mb-4">
          Account Number of the Contributor:{" "}
          {isAccountVisible ? account : "************"}{" "}
          <button className="btn btn-small" onClick={toggleAccountVisibility}>
            {isAccountVisible ? "Hide" : "Show"}
          </button>
        </p>
        <p className="text-white text-lg mb-4">Current Balance: {balance} ETH</p>
        <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl p-6 shadow-lg mb-4">
          <p className="text-xl font-semibold mb-2">Total Contributions: <span className="text-2xl">{totalDeposits} ETH</span></p>
        </div>
        <div className="mt-6">
          <input
            type="number"
            value={depositAmount}
            onChange={handleDepositChange}
            className="input input-bordered w-32"
            min="0"
            placeholder="Enter amount"
          />
          <button className="btn btn-secondary mr-4" onClick={deposit}>
            Deposit {depositAmount} ETH (Fee: 0.5% ETH)
          </button>
        </div>
        <div className="mt-4">
          <p className="text-white">Last Contribution Time: {new Date(lastDepositTime * 1000).toLocaleString()}</p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="w-screen h-screen flex flex-col items-center justify-between bg-gradient-to-r from-purple-800 to-indigo-700">
      <script src="https://cdn.tailwindcss.com"></script>
      <link
        href="https://cdn.jsdelivr.net/npm/daisyui@3.9.4/dist/full.css"
        rel="stylesheet"
        type="text/css"
      />
      <link href="https://fonts.cdnfonts.com/css/xg-pixo" rel="stylesheet" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
        rel="stylesheet"
      ></link>

      <header className="w-full py-16 text-center flex items-center justify-center">
        <h1 className="font-normal text-9xl text-white shadow-lg mr-4">
          ETH Contribution Manager
        </h1>
        <img
          src="https://i.gifer.com/Fw3P.gif"
          alt="Coin GIF"
        />
      </header>

      <div className="flex-grow">
        {initUser()}
      </div>

      <footer className="absolute bottom-4 text-white text-lg">
        <p className="mb-4">Powered by Ethereum Smart Contract</p>
      </footer>

      {/* Inline CSS for styling */}
      <style jsx>{`
        * {
          font-family: 'Poppins', sans-serif;
        }

        body {
          background-color: #1a202c;
        }

        h1 {
          font-family: 'XG pixo', sans-serif;
        }
      `}</style>
    </main>
  );
}
