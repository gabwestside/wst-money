"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoIcon } from "lucide-react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Props = {
  userName: string;
};

const SummaryCard = ({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className={`text-2xl font-semibold ${color}`}>
        R$ {value.toLocaleString("pt-BR")}
      </p>
    </CardContent>
  </Card>
);

export default function DashboardClient({ userName }: Props) {
  const data = {
    incomes: 5693.61,
    essential: 1481.74,
    nonEssential: 352.15,
    investments: 948.2,
  };

  const transactions = [
    { id: 1, type: "Receita", description: "Salário", amount: 3500 },
    { id: 2, type: "Despesa", description: "Aluguel", amount: -1200 },
    { id: 3, type: "Despesa", description: "Mercado", amount: -450 },
  ];

  const chartData = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Receita",
        data: [3200, 3100, 3500, 3000, 3400, 3600],
        backgroundColor: "rgba(34,197,94,0.8)",
      },
      {
        label: "Despesa",
        data: [-1200, -900, -1100, -1300, -1250, -1000],
        backgroundColor: "rgba(239,68,68,0.8)",
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <InfoIcon size={16} strokeWidth={2} />
        <h1 className="text-2xl font-bold">Olá, {userName} 👋</h1>
      </div>
      <p className="text-muted-foreground">Resumo financeiro do mês</p>

      {/* Cards resumo */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Total de Entradas" value={data.incomes} color="text-green-600" />
        <SummaryCard title="Essenciais (50%)" value={data.essential} color="text-red-600" />
        <SummaryCard title="Não Essenciais (30%)" value={data.nonEssential} color="text-yellow-600" />
        <SummaryCard title="Investimentos (20%)" value={data.investments} color="text-blue-600" />
      </div>

      {/* Cards extra */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border border-muted p-4 rounded-lg shadow">
          <p className="text-sm text-muted-foreground">Saldo Atual</p>
          <h2 className="text-xl font-bold text-green-600">R$ 1.850,00</h2>
        </div>
        <div className="border border-muted p-4 rounded-lg shadow">
          <p className="text-sm text-muted-foreground">Receita</p>
          <h2 className="text-xl font-bold text-green-500">R$ 3.500,00</h2>
        </div>
        <div className="border border-muted p-4 rounded-lg shadow">
          <p className="text-sm text-muted-foreground">Despesas</p>
          <h2 className="text-xl font-bold text-red-500">R$ 1.650,00</h2>
        </div>
      </div>

      {/* Gráfico */}
      <div className="border border-muted p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Visão Mensal</h3>
        <Bar data={chartData} />
      </div>

      {/* Lista de transações */}
      <div className="border border-muted p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Últimas Transações</h3>
        <ul className="divide-y divide-foreground">
          {transactions.map((t) => (
            <li key={t.id} className="flex justify-between py-2">
              <span>{t.description}</span>
              <span
                className={`font-semibold ${
                  t.amount > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {t.amount > 0 ? "+" : ""}
                R$ {t.amount}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
