const Card = (props: {
  data: {
    title: string;
    description: string;
    occupation: number;
    footer1: string;
    footer2: string;
    footer3: string;
  };
}) => {
  const { title, description, occupation, footer1, footer2, footer3 } =
    props.data;
  return (
    <div className="flex-1 flex rounded-[8px] bg-[#fff] card justify-between flex-col">
      <div className="flex w-full border-b border-b-[#f0f0f0]">
        <div className=""></div>

        <div className="flex flex-col pl-[24px] pr-[24px] pt-[12px] pb-[12px]">
          <div className="font-bold text-[16px]">{title}</div>

          <div className="text-[14px] text-[rgba(0,0,0,0.45)]">
            {description}
          </div>
        </div>
      </div>

      <div className="text-[62px] text-right p-[24px]">{occupation} %</div>

      <div className="flex w-full border-t border-t-[#f0f0f0] h-[45px] ">
        <div className="mt-[12px] mb-[12px] flex-1 text-center text-[rgba(0,0,0,0.45)] text-[14px] border-e border-e-[#f0f0f0]">
          {footer1}
        </div>
        <div className="mt-[12px] mb-[12px] flex-1 text-center text-[rgba(0,0,0,0.45)] text-[14px] border-e border-e-[#f0f0f0]">
          {footer2}
        </div>
        <div className="mt-[12px] mb-[12px] flex-1 text-center text-[rgba(0,0,0,0.45)] text-[14px] ">
          {footer3}
        </div>
      </div>
    </div>
  );
};

export default Card;
