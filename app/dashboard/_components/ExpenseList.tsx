"use client";

import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { TExpenses } from "@/utils/types";

interface ExpenseListProps {
  expenses: TExpenses[];
  onEdit: (expense: TExpenses) => void;
  onDelete: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
    expenses,
    onEdit,
    onDelete,
}) => {
    if (expenses?.length === 0) {
        return (
            <div className="mt-8 text-center py-12 bg-neutral-50 rounded-lg border-2 border-dashed border-neutral-200">
                <p className="text-neutral-500">No expenses found. Add one to get started!</p>
            </div>
        );
    }

    return (
        <div className="mt-8 overflow-hidden rounded-lg border border-neutral-200">
            <table className="w-full text-left border-collapse">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                    <tr>
                        <th className="px-6 py-3 text-sm font-semibold text-neutral-600">Name</th>
                        <th className="px-6 py-3 text-sm font-semibold text-neutral-600">Amount</th>
                        <th className="px-6 py-3 text-sm font-semibold text-neutral-600">Date</th>
                        <th className="px-6 py-3 text-sm font-semibold text-neutral-600">Description</th>
                        <th className="px-6 py-3 text-sm font-semibold text-neutral-600 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                    {expenses && expenses.map((expense) => (
                        <tr key={expense.id} className="hover:bg-neutral-50 transition-colors">
                            <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                                {expense.expense_name}
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-700">
                                ₹{Number(expense.expense_amount).toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-500">
                                {new Date(expense.expense_date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 text-sm text-neutral-500 truncate max-w-xs">
                                {expense.expense_description || "-"}
                            </td>
                            <td className="px-6 py-4 text-sm text-right">
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => onEdit(expense)}
                                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                        title="Edit"
                                    >
                                        <Edit className="size-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete(expense.id)}
                                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                        title="Delete"
                                    >
                                        <Trash2 className="size-4" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExpenseList;
