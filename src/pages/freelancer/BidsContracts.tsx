import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { BidsContractsHeader } from './components/bids/BidsContractsHeader';
import { BidsList } from './components/bids/BidsList';
import { ContractsList } from './components/bids/ContractsList';
import { useBids } from '../../hooks/useBids';
import { useContracts } from '../../hooks/useContracts';

export function BidsContractsPage() {
  const { bids, isLoadingBids, bidsError } = useBids();
  const { contracts, isLoadingContracts, contractsError } = useContracts();

  return (
    <Layout>
      <BidsContractsHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <BidsList 
            bids={bids}
            isLoading={isLoadingBids}
            error={bidsError}
          />
          <ContractsList 
            contracts={contracts}
            isLoading={isLoadingContracts}
            error={contractsError}
          />
        </div>
      </div>
    </Layout>
  );
}