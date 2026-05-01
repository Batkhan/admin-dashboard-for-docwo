import * as React from "react";
import { Link } from "react-router";
import type { User } from "../../types/user";
import { Skeleton } from "../../components/ui/Skeleton";
import { ErrorFallback } from "../../components/ui/ErrorFallback";

interface UserListProps {
  users: User[];
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
}

export function UserList({ users, isLoading, error, onRetry }: UserListProps) {
  if (error) {
    return <ErrorFallback message={error} onRetry={onRetry} />;
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-20 w-full" />
        ))}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg bg-surface text-text-secondary">
        No users found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-surface">
      <table className="w-full text-sm text-left text-text-primary">
        <thead className="text-xs uppercase bg-gray-50 border-b border-border">
          <tr>
            <th className="px-6 py-4 font-medium">User</th>
            <th className="px-6 py-4 font-medium">Email</th>
            <th className="px-6 py-4 font-medium">Role</th>
            <th className="px-6 py-4 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 flex items-center gap-3">
                <img
                  src={user.image}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="w-10 h-10 rounded-full bg-gray-200"
                  loading="lazy"
                />
                <div className="font-medium text-text-primary">
                  {user.firstName} {user.lastName}
                </div>
              </td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-blue-50 text-primary rounded text-xs font-medium capitalize">
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <Link
                  to={`/users/${user.id}`}
                  className="text-primary hover:text-primary-hover font-medium"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
