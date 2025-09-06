import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { KeyRound, UserPlus, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import AuthModal, { AuthType } from "@/components/auth/AuthModal";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<AuthType>("signin");
  const navigate = useNavigate();
  const { signIn, signUp, continueAsGuest } = useAuth();

  const handleOpen = (t: AuthType) => {
    setType(t);
    setOpen(true);
  };

  const onSubmit = async (values: Record<string, any>) => {
    if (values.type === "signin") {
      await signIn(values);
    } else if (values.type === "signup") {
      await signUp(values);
    } else {
      await continueAsGuest(values);
    }
    navigate("/home");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-white">
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-gradient-to-br from-brand-from to-brand-to shadow-lg flex items-center justify-center text-white font-extrabold text-2xl select-none">
            MB
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-slate-800">
            Hello, Welcome to MediBuddy 👋
          </h1>
          <p className="mt-2 text-slate-500 text-sm">
            Your personal medicine reminder companion
          </p>

          <div className="mt-8 space-y-3">
            <Button
              onClick={() => handleOpen("signin")}
              className="w-full h-12 rounded-full text-base font-medium text-white bg-gradient-to-r from-brand-from to-brand-to shadow-md hover:shadow-lg transition-transform hover:scale-[1.01] active:scale-100"
            >
              <KeyRound className="mr-1" />
              Sign In
            </Button>

            <Button
              onClick={() => handleOpen("signup")}
              variant="secondary"
              className="w-full h-12 rounded-full text-base font-medium bg-white text-slate-700 shadow-sm hover:shadow-md border border-slate-200 transition-transform hover:scale-[1.01] active:scale-100"
            >
              <UserPlus className="mr-1" />
              Sign Up
            </Button>

            <Button
              onClick={() => handleOpen("guest")}
              variant="outline"
              className="w-full h-12 rounded-full text-base font-medium bg-white text-slate-700 shadow-sm hover:shadow-md border border-slate-200 transition-transform hover:scale-[1.01] active:scale-100"
            >
              <User className="mr-1" />
              Continue as Guest
            </Button>
          </div>
        </div>
      </main>
      <footer className="w-full py-4 text-center text-xs text-slate-500">
        Your health, on time ⏰
      </footer>

      <AuthModal type={type} open={open} onOpenChange={setOpen} onSubmit={onSubmit} />
    </div>
  );
}
