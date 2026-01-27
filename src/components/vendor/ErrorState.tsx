import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ErrorStateProps {
  title?: string;
  message?: string;
}

export function ErrorState({ 
  title = "Vendor not found", 
  message = "The vendor you're looking for doesn't exist or has been removed." 
}: ErrorStateProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-10 w-10 text-destructive" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground max-w-md mx-auto">{message}</p>
        </div>
        <Button asChild className="gradient-primary">
          <Link to="/">Browse All Vendors</Link>
        </Button>
      </div>
    </div>
  );
}
