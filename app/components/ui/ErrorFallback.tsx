import * as React from "react";
import { Button } from "./Button";
import { AlertCircle } from "lucide-react";

interface ErrorFallbackProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorFallback({ message = "Something went wrong.", onRetry }: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 rounded-lg border border-red-100 bg-red-50">
      <AlertCircle className="h-10 w-10 text-red-500" />
      <div>
        <h3 className="text-lg font-semibold text-red-800">An Error Occurred</h3>
        <p className="text-sm text-red-600 mt-1">{message}</p>
      </div>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="mt-4 border-red-200 text-red-700 hover:bg-red-100">
          Try Again
        </Button>
      )}
    </div>
  );
}
