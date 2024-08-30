interface ReceiverMessageProps {
  name: string;
  message: string;
  pic: string;
  time: string;
}

const ReceiverMessage = ({
  name,
  message,
  pic,
  time,
}: ReceiverMessageProps) => {
  return (
    <div className="flex justify-end gap-2.5 pb-2 ">
      <div className="">
        <div className="mb-2 grid">
          <h5 className="pb-1 text-right text-sm font-semibold leading-snug">
            You
          </h5>
          <div className="ml-auto rounded px-3 py-2">
            <h2 className="text-sm font-normal leading-snug">{message}</h2>
          </div>
          <div className="ml-auto inline-flex w-4/5 items-center justify-start">
            <h3 className="py-1 text-xs font-normal leading-4">{time}</h3>
          </div>
        </div>
      </div>
      <img src={pic} alt="Hailey image" className="h-11 w-10" />
    </div>
  );
};

export default ReceiverMessage;
