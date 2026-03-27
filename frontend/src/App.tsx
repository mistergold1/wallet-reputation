import { useState } from "react";
import { ethers } from "ethers";

const CONTRACT = "PASTE_ADDRESS";
const ABI = [
  "function addActivity(uint256)",
  "function getScore(address) view returns (uint256)"
];

export default function App() {
  const [account, setAccount] = useState("");
  const [score, setScore] = useState(0);

  async function connect() {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const addr = await signer.getAddress();
    setAccount(addr);

    const c = new ethers.Contract(CONTRACT, ABI, provider);
    const s = await c.getScore(addr);
    setScore(Number(s));
  }

  async function addActivity() {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const c = new ethers.Contract(CONTRACT, ABI, signer);

    await c.addActivity(10);
    setScore(score + 10);
  }

  return (
    <div style={{ padding: 20 }}>
      {!account ? (
        <button onClick={connect}>Connect Wallet</button>
      ) : (
        <>
          <h2>Wallet Reputation</h2>
          <p>{account.slice(0,6)}...{account.slice(-4)}</p>
          <p>Score: {score} ⭐</p>

          <button onClick={addActivity}>
            Add activity (+10)
          </button>
        </>
      )}
    </div>
  );
}
