"use client";

import { useMyPayments } from "@/lib/api/payments";
import { StatusBadge } from "@/components/ui/status-badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { TableRowSkeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Receipt } from "lucide-react";

export default function CustomerPaymentsPage() {
  const { data: payments, isLoading } = useMyPayments();

  return (
    <div>

      <h1
        className="
          text-2xl
          font-bold
          text-slate-900

          dark:text-white
        "
      >
        Payment History
      </h1>


      <p
        className="
          mt-1
          text-slate-500

          dark:text-slate-400
        "
      >
        All your past and pending payments.
      </p>



      <div
        className="
          mt-6
          overflow-x-auto
          rounded-xl
          border
          border-slate-200
          bg-white

          dark:border-slate-700
          dark:bg-slate-900
        "
      >

        <table className="w-full text-sm">

          <thead
            className="
              border-b
              border-slate-200
              bg-slate-50
              text-left
              text-xs
              font-semibold
              uppercase
              text-slate-500

              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-400
            "
          >

            <tr>
              <th className="px-4 py-3">Transaction ID</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>

          </thead>


          <tbody
            className="
              divide-y
              divide-slate-100

              dark:divide-slate-700
            "
          >

            {isLoading ? (

              Array.from({ length: 3 }).map((_, i) => (
                <TableRowSkeleton
                  key={i}
                  cols={5}
                />
              ))


            ) : !payments || payments.length === 0 ? (

              <tr>
                <td
                  colSpan={5}
                  className="py-12"
                >
                  <EmptyState
                    icon={Receipt}
                    title="No payments yet"
                  />
                </td>
              </tr>


            ) : (

              payments.map((p) => (

                <tr
                  key={p.id}
                  className="
                    text-slate-700

                    dark:text-slate-200
                  "
                >

                  <td
                    className="
                      px-4
                      py-3
                      font-mono
                      text-xs
                    "
                  >
                    {p.transactionId}
                  </td>


                  <td
                    className="
                      px-4
                      py-3
                      font-medium
                    "
                  >
                    {formatCurrency(p.amount)}
                  </td>


                  <td className="px-4 py-3">
                    {p.method}
                  </td>


                  <td className="px-4 py-3">
                    <StatusBadge status={p.status} />
                  </td>


                  <td
                    className="
                      px-4
                      py-3
                      text-slate-500

                      dark:text-slate-400
                    "
                  >
                    {formatDate(p.createdAt)}
                  </td>


                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}