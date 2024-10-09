import React from 'react';

function AccountInfo({ accounts }) {
  return (
    <div>
      <ul>
        {accounts.map(account => (
          <li key={account.account_id}>
            <p>Name: {account.name}</p>
            <p>Type: {account.type}</p>
            <p>Subtype: {account.subtype}</p>
            <p>Available Balance: {account.balances.available}</p>
            <p>Current Balance: {account.balances.current}</p>
            <p>Limit: {account.balances.limit}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AccountInfo;
