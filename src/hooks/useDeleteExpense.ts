/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpenseApi } from "../services/expensesApi";

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteExpenseApi,

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ["expenses"] });

      const previousData = queryClient.getQueryData<any>(["expenses"]);

      queryClient.setQueryData(["expenses"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page: any) => ({
            ...page,
            data: page.data.filter((expense: any) => expense.id !== id),
          })),
        };
      });

      return { previousData };
    },

    onError: (_err, _id, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(["expenses"], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["expenses"],
      });
    },
  });
};
