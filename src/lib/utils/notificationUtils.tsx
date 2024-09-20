"use client"
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

/**
 * confirmAction Function
 * 
 * Displays a confirmation toast to the user with a custom message and
 * two buttons for confirmation ("Yes") and cancellation ("Cancel").
 * 
 * @param {() => void} action - The action to execute if the user confirms.
 * @param {string} description - The message to display in the confirmation toast.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the user confirms,
 *                             and `false` if the user cancels.
 * 
 * Usage:
 * This function is typically used for actions that require user confirmation,
 * such as deleting an item or performing a significant action. The calling
 * function can await this promise to determine the user's choice and 
 * proceed accordingly.
 * 
 * Example:
 * const confirmed = await confirmAction(() => deleteItem(itemId), "Are you sure you want to delete this item?");
 * if (confirmed) {
 *     // Proceed with the action
 * }
 */
export const confirmAction = (action: () => void, description: string): Promise<boolean> => {
    return new Promise<boolean>((resolve) => {
        toast(
            (t) => (
                <motion.div
                    className="bg-white shadow-lg rounded-lg p-4 space-y-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                >
                    <p className="text-lg font-semibold text-gray-700" > {description} </p>
                    < div className="flex justify-end space-x-2" >
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 border-red-500"
                            onClick={() => {
                                toast.dismiss(t.id);
                                action();
                                resolve(true);
                            }}
                        >
                            Yes
                        </Button>
                        < Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                                toast.dismiss(t.id);
                                resolve(false);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </motion.div>
            ),
            { duration: Infinity, position: "top-center" }
        );
    });
};