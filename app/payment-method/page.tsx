'use client';

import { useState } from 'react';
import BankLogin from '@/app/ui/bank-login';


const BANKS = [
  { name: 'Chase', logo: '/banks/Chase.png' },
  { name: 'Wells Fargo', logo: '/banks/Wells_Fargo.png' },
  { name: 'US Bank', logo: '/banks/us-bank.png' },
  { name: 'Capital One', logo: '/banks/Capital_One.png' },
  { name: 'Bank Of America', logo: '/banks/Boa.png' },
  { name: 'Santander', logo: '/banks/Satander.png' },
  { name: 'PNC', logo: '/banks/PNC.png' },
  { name: 'American Express', logo: '/banks/American_Express.png' },
  { name: 'Citi Bank', logo: '/banks/Citibank.png' },
  { name: 'Goldman Sachs', logo: '/banks/Goldman-Sachs.png' },
  { name: 'Fith Third Bank', logo: '/banks/Fifth-Third.png' },
  { name: 'TD Bank', logo: '/banks/TD_Bank.png' },
  { name: 'Ally Bank', logo: '/banks/Ally.png' },
   { name: 'Truist', logo: '/banks/Truist.png' },
  
];

export default function PaymentMethodPage() {
  const [search, setSearch] = useState('');
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  const filteredBanks = BANKS.filter((bank) =>
    bank.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {!selectedBank ? (
        <div className="max-w-md mx-auto">
          <h1 className="text-xl font-bold mb-4 text-center">Select your Institution</h1>
          <input
            type="text"
            placeholder="Search your institution"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          />
          <div className="grid grid-cols-2 gap-4">
            {filteredBanks.map((bank) => (
              <button
                key={bank.name}
                onClick={() => setSelectedBank(bank.name)}
                className="bg-white rounded shadow p-4 flex items-center justify-center hover:ring"
              >
                <img src={bank.logo} alt={bank.name} className="h-8" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <BankLogin bankName={selectedBank} />
        
      )}
    </div>
  );
}
