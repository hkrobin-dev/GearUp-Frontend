"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type RevenueChartProps = {
  rentals: {
    createdAt: string;
    totalAmount: number | string;
    status: string;
  }[];
};

export function RevenueChart({ rentals }: RevenueChartProps) {
  const revenueByMonth = Array.from({ length: 12 }, (_, index) => ({
    month: new Date(0, index).toLocaleString("default", {
      month: "short",
    }),
    revenue: 0,
  }));

  rentals.forEach((rental) => {
    if (!["PAID", "PICKED_UP", "RETURNED"].includes(rental.status)) return;

    const month = new Date(rental.createdAt).getMonth();

    revenueByMonth[month].revenue += Number(rental.totalAmount);
  });

  return (
    <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
      <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
        Monthly Revenue
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={revenueByMonth}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="revenue"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}