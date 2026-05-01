import { useEffect } from "react";
import { useSearchParams } from "react-router";
import { UserSearch } from "../features/users/UserSearch";
import { UserList } from "../features/users/UserList";
import { Pagination } from "../features/users/Pagination";
import { useDashboardStore } from "../store/useDashboardStore";
import { useUsers } from "../hooks/useUsers";

const USERS_PER_PAGE = 10;

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, searchQuery, setPage, setSearchQuery } = useDashboardStore();

  // Initialize from URL on mount
  useEffect(() => {
    const urlPage = Number(searchParams.get("page")) || 1;
    const urlSearch = searchParams.get("search") || "";
    if (urlPage !== page) setPage(urlPage);
    if (urlSearch !== searchQuery) setSearchQuery(urlSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  // Sync store changes to URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (page > 1) params.set("page", page.toString());
    if (searchQuery) params.set("search", searchQuery);
    setSearchParams(params, { replace: true });
  }, [page, searchQuery, setSearchParams]);

  const { data, isLoading, error } = useUsers(page, USERS_PER_PAGE, searchQuery);

  const handleRetry = () => {
    setPage(page); // Simple trigger to cause a re-render if needed
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight">Users Dashboard</h1>
          <p className="text-sm text-text-secondary mt-1">Manage and view system users.</p>
        </div>
        <UserSearch />
      </div>

      <UserList 
        users={data?.users || []} 
        isLoading={isLoading} 
        error={error} 
        onRetry={handleRetry} 
      />

      {data && data.total > 0 && (
        <Pagination
          currentPage={page}
          totalItems={data.total}
          itemsPerPage={USERS_PER_PAGE}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
