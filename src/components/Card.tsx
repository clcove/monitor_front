type CardProps = {
  data: {
    title: string;
    description: string;
    occupation: number;
    footer1: string;
    footer2: string;
    footer3: string;
    color: string;
  };
};

const Card = ({ data }: CardProps) => {
  const { title, description, occupation, footer1, footer2, footer3, color } =
    data;

  return (
    <div className="flex-1 rounded-[20px] bg-white card flex flex-col justify-between border border-gray-100 shadow-sm h-[250px]"
      style={{
        backgroundColor: "#3c3c3c",
      }}>
      <div className=" px-6 py-3">
        {/* Header */}
        <div className="text-white font-[600]">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm ">{description}</p>
        </div>
        {/* Main Content */}
        <div className="text-5xl font-medium text-right p-6 text-white font-[600]">{occupation}%</div>
      </div>



      {/* Footer */}
      <div className="flex border-t border-t-black h-11">
        <div
          className="flex-1 border-e border-e-black flex items-center justify-center text-sm text-white font-[600]"
          style={{
            backgroundColor: color,
            borderBottomLeftRadius: "20px",
          }}
        >
          {footer1}
        </div>
        <div
          className="flex-1 border-e border-e-black flex items-center justify-center text-sm text-white font-[600]"
          style={{
            backgroundColor: color,
          }}
        >
          {footer2}
        </div>
        <div
          className="flex-1 flex items-center justify-center text-sm text-white font-[600]"
          style={{
            backgroundColor: color,
            borderBottomRightRadius: "20px",
          }}
        >
          {footer3}
        </div>
      </div>
    </div>
  );
};

export default Card; // ✅ 防止不必要的重渲染
