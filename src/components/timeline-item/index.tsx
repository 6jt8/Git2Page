const TimelineItem = ({
  time,
  title,
  subtitle,
  link,
}: {
  time?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  link?: string;
}) => (
  <li className="mb-5 ml-4">
    <div
      className="absolute w-2 h-2 bg-base-300 rounded-full border border-base-300 mt-1.5"
      style={{ left: '-4.5px' }}
    />
    <div className="my-0.5 text-xs">{time}</div>
    <h3 className="font-semibold">{title}</h3>
    <div className="mb-4 font-normal">
      {link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {subtitle}
        </a>
      ) : (
        subtitle
      )}
    </div>
  </li>
);

export default TimelineItem;
