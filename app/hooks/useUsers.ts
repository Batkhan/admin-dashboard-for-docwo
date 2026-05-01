import { useState, useEffect } from "react";
import { getUsers, getUserById } from "../services/api";
import type { User, UsersResponse } from "../types/user";

export function useUsers(page: number, limit: number, search: string) {
  const [data, setData] = useState<UsersResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError(null);

    const skip = (page - 1) * limit;

    getUsers(limit, skip, search)
      .then((response) => {
        if (isMounted) {
          setData(response);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "An unknown error occurred");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [page, limit, search]);

  return { data, isLoading, error };
}

export function useUser(id: string | null) {
  const [data, setData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    getUserById(id)
      .then((response) => {
        if (isMounted) {
          setData(response);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "An unknown error occurred");
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { data, isLoading, error };
}
