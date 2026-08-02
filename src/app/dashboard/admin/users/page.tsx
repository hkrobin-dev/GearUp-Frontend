"use client";

import { useAdminUsers, useUpdateUserStatus } from "@/lib/api/admin";
import { StatusBadge } from "@/components/ui/status-badge";
import { TableRowSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { formatDate } from "@/lib/utils";
import { Pagination } from "@/components/ui/pagination";

const PAGE_SIZE = 10;

export default function AdminUsersPage() {
  const { data: users, isLoading } = useAdminUsers();
  const updateStatus = useUpdateUserStatus();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!users) return [];
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
  }, [users, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleToggle = async (
    id: string,
    current: "ACTIVE" | "SUSPENDED"
  ) => {
    try {
      await updateStatus.mutateAsync({
        id,
        status: current === "ACTIVE" ? "SUSPENDED" : "ACTIVE",
      });
      toast.success("User status updated");
    } catch (err: unknown) {
      const e = err as { message?: string };
      toast.error(e.message || "Failed to update user");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
        User Management
      </h1>

      <p className="mt-1 text-slate-500 dark:text-slate-400">
        View and moderate all platform users.
      </p>

      <div className="mt-4 max-w-sm">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRowSkeleton key={i} cols={6} />
              ))
            ) : paged.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12">
                  <EmptyState
                    icon={Users}
                    title="No users found"
                  />
                </td>
              </tr>
            ) : (
              paged.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                    {user.name}
                  </td>

                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                    {user.email}
                  </td>

                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                    {user.role}
                  </td>

                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                    {formatDate(user.createdAt)}
                  </td>

                  <td className="px-4 py-3">
                    <StatusBadge status={user.status} />
                  </td>

                  <td className="px-4 py-3 text-right">
                    {user.role !== "ADMIN" && (
                      <Button
                        size="sm"
                        variant={
                          user.status === "ACTIVE"
                            ? "danger"
                            : "outline"
                        }
                        isLoading={updateStatus.isPending}
                        onClick={() =>
                          handleToggle(user.id, user.status)
                        }
                      >
                        {user.status === "ACTIVE"
                          ? "Suspend"
                          : "Activate"}
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}