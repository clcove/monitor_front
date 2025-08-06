import React, { useRef, useEffect, useState } from "react";
import { throttle } from "lodash-es";

interface FixedAspectRatioProps {
  width?: number;
  height?: number;
  maxWidth?: number; // 最大宽度，用于控制缩放范围
  children?: React.ReactNode;
}

const FixedAspectRatio: React.FC<FixedAspectRatioProps> = (props) => {
  const {
    width = 1920,
    height = 1080,
    maxWidth = 1920,
    children,
  } = props;

  const [globalScale, setGlobalScale] = useState(1); // 整体缩放比例
  const [canvasScale, setCanvasScale] = useState(1); // 内容宽高比缩放
  const [calcWidth, setCalcWidth] = useState(width);

  const containerRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef<HTMLElement | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const handleResize = throttle(
    () => {
      if (!parentRef.current) return;

      const parentWidth = parentRef.current.offsetWidth;
      const parentHeight = parentRef.current.offsetHeight;

      const scaleWidth = parentWidth / width;
      const scaleHeight = parentHeight / height;
      const minScale = Math.min(scaleWidth, scaleHeight);

      setGlobalScale(minScale);

      let finalWidth = width;
      if (maxWidth > width && scaleWidth > scaleHeight) {
        // 当宽度超出且是宽度主导时，限制最大宽度
        finalWidth = Math.min(
          width / scaleHeight,
          parentWidth / scaleHeight,
          maxWidth
        );
      }

      setCalcWidth(finalWidth);
      setCanvasScale(finalWidth / width);
    },
    500,
    { leading: false }
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 获取父元素
    parentRef.current = (container.parentElement as HTMLElement) || null;

    if (parentRef.current) {
      resizeObserverRef.current = new ResizeObserver(handleResize);
      resizeObserverRef.current.observe(parentRef.current);
    }

    // 初次计算
    handleResize();

    return () => {
      if (parentRef.current && resizeObserverRef.current) {
        resizeObserverRef.current.unobserve(parentRef.current);
      }
      resizeObserverRef.current?.disconnect();
      handleResize.cancel(); // 清除 throttle 的 pending 调用
    };
  }, [handleResize]);

  return (
    <div
      ref={containerRef}
      className="fixed-aspect-ratio"
      style={{
        transformOrigin: "0 0",
        position: "absolute",
        left: "50%",
        top: 0,
        transition: "transform 0.2s",
        width: `${calcWidth}px`,
        height: `${height}px`,
        transform: `scale(${globalScale}) translateX(-50%)`,
      }}
    >
      {children}
    </div>
  );
};

export default FixedAspectRatio;
