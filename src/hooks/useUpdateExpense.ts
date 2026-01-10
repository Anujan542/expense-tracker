/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateExpenseApi } from '../services/expensesApi';
import type { Expense } from '../types/expenseTypes';

export const useUpdateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateExpenseApi,

    onMutate: async (updatedExpense: Expense) => {
      await queryClient.cancelQueries({ queryKey: ['expenses'] });

      const previousData =
        queryClient.getQueryData<any>(['expenses']);

      queryClient.setQueryData(['expenses'], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.map((expense: Expense) =>
              expense.id === updatedExpense.id
                ? updatedExpense
                : expense
            ),
          })),
        };
      });

      return { previousData };
    },

    onError: (_err, _expense, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ['expenses'],
          context.previousData
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['expenses'],
      });
    },
  });
};
