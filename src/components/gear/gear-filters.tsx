"use client";

import { useCategories } from "@/lib/api/gear";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export interface GearFilterValues {
  search: string;
  category: string;
  minPrice: string;
  maxPrice: string;
}

export function GearFilters({
  values,
  onChange,
}: {
  values: GearFilterValues;
  onChange: (values: GearFilterValues) => void;
}) {
  const { data: categories } = useCategories();
  const [local, setLocal] = useState(values);

  useEffect(() => setLocal(values), [values]);

  const apply = () => onChange(local);
  const reset = () => {
    const cleared = { search: "", category: "", minPrice: "", maxPrice: "" };
    setLocal(cleared);
    onChange(cleared);
  };

  return (
    <div className="space-y-5 rounded-xl border border-slate-200 bg-white p-5">
      <div>
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Search</h3>
        <Input
          placeholder="Search gear..."
          value={local.search}
          onChange={(e) => setLocal({ ...local, search: e.target.value })}
          onKeyDown={(e) => e.key === "Enter" && apply()}
        />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Category</h3>
        <Select
          value={local.category}
          onChange={(e) => setLocal({ ...local, category: e.target.value })}
        >
          <option value="">All Categories</option>
          {categories?.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-semibold text-slate-900">Price per day</h3>
        <div className="flex gap-2">
          <Input
            type="number"
            min={0}
            placeholder="Min"
            value={local.minPrice}
            onChange={(e) => setLocal({ ...local, minPrice: e.target.value })}
          />
          <Input
            type="number"
            min={0}
            placeholder="Max"
            value={local.maxPrice}
            onChange={(e) => setLocal({ ...local, maxPrice: e.target.value })}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <Button className="flex-1" onClick={apply}>
          Apply
        </Button>
        <Button variant="outline" onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
