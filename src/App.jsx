import './App.css';
import { useState } from 'react';
import samosaImg from './assets/samosaImg.png';

const App = () => {
  const [count, setCount] = useState(0);
  const [addend, setAddend] = useState(1);
  const [doubleStuffedPurchased, setDoubleStuffedPurchased] = useState(false);
  const [partyPackPurchased, setPartyPackPurchased] = useState(false);
  const [fullFeastPurchased, setFullFeastPurchased] = useState(false);
  const [bubbles, setBubbles] = useState([]);

  const updateCount = (e) => {
    setCount(count + addend);
    
    const bubble = {
      id: Date.now() + Math.random(),
      x: e.clientX - 30,
      y: e.clientY - 20,
      value: `+${addend}`
    };
    
    setBubbles(prev => [...prev, bubble]);
    
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== bubble.id));
    }, 40000);
  };

  const buyDoubleStuffed = () => {
    if (count >= 10 && !doubleStuffedPurchased) {
      setAddend(2);
      setCount(count - 10);
      setDoubleStuffedPurchased(true);
    }
  }

  const buyPartyPack = () => {
    if (count >= 100 && !partyPackPurchased) {
      setAddend(5);
      setCount(count - 100);
      setPartyPackPurchased(true);
    }
  }

  const buyFullFeast = () => {
    if (count >= 1000 && !fullFeastPurchased) {
      setAddend(10);
      setCount(count - 1000);
      setFullFeastPurchased(true);
    }
  }

  return (
     <div className="App">
    <div className='header'>
      <div className='title'>
        <h1>Samosa Selector</h1>
        <h2>Count: {count}</h2>
      </div>
      <div className='samosa-container'>
        <img className='samosa' src={samosaImg} onClick={updateCount}/>
        {bubbles.map(bubble => (
          <div
            key={bubble.id}
            className='bubble'
            style={{
              left: bubble.x,
              top: bubble.y,
            }}
          >
            {bubble.value}
          </div>
        ))}
      </div>
    </div>

    <div className='container'>
      <div className='upgrade'>
        <h3>Double Stuffed 👥</h3>
        <p>+2 per click</p>
        <button 
          onClick={buyDoubleStuffed} 
          disabled={doubleStuffedPurchased || count < 10}
        >
          {doubleStuffedPurchased ? 'Purchased' : '10 samosas'}
        </button>
      </div>
      
      <div className='upgrade'>
        <h3>Party Pack 🎉</h3>
        <p>+5 per click</p>
        <button 
          onClick={buyPartyPack} 
          disabled={partyPackPurchased || count < 100}
        >
          {partyPackPurchased ? 'Purchased' : '100 samosas'}
        </button>
      </div>
      
      <div className='upgrade'>
        <h3>Full Feast 👑</h3>
        <p>+10 per click</p>
        <button 
          onClick={buyFullFeast} 
          disabled={fullFeastPurchased || count < 1000}
        >
          {fullFeastPurchased ? 'Purchased' : '1000 samosas'}
        </button>
      </div>
    </div>
  </div>
  )
}

export default App