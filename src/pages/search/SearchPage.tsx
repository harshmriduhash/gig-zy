import React, { useState } from 'react';
import { Layout } from '../../components/layout/Layout';
import { SearchHeader } from './components/SearchHeader';
import { SearchResults } from './components/SearchResults';
import { useSearch } from '../../hooks/useSearch';
import type { SearchType } from './types';

export function SearchPage() {
  const [searchType, setSearchType] = useState<SearchType>('freelancers');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  
  const { results, isLoading, error } = useSearch(searchType, searchQuery, filters);

  return (
    <Layout>
      <SearchHeader 
        searchType={searchType}
        onSearchTypeChange={setSearchType}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />
      <SearchResults 
        type={searchType}
        results={results}
        isLoading={isLoading}
        error={error}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </Layout>
  );
}