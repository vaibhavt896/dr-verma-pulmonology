import { toast } from "sonner";

export function useToast() {
  return {
    toast: ({ title, description }: { title: string; description?: string }) => {
      toast(title, {
        description,
      });
    },
    success: (message: string) => {
      toast.success(message);
    },
    error: (message: string) => {
      toast.error(message);
    },
  };
}

export { toast };
