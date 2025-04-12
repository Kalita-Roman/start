"use client";
import React from "react";
import { Dialog, ConfirmationDialog } from "@/components/client";
import { useCategory } from "@/components/client/Category/CategoryProvider";
import { Price, Date, Button, ButtonType } from "@/components/presentation";
import { Expense } from "@/types/Expense.types";
import { deleteExpense } from "@/services/expensesService";
import { useConfirmationAction } from "@/hooks";

interface ViewExpenseDialogProps {
  expense: Expense;
  onClose: () => void;
}

export const ViewDialog = ({ expense, onClose }: ViewExpenseDialogProps) => {
  const { getCategoryById } = useCategory();
  const { isWaiting, handleConfirm, handleReject, withConfirmation } =
    useConfirmationAction();

  const handleDelete = async () => {
    await deleteExpense({ id: expense.id });
    onClose();
  };

  return (
    <>
      <Dialog title="Expense" onClose={onClose}>
        <div className="flex flex-col gap-8">
          <div className="flex justify-between">
            <Price amount={expense?.amount} currency={expense?.currency} />
            {getCategoryById(expense?.category || undefined)?.name}
            <Date date={expense?.date} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Button
              buttonType={ButtonType.Outlined}
              className="col-span-1"
              onClick={withConfirmation(handleDelete)}
            >
              Delete
            </Button>
            <Button className="col-span-2" onClick={onClose}>
              Edit
            </Button>
          </div>
        </div>
      </Dialog>
      {isWaiting && (
        <ConfirmationDialog onConfirm={handleConfirm} onReject={handleReject} />
      )}
    </>
  );
};
