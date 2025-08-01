type Props = {
  data: {
    index: number;
    image: string;
    total: string;
    temp: string;
    write: string;
    read: string;
  };
};

const List = (props: Props) => {
  const { index, image, total, temp, write, read } = props.data;
  return (
    <div className="flex gap-2 items-center pt-[12px] pb-[12px] border-b border-b-[#f0f0f0] pl-[12px] ">
      <div>{index}</div>
      <div className="h-[53px]">
        <img className="w-full h-full" src={image} alt="" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="font-bold pl-[16px]">{total}</div>

        <div className="flex  flex-row flex-wrap w-full">
          <div className="flex  pr-[16px] pl-[16px] ">
            <div className="text-[14px] mr-[12px] text-[rgba(0,0,0,0.45)]">
              温度
            </div>
            <div className="text-[14px] text-[rgba(0,0,0,0.88)]">{temp}</div>
          </div>

          <div className="flex  pr-[16px] pl-[16px] ">
            <div className="text-[14px] mr-[12px] text-[rgba(0,0,0,0.45)]">
              读取
            </div>
            <div className="text-[14px] text-[rgba(0,0,0,0.88)]">{read}</div>
          </div>

          <div className="flex  pr-[16px] pl-[16px] ">
            <div className="text-[14px] mr-[12px] text-[rgba(0,0,0,0.45)]">
              写入
            </div>
            <div className="text-[14px] text-[rgba(0,0,0,0.88)]">{write}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
