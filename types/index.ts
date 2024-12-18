// Define a type for your budget objects
export type BudgetType = {
  id: number;
  name: string;
  totalSpend: number;
  totalItem: number;
  icon: string;
  amount: number;
};

// Define a type for your budget objects
export type IncomeType = {
  id: number;
  name: string;
  // totalSpend: number;
  // totalItem: number;
  totalAmount: number;
  icon: string;
  amount: number;
};

// Define a type for your budget objects
export type ExpenseType = {
  id: number;
  name: string;
  amount: number;
  budgetId: number;
  createdAt: string;
};
