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
  const { index, image, total, temp, write, read ,usage} = data;

  return (
    <div className="flex items-center gap-2 border-b border-b-gray-100 px-6 py-3">
      <span className="text-gray-600 w-6">{index + 1}</span>
      <img className="h-10 w-10 rounded object-cover" src={image} alt="disk" />
      <div className="flex-1 pl-4">
        <h4 className="font-bold text-sm">{total}</h4>
        <div className="flex flex-wrap gap-y-1 mt-1 text-sm">
          <div className="flex-1 pr-4">
            <span className="text-gray-500">温度：</span>
            <span className="text-gray-800">{temp}</span>
          </div>
          <div className="flex-1 pr-4">
            <span className="text-gray-500">读取：</span>
            <span className="text-gray-800">{read}</span>
          </div>
          <div className="flex-1 pr-4">
            <span className="text-gray-500">写入：</span>
            <span className="text-gray-800">{write}</span>
          </div>
           <div className="flex-1 pr-4">
            <span className="text-gray-500">繁忙度：</span>
            <span className="text-gray-800">{usage}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List; // ✅ 防止 List 项不必要更新
