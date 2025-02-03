import React from "react";
import { Trash2 } from "lucide-react";
import { useChat } from "../../hooks/useChat";

export function ClearHistoryButton() {
  const { clearHistory, isLoading } = useChat();

  const handleClear = async () => {
    if (
      window.confirm(
        "Are you sure you want to clear your chat history? This action cannot be undone."
      )
    ) {
      await clearHistory();
    }
  };

  return (
    <button
      onClick={handleClear}
      disabled={isLoading}
      className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 dark:text-red-400 dark:bg-red-900/30 dark:hover:bg-red-900/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
    >
      <Trash2 className="h-4 w-4 mr-2" />
      {isLoading ? "Clearing..." : "Clear History"}
    </button>
  );
}
