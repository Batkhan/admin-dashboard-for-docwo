import * as React from "react";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "../../components/ui/Input";
import { useDebounce } from "../../hooks/useDebounce";
import { useDashboardStore } from "../../store/useDashboardStore";

export function UserSearch() {
  const { searchQuery, setSearchQuery } = useDashboardStore();
  
  // Local state for immediate typing feedback
  const [localSearch, setLocalSearch] = useState(searchQuery);
  
  // Debounce the local state
  const debouncedSearch = useDebounce(localSearch, 500);

  // Sync debounced search with global store
  useEffect(() => {
    // Only update if it actually changed to avoid infinite loops
    if (debouncedSearch !== searchQuery) {
      setSearchQuery(debouncedSearch);
    }
  }, [debouncedSearch, searchQuery, setSearchQuery]);

  // Sync back to local if global is cleared (e.g. going back to dashboard)
  useEffect(() => {
    setLocalSearch(searchQuery);
  }, [searchQuery]);

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <Input
        type="text"
        placeholder="Search users by name..."
        className="pl-10"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
      />
    </div>
  );
}
