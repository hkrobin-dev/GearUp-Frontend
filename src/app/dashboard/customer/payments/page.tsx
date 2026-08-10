"use client";

import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Receipt,
} from "lucide-react";

import { useMyPayments } from "@/lib/api/payments";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { TableRowSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

const PAYMENTS_PER_PAGE = 5;

export default function CustomerPaymentsPage() {
  const { data: payments, isLoading } = useMyPayments();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [method, setMethod] = useState("ALL");
  const [sort, setSort] = useState("NEWEST");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPayments = useMemo(() => {
    if (!payments) return [];

    let result = [...payments];

    // Search transaction ID
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((payment) =>
        payment.transactionId?.toLowerCase().includes(query),
      );
    }

    // Status filter
    if (status !== "ALL") {
      result = result.filter((payment) => payment.status === status);
    }

    // Payment method filter
    if (method !== "ALL") {
      result = result.filter((payment) => payment.method === method);
    }

    // Sorting
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();

      return sort === "NEWEST" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [payments, search, status, method, sort]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredPayments.length / PAYMENTS_PER_PAGE),
  );

  const safePage = Math.min(currentPage, totalPages);

  const paginatedPayments = filteredPayments.slice(
    (safePage - 1) * PAYMENTS_PER_PAGE,
    safePage * PAYMENTS_PER_PAGE,
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatus = (value: string) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const handleMethod = (value: string) => {
    setMethod(value);
    setCurrentPage(1);
  };

  const handleSort = (value: string) => {
    setSort(value);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Payment History
        </h1>

        <p className="mt-1 text-slate-500 dark:text-slate-400">
          All your past and pending payments.
        </p>
      </div>

      {/* Filters */}
      {!isLoading && payments && payments.length > 0 && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
          <div className="mb-4 flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-emerald-600" />

            <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
              Filter & Sort Payments
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {/* Search */}
            <div>
              <label
                htmlFor="payment-search"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Search Transaction
              </label>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  id="payment-search"
                  type="search"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Transaction ID..."
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="payment-status"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Status
              </label>

              <select
                id="payment-status"
                value={status}
                onChange={(e) => handleStatus(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="ALL">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="COMPLETED">Completed</option>
                <option value="FAILED">Failed</option>
              </select>
            </div>

            {/* Method */}
            <div>
              <label
                htmlFor="payment-method"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Payment Method
              </label>

              <select
                id="payment-method"
                value={method}
                onChange={(e) => handleMethod(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="ALL">All Methods</option>
                <option value="STRIPE">Stripe</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label
                htmlFor="payment-sort"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Sort By
              </label>

              <select
                id="payment-sort"
                value={sort}
                onChange={(e) => handleSort(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
              >
                <option value="NEWEST">Newest First</option>
                <option value="OLDEST">Oldest First</option>
              </select>
            </div>
          </div>

          {/* Result count */}
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Showing{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {filteredPayments.length}
            </span>{" "}
            payment{filteredPayments.length !== 1 ? "s" : ""}
          </p>
        </div>
      )}

      {/* Payment Table */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <table className="w-full min-w-[700px] text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Transaction ID</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRowSkeleton key={i} cols={5} />
              ))
            ) : !payments || payments.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12">
                  <EmptyState
                    icon={Receipt}
                    title="No payments yet"
                    description="Your payment history will appear here."
                  />
                </td>
              </tr>
            ) : paginatedPayments.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12">
                  <EmptyState
                    icon={Receipt}
                    title="No matching payments"
                    description="Try changing your search or filters."
                  />
                </td>
              </tr>
            ) : (
              paginatedPayments.map((payment) => (
                <tr
                  key={payment.id}
                  className="text-slate-700 transition hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <td className="px-4 py-3 font-mono text-xs">
                    {payment.transactionId}
                  </td>

                  <td className="px-4 py-3 font-semibold">
                    {formatCurrency(payment.amount)}
                  </td>

                  <td className="px-4 py-3">{payment.method}</td>

                  <td className="px-4 py-3">
                    <StatusBadge status={payment.status} />
                  </td>

                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                    {formatDate(payment.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isLoading && filteredPayments.length > 0 && totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Page{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {safePage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900 dark:text-white">
              {totalPages}
            </span>
          </p>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={safePage === 1}
              onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Previous
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={safePage === totalPages}
              onClick={() =>
                setCurrentPage((page) => Math.min(totalPages, page + 1))
              }
            >
              Next
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
