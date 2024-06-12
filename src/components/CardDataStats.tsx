import React, { ReactNode, useState, useEffect } from "react";

interface CardDataStatsProps {
  title: string;
  total: number;
  rate: string;
  level?: boolean;
  children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  title,
  total,
  rate,
  level,
  children,
}) => {
  const [totalViews, setTotalViews] = useState(0); // Starting total views count

  useEffect(() => {
    // Increment total views smoothly
    const interval = setInterval(() => {
      setTotalViews((prevTotalViews) => {
        const difference = total - prevTotalViews;
        const step = Math.ceil(difference / 50); // Adjust the step for smoother animation
        const nextTotalViews = prevTotalViews + step;
        return nextTotalViews >= total ? total : nextTotalViews; // Limit the count to the total value
      });
    }, 20); // Increment every 20 milliseconds

    // Clear interval when component unmounts or when total views reach the total value
    return () => clearInterval(interval);
  }, [total]);

  // Function to format the total views
  const formatTotalViews = (views: number): string => {
    if (views >= 1000) {
      if (views >= 100000) {
        return (views / 1000).toFixed(0) + "K";
      } else {
        return (views / 1000).toFixed(1) + "K";
      }
    }
    return views.toString();
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
        {children}
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {formatTotalViews(totalViews)}
          </h4>
          <span className="text-sm font-medium">{title}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-medium ${
            level && "text-meta-3"
          } ${!level && "text-meta-5"} `}
        >
          {rate}

          {level && (
            <svg
              className="fill-meta-3"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.35716 2.47737L0.908974 5.82987L5.0443e-07 4.94612L5 0.0848689L10 4.94612L9.09103 5.82987L5.64284 2.47737L5.64284 10.0849L4.35716 10.0849L4.35716 2.47737Z"
                fill=""
              />
            </svg>
          )}
          {!level && (
            <svg
              className="fill-meta-5"
              width="10"
              height="11"
              viewBox="0 0 10 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.64284 7.69237L9.09102 4.33987L10 5.22362L5 10.0849L-8.98488e-07 5.22362L0.908973 4.33987L4.35716 7.69237L4.35716 0.0848701L5.64284 0.0848704L5.64284 7.69237Z"
                fill=""
              />
            </svg>
          )}
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
