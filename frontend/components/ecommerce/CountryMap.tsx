"use client";

import React from "react";
/**
 * CountryMap — diganti dari @react-jvectormap/core (tidak kompatibel React 18+)
 * ke visualisasi bar chart horizontal per negara menggunakan ApexCharts
 * yang sudah dipakai di project ini.
 */
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="h-[180px] flex items-center justify-center">
      <div className="w-6 h-6 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
    </div>
  ),
});

interface CountryMapProps {
  mapColor?: string;
}

const CountryMap: React.FC<CountryMapProps> = () => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: "Outfit, sans-serif",
      toolbar: { show: false },
      animations: { enabled: true, speed: 600 },
      background: "transparent",
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "55%",
        borderRadius: 6,
        borderRadiusApplication: "end",
        distributed: true,
      },
    },
    colors: ["#465FFF", "#6B7FFF", "#8E9FFF", "#B3BFFF", "#D0D5FF"],
    dataLabels: {
      enabled: true,
      formatter: (val: number) => `${val}%`,
      style: { fontSize: "11px", fontWeight: 600, colors: ["#fff"] },
      offsetX: -6,
    },
    legend: { show: false },
    xaxis: {
      categories: ["USA", "France", "Germany", "Japan", "Indonesia"],
      labels: {
        style: { fontSize: "12px", colors: "#9CA3AF" },
        formatter: (val: string) => `${val}%`,
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { fontSize: "12px", fontWeight: 600, colors: "#374151" },
      },
    },
    grid: {
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: false } },
      borderColor: "#F3F4F6",
    },
    tooltip: {
      y: { formatter: (val: number) => `${val}% customers` },
      theme: "light",
    },
  };

  const series = [
    {
      name: "Share",
      data: [79, 23, 18, 14, 9],
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="bar"
      height={200}
    />
  );
};

export default CountryMap;
