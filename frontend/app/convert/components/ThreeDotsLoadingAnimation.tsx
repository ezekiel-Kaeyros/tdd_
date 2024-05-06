function ThreeDotsLoadingAnimation() {
  return (
    <div className="flex items-center justify-center space-x-2 ">
      <div className="bg-white   w-1.5 h-1.5 rounded-full animate-bounce blue-circle animation-delay-[0ms]"></div>
      <div className="bg-white  w-1.5 h-1.5 rounded-full animate-bounce green-circle animation-delay-[200ms]"></div>
      <div className="bg-white   w-1.5 h-1.5 rounded-full animate-bounce red-circle animation-delay-[400ms]"></div>
    </div>
  );
}

export default ThreeDotsLoadingAnimation;
