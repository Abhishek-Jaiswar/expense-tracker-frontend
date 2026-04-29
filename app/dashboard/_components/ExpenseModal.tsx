"use client";

import React, { useEffect, useState } from "react";
import { X, Loader } from "lucide-react";
import toast from "react-hot-toast";
import api from "@/utils/api";
import { TExpenses } from "@/utils/types";
import useAuth from "@/hooks/useAuth";

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  expense?: TExpenses;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  expense,
}) => {
  const [form, setForm] = useState({
    expense_name: "",
    expense_amount: "",
    expense_description: "",
    expense_date: new Date().toISOString().split("T")[0],
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const user_id = user?.id;

  useEffect(() => {
    if (expense) {
      setForm({
        expense_name: expense.expense_name || "",
        expense_amount: expense.expense_amount?.toString() || "",
        expense_description: expense.expense_description || "",
        expense_date: expense.expense_date
          ? new Date(expense.expense_date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
      });
    } else {
      setForm({
        expense_name: "",
        expense_amount: "",
        expense_description: "",
        expense_date: new Date().toISOString().split("T")[0],
      });
    }
  }, [expense, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        ...form,
        user_id,
      };

      if (expense) {
        await api.put(`/expenses/update/${expense.id}`, payload);
        toast.success("Expense updated successfully");
      } else {
        await api.post("/expenses/create", payload);
        toast.success("Expense created successfully");
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save expense");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold">
            {expense ? "Edit Expense" : "Add Expense"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Expense Name
            </label>
            <input
              type="text"
              name="expense_name"
              required
              value={form.expense_name}
              onChange={handleChange}
              placeholder="e.g. Rent, Groceries"
              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-neutral-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Amount (₹)
            </label>
            <input
              type="number"
              name="expense_amount"
              required
              step="0.01"
              value={form.expense_amount}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-neutral-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Date
            </label>
            <input
              type="date"
              name="expense_date"
              required
              value={form.expense_date}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-neutral-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Description
            </label>
            <textarea
              name="expense_description"
              value={form.expense_description}
              onChange={handleChange}
              rows={3}
              placeholder="Optional details..."
              className="w-full border border-neutral-300 rounded px-3 py-2 focus:ring-2 focus:ring-neutral-500 outline-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-neutral-600 hover:text-neutral-800 font-medium disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-neutral-800 text-white rounded hover:bg-neutral-700 font-medium flex items-center gap-2 disabled:opacity-50"
            >
              {loading && <Loader className="size-4 animate-spin" />}
              {expense ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;
