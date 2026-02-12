import React from 'react'

interface ExpenseHeaderProps {
  onAddExpense: () => void;
}

const ExpenseHeader: React.FC<ExpenseHeaderProps> = ({ onAddExpense }) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-2xl font-bold text-neutral-800">Manage Expenses</h1>
      <button
        onClick={onAddExpense}
        className="px-4 py-2 bg-neutral-800 text-white rounded-md hover:bg-neutral-700 transition-colors duration-200 font-medium"
      >
        + Add Expense
      </button>
    </div>
  );
};

export default ExpenseHeader