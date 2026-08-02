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

  useEffect(() => {
    setLocal(values);
  }, [values]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(local);
    }, 500);

    return () => clearTimeout(timer);
  }, [local, onChange]);

  const reset = () => {
    const cleared = {
      search: "",
      category: "",
      minPrice: "",
      maxPrice: "",
    };

    setLocal(cleared);
    onChange(cleared);
  };

  return (
    <div
      className="
        space-y-5
        rounded-xl
        border
        border-slate-200
        bg-white
        p-5

        dark:border-slate-700
        dark:bg-slate-900
        transition-colors
        duration-300
      "
    >

      {/* Search */}
      <div>
        <h3
          className="
            mb-3
            text-sm
            font-semibold
            text-slate-900

            dark:text-white
          "
        >
          Search
        </h3>

        <Input
          placeholder="Search gear..."
          value={local.search}
          onChange={(e) =>
            setLocal({
              ...local,
              search: e.target.value,
            })
          }
        />
      </div>


      {/* Category */}
      <div>

        <h3
          className="
            mb-3
            text-sm
            font-semibold
            text-slate-900

            dark:text-white
          "
        >
          Category
        </h3>


        <Select
          value={local.category}
          onChange={(e) =>
            setLocal({
              ...local,
              category: e.target.value,
            })
          }
        >

          <option value="">
            All Categories
          </option>


          {categories?.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}


        </Select>

      </div>


      {/* Price */}
      <div>

        <h3
          className="
            mb-3
            text-sm
            font-semibold
            text-slate-900

            dark:text-white
          "
        >
          Price per day
        </h3>


        <div className="flex gap-2">

          <Input
            type="number"
            min={0}
            placeholder="Min"
            value={local.minPrice}
            onChange={(e) =>
              setLocal({
                ...local,
                minPrice: e.target.value,
              })
            }
          />


          <Input
            type="number"
            min={0}
            placeholder="Max"
            value={local.maxPrice}
            onChange={(e) =>
              setLocal({
                ...local,
                maxPrice: e.target.value,
              })
            }
          />

        </div>

      </div>


      {/* Reset */}
      <Button
        variant="outline"
        className="
          w-full

          dark:border-slate-700
          dark:text-slate-200
          dark:hover:bg-slate-800
        "
        onClick={reset}
      >
        Reset Filters
      </Button>


    </div>
  );
}