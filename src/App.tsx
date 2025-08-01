import { useEffect, useState } from "react";
import "./App.css";
// import Chart from "./components/Chart";
import type { SystemInfo } from "@/types/index";
import Card from "./components/Card";
import List from "./components/List";

function App() {
  const [data, setData] = useState<SystemInfo>({
    processor: {
      name: "",
      coreCount: "",
      clockSpeed: "",
      usage: 0,
      temp: "",
    },
    machine: {
      totalRam: "",
      clockSpeed: "",
      ramTypeOrOSBitDepth: "",
      usage: 0,
      swapAmount: "",
    },
    graphics: {
      name: "",
      memory: "",
      memoryUsage: "",
      usage: 0,
      clockSpeed: "",
    },
    storage: {
      mainStorage: "",
      total: "",
      usage: 0,
      diskCount: "",
      readAndWrite: "",
    },
    hardDisks: [],
    networks: [],
  });

  const getInfo = async () => {
    const response = await fetch("/dev/api/info");
    const data = await response.json();
    setData(data);
  };

  useEffect(() => {
    getInfo();
    const timer = setInterval(() => {
      getInfo();
    }, 2000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-white p-10 bg-[url(@/assets/loginBackGround.png)] bg-cover">
      <div className="flex w-full justify-between gap-4">
        <Card
          data={{
            title: "CPU",
            description: data.processor.name,
            occupation: data.processor.usage,
            footer1: data.processor.coreCount,
            footer2: data.processor.clockSpeed,
            footer3: data.processor.temp,
          }}
        />

        <Card
          data={{
            title: "内存",
            description: data.machine.ramTypeOrOSBitDepth,
            occupation: data.machine.usage,
            footer1: data.machine.totalRam,
            footer2: data.machine.clockSpeed,
            footer3: data.machine.swapAmount,
          }}
        />

        <Card
          data={{
            title: "GPU",
            description: data.graphics.name,
            occupation: data.graphics.usage,
            footer1: data.graphics.memory,
            footer2: data.graphics.clockSpeed,
            footer3: data.graphics.memoryUsage,
          }}
        />
      </div>

      <div className="flex w-full justify-between gap-4">
        <Card
          data={{
            title: "存储",
            description: data.storage.mainStorage,
            occupation: data.storage.usage,
            footer1: data.storage.total,
            footer2: data.storage.diskCount,
            footer3: data.storage.readAndWrite,
          }}
        />

        <div className="flex-1 rounded-[8px] bg-[#fff] card">
          <div className="flex w-full border-b border-b-[#f0f0f0]">
            <div className=""></div>

            <div className="flex flex-col pl-[24px] pr-[24px] pt-[12px] pb-[12px]">
              <div className="font-bold text-[16px]">硬盘</div>

              <div className="text-[14px] text-[rgba(0,0,0,0.45)]">
                我是硬盘的说明
              </div>
            </div>
          </div>

          <div className="overflow-y-auto h-[200px]">
            {data.hardDisks.map((item, index) => {
              return (
                <List
                  key={"list" + index}
                  data={{
                    index,
                    ...item,
                    image: "https://api.dicebear.com/7.x/miniavs/svg?seed=2",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
