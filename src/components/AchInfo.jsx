import React from 'react';

function AchInfo({ achAccounts }) {
    return (
      <div>
        <h2>ACH Information</h2>
        {achAccounts && achAccounts.length > 0 ? (
          <ul>
            {achAccounts.map((account) => (
              <li key={account.account_id}>
                <p>Account: {account.account}</p>
                <p>Account ID: {account.account_id}</p>
                <p>Routing: {account.routing}</p>
                <p>Wire Routing: {account.wire_routing}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No ACH accounts available.</p>
        )}
      </div>
    );
  }
  
  export default AchInfo;
  
  