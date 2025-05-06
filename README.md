🚀 User Insights Dashboard
A visually appealing and fully responsive User Insights Dashboard built with React, React Table, and Recharts. It displays tabular user data along with beautiful charts for data analysis.



📦 Features

🔍 Global search to filter users.

📊 Bar, Pie, Line, and Area charts for better data visualization.

📅 Pagination with page numbers.

⏫ Sortable table columns.

🎨 Gradient background and modern UI with Tailwind CSS.

⚡ Fully responsive and mobile-friendly.





🛠️ Tech Stack

React – Frontend library

React Table – For dynamic and interactive tables

Recharts – For drawing charts

Tailwind CSS – For styling

JavaScript (ES6+)





📁 Project Structure
bash
Copy
Edit
.
├── App.css              # Tailwind and custom styles
├── App.js               # Main component rendering the dashboard
├── index.js             # Entry point
├── README.md            # Project documentation




🚀 Getting Started

1. Clone the repository
bash
Copy
Edit
git clone https://github.com/your-username/user-dashboard.git
cd user-dashboard

2. Install dependencies
bash
Copy
Edit
npm install

3. Start the development server
bash
Copy
Edit
npm start
This will open the project in your browser at http://localhost:3000.





📊 Data Explanation
The dashboard uses mock data of 60 users with the following fields:

Name – Random user names (e.g., User 1)

Email – Email IDs like user1@example.com

Role – Can be "Admin", "User", or "Moderator"

Join Date – Randomly generated date (YYYY-MM-DD format)

Revenue – Random number between $500 and $2500





📈 Charts Overview
Bar Chart – Shows total revenue of all users.

Pie Chart – Shows the distribution of roles (Admin/User/Moderator).

Line Chart – Shows how revenue varies over time (by join date).

Area Chart – Highlights number of users joining over time (based on revenue for visual weight).




🧠 How It Works
React Table
The table is created using useTable from react-table.

It uses pagination, sorting, and global filtering.

Recharts
Uses BarChart, PieChart, LineChart, and AreaChart from recharts to display user data in a visually pleasing way.

Tailwind CSS
Used for all styling, layout, and responsive design.

Gradient backgrounds, rounded corners, and hover effects give the dashboard a modern feel.





🧪 Example Usage
Once you run the project:

Search for users by name/email/role using the search bar.

Click on table headers to sort by that column.

Use page numbers to browse through paginated data.

Scroll down to see different types of charts summarizing the user data.




📌 Customization Tips
To load real data, replace the mockData array with API data.

To change colors, update Tailwind classes or fill props in Recharts components.

To add more filters or columns, modify the columns array.

📄 License
This project is open-source and free to use.

🙋‍♂️ Author
Kalash Mantri


Email: kalashmantri2002@gmail.com