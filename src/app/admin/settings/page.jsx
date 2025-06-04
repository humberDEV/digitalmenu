"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { destroyCookie } from "nookies";
import { toast } from "sonner";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { LogOut } from "lucide-react";

export default function SettingsPage() {
  const [hasSubscription, setHasSubscription] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setHasSubscription(false);
  }, []);

  if (hasSubscription === null) return null;

  const buttonPricingText = hasSubscription
    ? "Mejorar plan"
    : "Contratar un plan";

  const handleLogout = async () => {
    destroyCookie(null, "token", { path: "/" });
    toast.success("Sesión cerrada exitosamente.");
    setTimeout(() => router.push("/"), 400);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-b from-navy to-[#0b0f19] text-white">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
        Configuración
      </h1>

      {/* Suscripción */}
      <Card className="mb-8 bg-white/5 border border-white/10 rounded-2xl shadow-sm backdrop-blur-md text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Administrar suscripción</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Badge
            variant="outline"
            className="text-xs text-white/80 border-white/20 bg-white/10"
          >
            Plan Actual: Gratuito (Prueba)
          </Badge>
          <p className="text-sm text-white/60">
            Contrate con nosotros para obtener acceso a todas las
            funcionalidades.
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap gap-4 justify-center md:justify-start">
          <Button
            asChild
            variant="default"
            className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white"
          >
            <a href="/admin/pricing">{buttonPricingText}</a>
          </Button>
          {hasSubscription && (
            <Button variant="destructive" className="w-full sm:w-auto">
              Cancelar suscripción
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Contraseña */}
      <Card className="mb-8 bg-white/5 border border-white/10 rounded-2xl shadow-sm backdrop-blur-md text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Cambio de contraseña</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="password"
              placeholder="Nueva contraseña"
              className="bg-white/10 text-white/90 border border-white/10 focus:border-neutral-500 focus:outline-none w-full"
            />
            <Button variant="secondary" className="w-full sm:w-auto">
              Actualizar contraseña
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Cerrar sesión */}
      <Card className="bg-white/5 border border-white/10 rounded-2xl shadow-sm backdrop-blur-md text-white">
        <CardHeader>
          <CardTitle className="text-2xl">Cerrar sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <AlertDialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full sm:w-auto">
                Cerrar sesión
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-navy border border-white/10">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-semibold flex items-center gap-2">
                  <LogOut className="w-5 h-5" />
                  ¿Deseas cerrar sesión?
                </AlertDialogTitle>
                <AlertDialogDescription className="mt-2 text-sm text-white/70">
                  No te preocupes, tus menús seguirán disponibles en línea y
                  podrás acceder a ellos cuando vuelvas a iniciar sesión.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="space-x-2 mt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowLogoutModal(false)}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleLogout();
                    setShowLogoutModal(false);
                  }}
                >
                  Cerrar sesión
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
