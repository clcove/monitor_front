import { useEffect, useState, useMemo } from "react";
import "./App.css";
import Card from "./components/Card";
import List from "./components/List";
import FixedAspectRatio from "./components/FixedAspectRatio";
import type { SystemInfo } from "@/types/index";

function App() {
  const [data, setData] = useState<SystemInfo | null>(null);

  const getInfo = async () => {
    try {
      const response = await fetch("/dev/api/info");
      if (!response.ok) throw new Error("Network response was not ok");
      const newData: SystemInfo = await response.json();
      setData(newData);
    } catch (err) {
      console.error("Failed to fetch system info:", err);
    }
  };

  useEffect(() => {
    getInfo();
    const timer = setInterval(getInfo, 2000);
    return () => clearInterval(timer);
  }, []);

  // 使用 useMemo 缓存派生数据，避免每次渲染重新计算
  const cardData = useMemo(() => {
    if (!data) return null;

    return {
      cpu: {
        title: "CPU",
        description: data.processor.name,
        occupation: data.processor.usage,
        footer1: data.processor.coreCount,
        footer2: data.processor.clockSpeed,
        footer3: data.processor.temp,
      },
      memory: {
        title: "内存",
        description: data.machine.ramTypeOrOSBitDepth,
        occupation: data.machine.usage,
        footer1: data.machine.totalRam,
        footer2: data.machine.clockSpeed,
        footer3: data.machine.swapAmount,
      },
      gpu: {
        title: "GPU",
        description: data.graphics.name,
        occupation: data.graphics.usage,
        footer1: data.graphics.memory,
        footer2: data.graphics.clockSpeed,
        footer3: data.graphics.memoryUsage,
      },
      storage: {
        title: "存储",
        description: data.storage.mainStorage,
        occupation: data.storage.usage,
        footer1: data.storage.total,
        footer2: data.storage.diskCount,
        footer3: data.storage.readAndWrite,
      },
    };
  }, [data]);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cover bg-[url(@/assets/loginBackGround.png)]">
        <p className="text-white text-lg">加载中...</p>
      </div>
    );
  }

  return (
    <FixedAspectRatio width={1920} height={1080}>
      <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-white p-10 bg-[url(@/assets/loginBackGround.png)] bg-cover">
        {/* 第一行：CPU / 内存 / GPU */}
        <div className="flex w-full justify-between gap-4">
          <Card data={cardData!.cpu} />
          <Card data={cardData!.memory} />
          <Card data={cardData!.gpu} />
        </div>

        {/* 第二行：存储 / 硬盘列表 */}
        <div className="flex w-full justify-between gap-4">
          <Card data={cardData!.storage} />

          <div className="flex-2 rounded-[8px] bg-white card">
            <div className="flex border-b border-b-[#f0f0f0] px-6 py-3">
              <div className="flex flex-col">
                <h3 className="font-bold text-[16px]">硬盘</h3>
                <p className="text-[14px] text-[rgba(0,0,0,0.45)]">
                  我是硬盘的说明
                </p>
              </div>
            </div>

            <div className="overflow-y-auto h-[200px]">
              {data.hardDisks.length > 0 ? (
                data.hardDisks.map((item, index) => (
                  <List
                    key={`disk-${index}`}
                    data={{
                      index,
                      image: `https://api.dicebear.com/7.x/miniavs/svg?seed=${
                        index + 1
                      }`,
                      total: item.total,
                      temp: item.temp || "-",
                      write: item.write,
                      read: item.read,
                      usage: item.usage,
                    }}
                  />
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  暂无硬盘信息
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </FixedAspectRatio>
  );
}

export default App;
