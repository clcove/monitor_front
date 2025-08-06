type ListProps = {
  data: {
    index: number;
    image: string;
    total: string;
    temp: string;
    write: string;
    read: string;
    usage: string;
  };
};

const List = ({ data }: ListProps) => {
  const { index, image, total, temp, write, read, usage } = data;

  return (
    <div className="flex items-center gap-2 border-b text-white px-6 py-3 border-e-black">
      <span className="w-6">{index + 1}</span>
      {/* <img className="h-10 w-10 rounded object-cover" src={image} alt="disk" /> */}
      <div className="flex-1 pl-4 font-[600]">
        <h4 className="font-bold text-sm">{total}</h4>
        <div className="flex flex-wrap gap-y-1 mt-1 text-sm">
          <div className="flex-1 pr-4">
            <span className="text-white">温度：</span>
            <span className="text-white">{temp}</span>
          </div>
          <div className="flex-1 pr-4">
            <span className="text-white">繁忙度：</span>
            <span className="text-white">{usage}</span>
          </div>
          <div className="flex-1 pr-4">
            <span className="text-white">读取：</span>
            <span className="text-white">{read}</span>
          </div>
          <div className="flex-1 pr-4">
            <span className="text-white">写入：</span>
            <span className="text-white">{write}</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default List; // ✅ 防止 List 项不必要更新
