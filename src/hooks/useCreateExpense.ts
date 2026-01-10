/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "../services/expensesApi";
import { enqueue } from "../redux/offline/offlineQueueSlice";
import { useDispatch } from "react-redux";

export const useCreateExpense = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: createExpense,

    onMutate: async (newExpense) => {
      await queryClient.cancelQueries({ queryKey: ["expenses"] });

      const previousData = queryClient.getQueryData(["expenses"]);

      queryClient.setQueryData(["expenses"], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any, index: number) => {
            if (index === 0) {
              return {
                ...page,
                data: [newExpense, ...page.data],
              };
            }
            return page;
          }),
        };
      });
      return { previousData };
    },

    onError: (_err, newExpense, context) => {
      if ((_err as Error).message === "Network Error") {
        dispatch(
          enqueue({
            type: "CREATE",
            payload: newExpense,
            timestamp: Date.now(),
          })
        );
      }

      if (context?.previousData) {
        queryClient.setQueryData(["expenses"], context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
  });
};
