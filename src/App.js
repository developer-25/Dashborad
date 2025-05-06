import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import "./App.css";

const mockData = Array.from({ length: 60 }, (_, i) => ({
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ["Admin", "User", "Moderator"][i % 3],
  joinDate: `2023-${String((i % 12) + 1).padStart(2, "0")}-${String(
    (i % 28) + 1
  ).padStart(2, "0")}`,
  revenue: Math.floor(Math.random() * 2000) + 500,
}));

const columns = [
  { Header: "Name", accessor: "name" },
  { Header: "Email", accessor: "email" },
  { Header: "Role", accessor: "role" },
  { Header: "Join Date", accessor: "joinDate" },
  { Header: "Revenue ($)", accessor: "revenue" },
];

function GlobalFilter({ filter, setFilter }) {
  return (
    <div className="mb-8 w-full md:w-1/3 mx-auto">
      <input
        type="text"
        placeholder="🔍 Search users..."
        value={filter || ""}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full px-5 py-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all"
      />
    </div>
  );
}

function DataTable() {
  const data = useMemo(() => mockData, []);
  const cols = useMemo(() => columns, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
    gotoPage,
  } = useTable(
    { columns: cols, data, initialState: { pageSize: 10 } },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter } = state;

  return (
    <div className="px-6 py-10 bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 text-gray-800 font-sans min-h-screen">
      <h1 className="text-4xl font-extrabold text-center mb-10 tracking-tight text-white">
        🚀 User Insights Dashboard 🚀
      </h1>

      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

      <div className="overflow-auto shadow-xl rounded-xl border-4 border-gray-400 mb-10 bg-white">
        <table {...getTableProps()} className="min-w-full text-sm text-gray-800">
          <thead className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-4 text-left cursor-pointer hover:text-indigo-200 transition-all"
                  >
                    {column.render("Header")}{" "}
                    {column.isSorted ? (column.isSortedDesc ? "🔽" : "🔼") : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="hover:bg-indigo-50 border-b transition-all"
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="px-6 py-3">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination with page numbers */}
      <div className="flex flex-wrap justify-center items-center gap-3 mt-6 mb-16">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-40 transition-all"
        >
          ⬅ Previous
        </button>

        {Array.from({ length: Math.ceil(data.length / 10) }).map((_, i) => (
          <button
            key={i}
            onClick={() => gotoPage(i)}
            className={`py-2 px-4 rounded font-semibold border transition-all ${
              state.pageIndex === i
                ? "bg-purple-700 text-white"
                : "bg-white text-purple-700 border-purple-500 hover:bg-purple-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded disabled:opacity-40 transition-all"
        >
          Next ➡
        </button>
      </div>

      {/* Revenue Bar Chart */}
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        📊 Total Revenue of All Users
      </h2>
      <div className="w-full h-[500px] mb-16 rounded-lg bg-gradient-to-r from-indigo-700 to-purple-800">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="revenue" fill="#c084fc" name="Revenue ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart - Role Distribution */}
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🧑‍💼 Role Distribution of Users
      </h2>
      <div className="w-full h-[500px] mb-16 rounded-lg bg-gradient-to-r from-indigo-700 to-purple-800">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={[
                { name: "Admin", value: mockData.filter((user) => user.role === "Admin").length },
                { name: "User", value: mockData.filter((user) => user.role === "User").length },
                { name: "Moderator", value: mockData.filter((user) => user.role === "Moderator").length },
              ]}
              dataKey="value"
              nameKey="name"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {["#c084fc", "#818cf8", "#f472b6"].map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart - Revenue Growth Over Time */}
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        📈 Revenue Growth Over Time
      </h2>
      <div className="w-full h-[500px] mb-16 rounded-lg bg-gradient-to-r from-indigo-700 to-purple-800">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="joinDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="revenue" stroke="#c084fc" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Area Chart - Users Joining Over Time */}
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        🌱 Users Joining Over Time
      </h2>
      <div className="w-full h-[500px] mb-16 rounded-lg bg-gradient-to-r from-indigo-700 to-purple-800">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis dataKey="joinDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="revenue" fill="#c084fc" stroke="#9333ea" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function App() {
  return <DataTable />;
}
