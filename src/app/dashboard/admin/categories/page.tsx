"use client";

import { useState } from "react";
import {
  useAdminCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/lib/api/admin";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { EmptyState } from "@/components/ui/empty-state";
import { TableRowSkeleton } from "@/components/ui/skeleton";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Boxes, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const { data: categories, isLoading } = useAdminCategories();

  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const editingCategory = categories?.find(
    (category) => category.id === editingId
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      if (editingId) {
        await updateCategory.mutateAsync({
          id: editingId,
          payload: {
            name: name.trim(),
            description: description.trim() || undefined,
          },
        });

        toast.success("Category updated successfully");
      } else {
        await createCategory.mutateAsync({
          name: name.trim(),
          description: description.trim() || undefined,
        });

        toast.success("Category created successfully");
      }

      setName("");
      setDescription("");
      setEditingId(null);
    } catch (err: unknown) {
      const error = err as { message?: string };

      toast.error(
        error.message ||
          `Failed to ${editingId ? "update" : "create"} category`
      );
    }
  };

  const handleEdit = (id: string) => {
    const category = categories?.find((item) => item.id === id);

    if (!category) return;

    setEditingId(category.id);
    setName(category.name);
    setDescription(category.description || "");
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName("");
    setDescription("");
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteCategory.mutateAsync(deleteTarget);

      toast.success("Category deleted successfully");
      setDeleteTarget(null);
    } catch (err: unknown) {
      const error = err as { message?: string };

      toast.error(error.message || "Failed to delete category");
    }
  };

  const isSubmitting =
    createCategory.isPending || updateCategory.isPending;

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          Categories
        </h1>

        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Create and manage gear categories.
        </p>
      </div>

      {/* Add / Edit Category */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          {editingId ? "Edit Category" : "Add New Category"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mt-4 space-y-4"
        >
          <Input
            label="Category Name"
            placeholder="e.g. Cycling"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Textarea
            label="Description (optional)"
            placeholder="Describe this category..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex gap-2">
            <Button
              type="submit"
              isLoading={isSubmitting}
            >
              {editingId ? "Update Category" : "Add Category"}
            </Button>

            {editingId && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancelEdit}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </div>

      {/* Categories List */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Description</th>
              <th className="px-4 py-3">Gear Items</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <TableRowSkeleton key={i} cols={4} />
              ))
            ) : !categories || categories.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12">
                  <EmptyState
                    icon={Boxes}
                    title="No categories found"
                  />
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr
                  key={category.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                    {category.name}
                  </td>

                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400">
                    {category.description || "—"}
                  </td>

                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                    {category._count?.gearItems ?? 0}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(category.id)}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </Button>

                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() =>
                          setDeleteTarget(category.id)
                        }
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete this category?"
        description="A category containing gear items cannot be deleted."
        confirmLabel="Delete"
        isLoading={deleteCategory.isPending}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}