import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function DashboardChart({ students }) {
  if (!students) return null;

  const chartData = students.map((student) => ({
    name: student.name,
    percentage: student.percentage,
  }));

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl border border-cyan-500/20 rounded-3xl p-8 shadow-2xl">
      <h2 className="text-2xl font-bold mb-6 text-white">
        Student Performance Analytics
      </h2>

      <ResponsiveContainer width="100%" height={350}>
  <BarChart data={chartData}>

    <defs>
      <linearGradient
        id="colorGradient"
        x1="0"
        y1="0"
        x2="0"
        y2="1"
      >
        <stop offset="0%" stopColor="#38bdf8" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>

    <XAxis
      dataKey="name"
      tick={{ fill: "#cbd5e1" }}
    />

    <YAxis
      tick={{ fill: "#cbd5e1" }}
    />

    <Tooltip
      contentStyle={{
        backgroundColor: "#0f172a",
        border: "1px solid #06b6d4",
        borderRadius: "12px",
        color: "#fff",
      }}
      labelStyle={{
        color: "#fff",
      }}
      itemStyle={{
        color: "#22d3ee",
        fontWeight: "bold",
      }}
    />

    <Bar
      dataKey="percentage"
      fill="url(#colorGradient)"
      radius={[12, 12, 0, 0]}
    />
  </BarChart>
</ResponsiveContainer>
    </div>
  );
}

export default DashboardChart;