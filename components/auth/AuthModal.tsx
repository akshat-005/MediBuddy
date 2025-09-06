import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export type AuthType = "signin" | "signup" | "guest";

export interface AuthModalProps {
  type: AuthType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: Record<string, any>) => Promise<void> | void;
}

export const AuthModal = ({ type, open, onOpenChange, onSubmit }: AuthModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { isSubmitting },
  } = useForm<Record<string, any>>({
    defaultValues: {
      name: "",
      age: "",
      gender: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const titleMap: Record<AuthType, string> = {
    signin: "Sign In",
    signup: "Sign Up",
    guest: "Continue as Guest",
  };

  const showEmailPassword = type === "signin" || type === "signup";
  const showConfirmPassword = type === "signup";

  const submit = handleSubmit(async (values) => {
    await onSubmit({ type, ...values });
    onOpenChange(false);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 overflow-hidden border-0 bg-white dark:bg-neutral-900">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="p-6 sm:p-8"
        >
          <DialogHeader className="mb-4">
            <DialogTitle className="text-xl sm:text-2xl font-semibold">
              {titleMap[type]}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" {...register("name")} required placeholder="Your full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input id="age" type="number" inputMode="numeric" min={0} {...register("age")} required placeholder="e.g. 29" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <Select onValueChange={(v) => setValue("gender", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="na">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {showEmailPassword && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} required placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" {...register("password")} required placeholder="••••••••" />
                </div>
              </div>
            )}

            {showConfirmPassword && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" {...register("confirmPassword")} required placeholder="••••••••" />
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-full text-base font-medium text-white bg-gradient-to-r from-brand-from to-brand-to shadow-md hover:shadow-lg transition-transform duration-150 ease-out hover:scale-[1.01] active:scale-100"
            >
              Continue
            </Button>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
