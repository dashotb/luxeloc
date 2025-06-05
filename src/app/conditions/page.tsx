'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ConditionsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Conditions de location</h1>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border rounded-lg mb-2 shadow-sm">
            <AccordionTrigger className="px-4 py-2 hover:bg-gray-50 rounded-t-lg">Âge et permis</AccordionTrigger>
            <AccordionContent className="px-4 py-2">
              <p>Vous devez être âgé d'au moins 21 ans et posséder un permis de conduire valide depuis au moins 3 ans.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border rounded-lg mb-2 shadow-sm">
            <AccordionTrigger className="px-4 py-2 hover:bg-gray-50 rounded-t-lg">Documents requis</AccordionTrigger>
            <AccordionContent className="px-4 py-2">
              <p>Pour louer un véhicule, vous devez présenter :</p>
              <ul className="list-disc pl-5 mt-2">
                <li>Votre permis de conduire</li>
                <li>Une pièce d'identité valide</li>
                <li>Un justificatif de domicile de moins de 3 mois</li>
                <li>Une carte bancaire au nom du conducteur principal</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border rounded-lg mb-2 shadow-sm">
            <AccordionTrigger className="px-4 py-2 hover:bg-gray-50 rounded-t-lg">Assurance et garanties</AccordionTrigger>
            <AccordionContent className="px-4 py-2">
              <p>Tous nos véhicules sont assurés tous risques. Des options supplémentaires sont disponibles :</p>
              <ul className="list-disc pl-5 mt-2">
                <li>Réduction de franchise</li>
                <li>Protection du conducteur</li>
                <li>Assistance 24/7</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4" className="border rounded-lg mb-2 shadow-sm">
            <AccordionTrigger className="px-4 py-2 hover:bg-gray-50 rounded-t-lg">Kilométrage et carburant</AccordionTrigger>
            <AccordionContent className="px-4 py-2">
              <p>Le kilométrage est illimité. Le véhicule doit être rendu avec le même niveau de carburant qu'au départ.</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5" className="border rounded-lg mb-2 shadow-sm">
            <AccordionTrigger className="px-4 py-2 hover:bg-gray-50 rounded-t-lg">Annulation et modification</AccordionTrigger>
            <AccordionContent className="px-4 py-2">
              <p>Les réservations peuvent être modifiées ou annulées jusqu'à 24h avant le début de la location. Des frais peuvent s'appliquer.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}