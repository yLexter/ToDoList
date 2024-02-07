import { Utils } from "@/entities/classes";
import { ITask } from "@/entities/interfaces";
import React from "react";

interface IPropTabWeek {
   tasks: ITask[];
}

export default function TabWeek({ tasks }: IPropTabWeek) {
   const timesNonRepetating = tasks.reduce((acc, task) => {
      const time = Utils.getTimeFormatted(task.date);

      if (acc.has(time)) {
         acc.get(time)?.push(task);
      } else {
         acc.set(time, [task]);
      }

      return acc;
   }, new Map<String, ITask[]>());

   const rows = Array.from(timesNonRepetating.entries());

   return (
      <table>
         <thead>
            <tr>
               <th></th>
               {Utils.daysOfWeek.map((day) => (
                  <th key={`HeadTable-${day.name}`}>{day.name}</th>
               ))}
            </tr>
         </thead>

         <tbody>
            {rows.map(([time, tasks]) => (
               <tr key={`TimeTable-${time}`}>
                  <th>{time}</th>

                  {Utils.daysOfWeek.map(({ name, day }) => {
                     return tasks.map((task) => {
                        if (task.date.getDay() === day)
                           return (
                              <th
                                 style={{
                                    backgroundColor: Utils.getRandomColor(),
                                 }}
                              >
                                 {task.content}
                              </th>
                           );

                        return <th></th>;
                     });
                  })}
               </tr>
            ))}
         </tbody>
      </table>
   );
}