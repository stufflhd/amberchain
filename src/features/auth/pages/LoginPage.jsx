import { Card, CardContent } from "@/components/ui/card";
import { Globe } from "@/components/magicui/globe";
import { useEffect, useState, memo } from "react";
import { isWebGLAvailable } from "@/lib/isWebGLAvailable";
import LoginForm from "../components/LoginForm";

const MemoizedGlobe = memo(Globe);

export default function LoginPage() {
  const [webglSupported, setWebglSupported] = useState(false);

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
  }, []);

  return (
    <main className="h-screen flex flex-col gap-4 justify-center items-center px-4 sm:px-0">
      <Card className="overflow-hidden p-0 flex flex-col gap-6 w-full max-w-full md:max-w-3xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          <LoginForm />
          <div className="relative hidden md:flex justify-end items-end">
            {webglSupported && <MemoizedGlobe />}
          </div>
        </CardContent>
      </Card>
    </main>
  );
}