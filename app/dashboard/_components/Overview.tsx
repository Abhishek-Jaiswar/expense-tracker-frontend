"use client";

import useAuth from "@/hooks/useAuth";
import api from "@/utils/api";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import ExpenseHeader from "./ExpenseHeader";
import ExpenseList from "./ExpenseList";
import ExpenseModal from "./ExpenseModal";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type TStats = {
  user_id: string;
  expense_count: string;
  total_amount: string;
  average_amount: string;
  min_amount: number;
  max_amount: number;
};

const Overview = () => {
  const [stats, setStats] = useState<TStats | null>(null);
  const [expenses, setExpenses] = useState<any[]>([]);
  console.log(expenses);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<any>(null);
  const { user, logout } = useAuth();
  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);
      const statsRes = await api.get("/expense/expenses-stats");
      const expensesRes = await api.get("/expense");

      setStats(statsRes.data.data);
      setExpenses(expensesRes.data.expenses);
    } catch (error) {
      console.error("Failed to load data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handleEdit = (expense: any) => {
    setSelectedExpense(expense);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      try {
        await api.delete(`/expense/${id}`);
        toast.success("Expense deleted successfully");
        fetchData();
      } catch (error) {
        toast.error("Failed to delete expense");
      }
    }
  };

  const handleAddClick = () => {
    setSelectedExpense(null);
    setIsModalOpen(true);
  };

  if (loading && !stats) {
    return (
      <div className="h-screen flex items-center justify-center">
        <h1 className="flex items-center gap-2">
          <Loader className="animate-spin size-4" /> Loading dashboard...
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800">
            Hello, {user?.fullname}
          </h1>
          <p className="text-neutral-500">
            Welcome back to your expense tracker.
          </p>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-neutral-300 text-neutral-600 hover:bg-neutral-50 transition-colors duration-200 rounded-md font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-bold mb-4 text-neutral-700">
          Financial Overview
        </h2>
        {stats ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white border p-4 rounded-lg shadow-sm">
              <p className="text-neutral-500 text-sm">Total Amount</p>
              <p className="text-2xl font-bold text-neutral-900">
                ₹{Number(stats.total_amount).toLocaleString()}
              </p>
            </div>
            <div className="bg-white border p-4 rounded-lg shadow-sm">
              <p className="text-neutral-500 text-sm">Avg. Expense</p>
              <p className="text-2xl font-bold text-neutral-900">
                ₹
                {Number(stats.average_amount).toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <div className="bg-white border p-4 rounded-lg shadow-sm">
              <p className="text-neutral-500 text-sm">Min Expense</p>
              <p className="text-2xl font-bold text-neutral-900">
                ₹{Number(stats.min_amount).toLocaleString()}
              </p>
            </div>
            <div className="bg-white border p-4 rounded-lg shadow-sm">
              <p className="text-neutral-500 text-sm">Max Expense</p>
              <p className="text-2xl font-bold text-neutral-900">
                ₹{Number(stats.max_amount).toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-neutral-500">No statistics available yet.</p>
        )}
      </div>

      <div className="bg-white border rounded-xl p-6 shadow-sm">
        <ExpenseHeader onAddExpense={handleAddClick} />
        <ExpenseList
          expenses={expenses}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <ExpenseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={fetchData}
        expense={selectedExpense}
      />
    </div>
  );
};

export default Overview;
