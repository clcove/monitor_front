import React, { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

// 注册模块
echarts.use([
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  CanvasRenderer,
]);

interface ChartData {
  sales?: number[];
  revenue?: number[];
}
const LineCharts: React.FC<{ data: ChartData }> = ({
  data,
}: {
  data: ChartData;
}) => {
  const chartRef = useRef(null);
  let chartInstance: echarts.ECharts | null = null;

  // 初始化图表
  useEffect(() => {
    const initChart = () => {
      // 防止重复初始化
      if (chartInstance && !chartInstance.isDisposed()) {
        chartInstance.dispose();
      }

      chartInstance = echarts.init(chartRef.current);
      // 初始配置（不包含数据）
      chartInstance.setOption({
        title: {
          text: "动态折线图",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["销量", "收入"],
          top: "bottom",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "销量",
            type: "line",
            smooth: true,
            symbol: "none",
            areaStyle: {},
            data: data?.sales || [120, 132, 101, 134, 90, 230, 210], // 使用传入数据或默认
          },
          {
            name: "收入",
            type: "line",
            symbol: "none",
            smooth: true,
            data: data?.revenue || [220, 182, 191, 234, 290, 330, 310],
          },
        ],
      });
    };

    initChart();

    // 窗口 resize 响应
    const handleResize = () => {
      chartInstance?.resize();
    };
    window.addEventListener("resize", handleResize);

    // 清理
    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartInstance && !chartInstance.isDisposed()) {
        chartInstance.dispose();
      }
    };
  }, []); // 只在挂载时初始化

  // 👇 专门用于监听数据变化并更新图表
  useEffect(() => {
    if (!chartInstance || chartInstance.isDisposed()) return;

    chartInstance.setOption({
      series: [
        {
          name: "销量",
          data: data?.sales || [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "收入",
          data: data?.revenue || [220, 182, 191, 234, 290, 330, 310],
        },
      ],
    });
  }, [chartInstance, data]); // ✅ 依赖 data，数据变化时自动更新

  return (
    <div className="w-full h-full">
      <div
        ref={chartRef}
        className="w-full h-full"
        style={{ height: "400px" }}
      ></div>
    </div>
  );
};

export default LineCharts;
