interface SenderMessageProps {
  name: string;
  message: string;
  pic: string;
  time: string;
}

const SenderMessage = ({ name, message, pic, time }: SenderMessageProps) => {
  return (
    <div className="grid pb-2">
      <div className="mb-2 flex gap-2.5">
        <img src={pic} alt="Shanay image" className="h-11 w-10" />
        <div className="grid">
          <h5 className="pb-1 text-sm font-semibold leading-snug">{name}</h5>
          <div>
            <div className="inline-flex items-center justify-start gap-3 rounded px-3.5 py-2">
              <h5 className="w-full text-sm font-normal leading-snug">
                {message}
              </h5>
            </div>
            <div className="mb-2.5 inline-flex items-center justify-end">
              <h6 className="py-1 text-xs font-normal leading-4">{time}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SenderMessage;
