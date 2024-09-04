import Image from "next/image";

const LoadingCircle = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 backdrop-blur-sm z-50">
      <Image
        src="/assets/icons/LoadingIcon.svg"
        alt="Loading..."
        width={100}
        height={100}
      />
    </div>
  );
};

export default LoadingCircle;
