"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  {
    name: "Mon",
    pending: 4,
    inProgress: 7,
    completed: 5,
  },
  {
    name: "Tue",
    pending: 3,
    inProgress: 8,
    completed: 6,
  },
  {
    name: "Wed",
    pending: 5,
    inProgress: 9,
    completed: 7,
  },
  {
    name: "Thu",
    pending: 6,
    inProgress: 10,
    completed: 8,
  },
  {
    name: "Fri",
    pending: 4,
    inProgress: 11,
    completed: 9,
  },
  {
    name: "Sat",
    pending: 3,
    inProgress: 8,
    completed: 10,
  },
  {
    name: "Sun",
    pending: 2,
    inProgress: 6,
    completed: 11,
  },
]

export function TasksOverview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Tooltip />
        <Bar dataKey="pending" fill="#f97316" radius={[4, 4, 0, 0]} stackId="stack" />
        <Bar dataKey="inProgress" fill="#3b82f6" radius={[4, 4, 0, 0]} stackId="stack" />
        <Bar dataKey="completed" fill="#22c55e" radius={[4, 4, 0, 0]} stackId="stack" />
      </BarChart>
    </ResponsiveContainer>
  )
}
