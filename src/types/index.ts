interface NetworkInterface {
  name: string;
  model: string;
  displayName: string;
  upload: string;
  download: string;
  macaddr: string;
  ipv6addr: string[]; // IPv6 地址列表
  ipv4addr: string[]; // IPv4 地址列表
}

interface HardDisk {
  name: string;
  model: string;
  serial: string;
  total: string;
  usage: number; // 使用百分比 (0-100)
  read: string;
  write: string;
  theStorageSpaceYouBelongTo: string;
  temp: string;
}

interface Processor {
  name: string;
  coreCount: string; // 如 "4c/8t"
  clockSpeed: string; // 带单位，如 "1.7 GHz"
  usage: number; // 百分比
  temp: string; // 温度字符串，如 "55°C" 或 "null°C"
}

interface Machine {
  totalRam: string; // 如 "16 GB RAM"
  clockSpeed: string; // 内存频率
  ramTypeOrOSBitDepth: string; // 如 "DDR4"
  usage: number; // RAM 使用百分比
  swapAmount: string; // 交换空间大小
}

interface Graphics {
  name: string;
  memory: string; // 显存大小
  memoryUsage: string; // 显存使用量
  usage: number; // GPU 使用率百分比
  clockSpeed: string; // 核心频率
}

interface Storage {
  mainStorage: string; // 主存储设备名称
  total: string; // 总存储容量
  usage: number; // 存储使用百分比
  diskCount: string; // 磁盘数量描述，如 "2 Disks"
  readAndWrite: string; // 读写速度，可能为空
}

export interface SystemInfo {
  processor: Processor;
  machine: Machine;
  graphics: Graphics;
  storage: Storage;
  hardDisks: HardDisk[];
  networks: NetworkInterface[];
}
