import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase/client';
import type { SearchType, SearchFilters } from '../types';

export function useSearch(type: SearchType, query: string, filters: SearchFilters) {
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    async function performSearch() {
      try {
        setIsLoading(true);
        setError(null);

        let searchQuery = type === 'freelancers'
          ? supabase
              .from('freelancer_profiles')
              .select(`
                *,
                user:user_id (
                  id,
                  full_name,
                  avatar_url,
                  rating,
                  location
                ),
                portfolio_items (
                  title,
                  description,
                  technologies
                )
              `)
          : supabase
              .from('projects')
              .select(`
                *,
                client:client_id (
                  full_name,
                  avatar_url,
                  rating
                ),
                bids (count)
              `)
              .eq('status', 'open');

        // Apply text search
        if (query) {
          if (type === 'freelancers') {
            searchQuery = searchQuery.or(`
              user.full_name.ilike.%${query}%,
              skills.cs.{${query}},
              portfolio_items.title.ilike.%${query}%,
              portfolio_items.description.ilike.%${query}%
            `);
          } else {
            searchQuery = searchQuery.or(`
              title.ilike.%${query}%,
              description.ilike.%${query}%,
              required_skills.cs.{${query}}
            `);
          }
        }

        // Apply filters
        if (filters.skills?.length) {
          if (type === 'freelancers') {
            searchQuery = searchQuery.contains('skills', filters.skills);
          } else {
            searchQuery = searchQuery.contains('required_skills', filters.skills);
          }
        }

        if (type === 'freelancers') {
          if (filters.rating) {
            searchQuery = searchQuery.gte('user.rating', filters.rating);
          }
          if (filters.location) {
            searchQuery = searchQuery.eq('user.location', filters.location);
          }
          if (filters.hourlyRate?.min) {
            searchQuery = searchQuery.gte('hourly_rate', filters.hourlyRate.min);
          }
          if (filters.hourlyRate?.max) {
            searchQuery = searchQuery.lte('hourly_rate', filters.hourlyRate.max);
          }
        } else {
          if (filters.budget?.min) {
            searchQuery = searchQuery.gte('budget_min', filters.budget.min);
          }
          if (filters.budget?.max) {
            searchQuery = searchQuery.lte('budget_max', filters.budget.max);
          }
          if (filters.projectLength) {
            searchQuery = searchQuery.eq('duration', filters.projectLength);
          }
        }

        // Execute search
        const { data, error: searchError } = await searchQuery;

        if (searchError) throw searchError;
        if (mounted) {
          setResults(data || []);
        }
      } catch (err) {
        console.error('Search error:', err);
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Search failed'));
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    performSearch();

    return () => {
      mounted = false;
    };
  }, [type, query, filters]);

  return { results, isLoading, error };
}