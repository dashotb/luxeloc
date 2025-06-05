"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ReservationConfirmation() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
        </motion.div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Réservation Confirmée !
        </h1>

        <p className="text-gray-600 mb-6">
          Votre réservation a été enregistrée avec succès. Vous recevrez un email de confirmation avec tous les détails.
        </p>

        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Redirection vers la page d'accueil dans {countdown} secondes...
          </p>

          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 