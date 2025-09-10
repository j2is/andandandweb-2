import { useRef, useEffect } from "react";
import scaleCanvas from "./scaleCanvas";

const useCanvas = (draw, options = {}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext(options.context || "2d");
    resize();

    let frameCount = 0;
    let animationFrameId;
    const render = () => {
      frameCount++;
      if ("predraw" in options) {
        options.predraw(ctx, canvas);
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      draw(ctx, frameCount);
      if ("postdraw" in options) {
        options.postdraw(ctx, canvas);
      }
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  const resize = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext(options.context || "2d");
    scaleCanvas(canvas, ctx);
  };

  useEffect(() => {
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return canvasRef;
};
export default useCanvas;
