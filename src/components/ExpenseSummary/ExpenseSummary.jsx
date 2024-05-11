import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";

// const data = [
//   { name: "Food", value: 150 },
//   { name: "Entertainment", value: 350 },
//   { name: "Travel", value: 50 },
// ];

const COLORS = ["#A000FF", "#FF9304", "#FDE006"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ExpenseSummary({ data }) {
  let totalFood = 0;
  let totalTravel = 0;
  let totalEnter = 0;
  if (data) {
    data.forEach((elem) => {
      if (elem.category === "Food") {
        totalFood += elem.amount;
      }
      if (elem.category === "Travel") {
        totalTravel += elem.amount;
      }
      if (elem.category === "Entertainment") {
        totalEnter += elem.amount;
      }
    });
  }
  const chartData = [
    { name: "Food", value: totalFood },
    { name: "Entertainment", value: totalEnter },
    { name: "Travel", value: totalTravel },
  ];
  // const newData = data.map((elem) => {
  //   let totalFood = 0;
  //   if (elem.category === "Food") {
  //     totalFood += elem.amount;
  //     return {
  //       name: elem.category,
  //       value: totalFood,
  //     };
  //   }
  //   let totalTravel = 0;
  //   if (elem.category === "Travel") {
  //     totalTravel += elem.amount;
  //     return {
  //       name: elem.category,
  //       value: totalTravel,
  //     };
  //   }
  //   let totalEnter = 0;
  //   if (elem.category === "Entertainment") {
  //     totalEnter += elem.amount;
  //     return {
  //       name: elem.category,
  //       value: totalEnter,
  //     };
  //   }
  // });
  // console.log(newData);
  // const chartData = data.map((item) => {
  //   return {
  //     name: item.category,
  //     value: item.amount,
  //   };
  // });
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
  //   }
}
