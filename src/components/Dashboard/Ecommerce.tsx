import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
// import MapOne from "../Maps/MapOne";
import { Eye as EyeIcon, ShoppingBag, ShoppingCart, Users } from 'lucide-react';
import statusData from '../../actions/dashboard/cardDataStatus'



const ECommerce: React.FC = () => {


  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 dark:text-slate-500">
        {
          statusData.map((item, key) => (
          <CardDataStats key={key} title={item.title} total={item.total} rate={item.rate} level={item.level}>
           {/* Render the icon directly */}
           {item.icon === 'EyeIcon' && <EyeIcon className="text-primary dark:text-white" />}
            {item.icon === 'ShoppingCart' && <ShoppingCart className="text-primary dark:text-white -scale-x-[1]" />}
            {item.icon === 'ShoppingBag' && <ShoppingBag className="text-primary dark:text-white" />}
            {item.icon === 'Users' && <Users className="text-primary dark:text-white" />}
          </CardDataStats>
          ))
        }

      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        {/* <MapOne /> */}
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default ECommerce;
