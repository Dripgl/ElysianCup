// src/components/StatCard.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronUp, ChevronDown } from "lucide-react"; // Importa le icone per il trend

// Definisci i tipi delle props per StatCard
interface StatCardProps {
  title: string;
  value: string;
  icon: React.ElementType; // Accetta un componente React come icona (es. Trophy, Users)
  description: string;
  trend?: { // Il trend è opzionale
    value: number;
    isPositive: boolean;
  };
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, description, trend }) => {
  return (
    <Card className="bg-gray-800 text-white border-green-700/40 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-300">{title}</CardTitle>
        <Icon className="h-5 w-5 text-green-400" /> {/* Usa l'icona passata come prop */}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-green-300">{value}</div>
        <p className="text-xs text-gray-400">{description}</p>
        {trend && (
          <div className="flex items-center text-xs mt-2">
            {trend.isPositive ? (
              <ChevronUp className="h-4 w-4 text-green-500 mr-1" />
            ) : (
              <ChevronDown className="h-4 w-4 text-red-500 mr-1" />
            )}
            <span className={trend.isPositive ? "text-green-500" : "text-red-500"}>
              {trend.isPositive ? '+' : '-'}{trend.value}%
            </span>
            <span className="text-gray-400 ml-1">rispetto al mese scorso</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};