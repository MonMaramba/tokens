import React, { useState } from 'react';
// importing from the definity module in a js file
// the bridge file is used to gain access to motoko functions
import { Principal } from '@dfinity/principal';
import { token } from '../../../declarations/token';

function Balance() {
  const [inputValue, setInputValue] = useState('');
  const [balanceResult, setBalanceResult] = useState('');
  const [symbol, setSymbol] = useState('');
  const [isHidden, setHidden] = useState(true);

  async function handleClick() {
    // console.log(inputValue);
    const principal = Principal.fromText(inputValue);
    const balance = await token.balanceOf(principal);
    const monSymbol = await token.getSymbol();
    setBalanceResult(balance.toLocaleString());
    setSymbol(monSymbol.toLocaleString());
    setHidden(false);
  }

  return (
    <div className='window white'>
      <label>Check account token balance:</label>
      <p>
        <input
          id='balance-principal-id'
          type='text'
          placeholder='Enter a Principal ID'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </p>
      <p className='trade-buttons'>
        <button id='btn-request-balance' onClick={handleClick}>
          Check Balance
        </button>
      </p>

      {isHidden ? null : (
        <p>
          This account has a balance of {balanceResult} {symbol}.
        </p>
      )}
    </div>
  );
}

export default Balance;
