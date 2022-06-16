import React, { useState } from 'react';
import { token, canisterId, createActor } from '../../../declarations/token';
import { AuthClient } from '@dfinity/auth-client';

function Faucet() {
  const [displayMessage, setMessage] = useState('Gimme, gimme');
  const [isDisabled, setDisable] = useState(false);

  async function handleClick(event) {
    setDisable(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const message = await authenticatedCanister.payOut();
    setMessage(message);
  }

  return (
    <div className='blue window'>
      <h2>
        <span role='img' aria-label='tap emoji'>
          🚰
        </span>
        Faucet
      </h2>
      <label>
        Get your free Mon Money tokens here! Claim 10,000 MERA tokens to your
        account.
      </label>
      <p className='trade-buttons'>
        <button id='btn-payout' onClick={handleClick} disabled={isDisabled}>
          {displayMessage}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
