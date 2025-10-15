import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Dropdown, Avatar, Badge, Chart } from "../components/ui";
import {
  GridIcon,
  ShoppingBagIcon,
  UsersIcon,
  FolderIcon,
  ChatBubbleIcon,
  CogIcon,
  HeadsetIcon,
  GiftIcon,
  LogoutIcon,
  HomeIcon,
  DollarIcon,
  DocumentIcon,
  ShoppingCartIcon,
  PlusIcon,
  ChartPieIcon,
  ChartBarIcon,
  ArrowRightIcon,
} from "../components/icons";
import { signOut } from "../store/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  // State for dropdowns and interactions
  const [selectedShop, setSelectedShop] = useState("nannys-shop");
  const [salesPeriod, setSalesPeriod] = useState("this-week");
  const [customersPeriod, setCustomersPeriod] = useState("this-week");
  const [ordersPeriod, setOrdersPeriod] = useState("this-week");
  const [marketingPeriod, setMarketingPeriod] = useState("this-week");
  const [abandonedCartPeriod, setAbandonedCartPeriod] = useState("this-week");
  const [summaryMetric, setSummaryMetric] = useState("sales");
  const [summaryPeriod, setSummaryPeriod] = useState("last-7-days");

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/signin");
  };

  // Mock data - in a real app, this would come from API calls
  const dashboardData = {
    sales: { amount: "₦0.00", change: "+0.00%", volume: 0 },
    customers: {
      total: 0,
      change: "+0.00%",
      active: 0,
      activeChange: "+0.00%",
    },
    orders: { total: 0, pending: 0, completed: 0, completedChange: "+0.00%" },
    products: { total: 0, change: "+0.00%", active: 0, activeChange: "+0.00%" },
    abandonedCart: { percentage: "0%", change: "+0.00%", customers: 0 },
  };

  const shopOptions = [
    { value: "nannys-shop", label: "Nanny's Shop" },
    { value: "another-shop", label: "Another Shop" },
  ];

  const periodOptions = [
    { value: "this-week", label: "This Week" },
    { value: "last-week", label: "Last Week" },
    { value: "this-month", label: "This Month" },
    { value: "last-month", label: "Last Month" },
  ];

  const summaryMetricOptions = [
    { value: "sales", label: "Sales" },
    { value: "orders", label: "Orders" },
    { value: "customers", label: "Customers" },
  ];

  const summaryPeriodOptions = [
    { value: "last-7-days", label: "Last 7 Days" },
    { value: "last-30-days", label: "Last 30 Days" },
    { value: "last-90-days", label: "Last 90 Days" },
  ];

  const chartData = [
    { label: "Sept 10", value: 0 },
    { label: "Sept 11", value: 0 },
    { label: "Sept 12", value: 0 },
    { label: "Sept 13", value: 0 },
    { label: "Sept 14", value: 0 },
    { label: "Sept 15", value: 0 },
    { label: "Sept 16", value: 0 },
  ];

  const maxValue = Math.max(...chartData.map((d) => d.value), 100000);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 via-purple-500 to-yellow-500 rounded-lg">
              <ChartPieIcon className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">ShopPilot</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg"
          >
            <GridIcon className="h-5 w-5" />
            <span className="font-medium">Dashboard</span>
          </a>

          <a
            href="#"
            className="flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg group"
          >
            <div className="flex items-center space-x-3">
              <ShoppingBagIcon className="h-5 w-5" />
              <span>Orders</span>
            </div>
            <Badge variant="orange" size="sm">
              3
            </Badge>
          </a>

          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            <UsersIcon className="h-5 w-5" />
            <span>Customers</span>
          </a>

          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            <FolderIcon className="h-5 w-5" />
            <span>Inventory</span>
          </a>

          <a
            href="#"
            className="flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg group"
          >
            <div className="flex items-center space-x-3">
              <ChatBubbleIcon className="h-5 w-5" />
              <span>Conversations</span>
            </div>
            <Badge variant="orange" size="sm">
              18
            </Badge>
          </a>

          <a
            href="#"
            className="flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
          >
            <CogIcon className="h-5 w-5" />
            <span>Settings</span>
          </a>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 space-y-4 border-t border-gray-200">
          <button className="w-full flex items-center space-x-3 px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg">
            <HeadsetIcon className="h-5 w-5" />
            <span>Contact Support</span>
          </button>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-4 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <GiftIcon className="h-5 w-5" />
              <span className="font-medium">Free Gift Awaits You!</span>
            </div>
            <p className="text-sm opacity-90 mb-2">Upgrade your account</p>
            <ArrowRightIcon className="h-4 w-4" />
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center space-x-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogoutIcon className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <HomeIcon className="h-5 w-5 text-gray-500" />
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Dropdown
                options={shopOptions}
                value={selectedShop}
                onChange={setSelectedShop}
                className="w-40"
              />
              {/* <UserIcon className="h-6 w-6 text-gray-500" /> */}
              <Avatar src={user?.avatar} alt={user?.name || "User"} size="md" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sales Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Sales</h3>
                </div>
                <Dropdown
                  options={periodOptions}
                  value={salesPeriod}
                  onChange={setSalesPeriod}
                  className="w-32"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {dashboardData.sales.amount}
                  </span>
                  <span className="text-sm text-green-600">
                    {dashboardData.sales.change}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Volume {dashboardData.sales.volume}
                </p>
              </div>
            </Card>

            {/* Customers Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <UsersIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Customers
                  </h3>
                </div>
                <Dropdown
                  options={periodOptions}
                  value={customersPeriod}
                  onChange={setCustomersPeriod}
                  className="w-32"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {dashboardData.customers.total}
                  </span>
                  <span className="text-sm text-green-600">
                    {dashboardData.customers.change}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    Active {dashboardData.customers.active}
                  </span>
                  <span className="text-sm text-green-600">
                    {dashboardData.customers.activeChange}
                  </span>
                </div>
              </div>
            </Card>

            {/* Orders Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <ShoppingBagIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    All Orders
                  </h3>
                </div>
                <Dropdown
                  options={periodOptions}
                  value={ordersPeriod}
                  onChange={setOrdersPeriod}
                  className="w-32"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {dashboardData.orders.total}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    Pending {dashboardData.orders.pending}
                  </span>
                  <div className="flex items-center space-x-1">
                    <span className="text-gray-600">
                      Completed {dashboardData.orders.completed}
                    </span>
                    <span className="text-green-600">
                      {dashboardData.orders.completedChange}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Detailed Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Marketing Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Marketing
                </h3>
                <Dropdown
                  options={periodOptions}
                  value={marketingPeriod}
                  onChange={setMarketingPeriod}
                  className="w-32"
                />
              </div>
              <div className="flex items-center justify-center mb-4">
                <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
                  <span className="text-sm text-gray-500">No Data</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Acquisition</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Purchase</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Retention</span>
                </div>
              </div>
            </Card>

            {/* Products Card */}
            <Card className="p-6 bg-blue-600 text-white">
              <div className="flex items-center space-x-3 mb-4">
                <DocumentIcon className="h-6 w-6" />
                <h3 className="text-lg font-semibold">All Products</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold">
                    {dashboardData.products.total}
                  </span>
                  <span className="text-sm text-blue-200">
                    {dashboardData.products.change}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-blue-200">
                    Active {dashboardData.products.active}
                  </span>
                  <span className="text-sm text-blue-200">
                    {dashboardData.products.activeChange}
                  </span>
                </div>
              </div>
            </Card>

            {/* Abandoned Cart Card */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <ShoppingCartIcon className="h-6 w-6 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    Abandoned Cart
                  </h3>
                </div>
                <Dropdown
                  options={periodOptions}
                  value={abandonedCartPeriod}
                  onChange={setAbandonedCartPeriod}
                  className="w-32"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {dashboardData.abandonedCart.percentage}
                  </span>
                  <span className="text-sm text-green-600">
                    {dashboardData.abandonedCart.change}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Customers {dashboardData.abandonedCart.customers}
                </p>
              </div>
            </Card>

            {/* Recent Orders Card */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Orders
              </h3>
              <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingBagIcon className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">
                  No Orders Yet?
                </h4>
                <p className="text-sm text-gray-600 text-center mb-4">
                  Add products to your store and start selling to see orders
                  here.
                </p>
                <Button className="flex items-center space-x-2">
                  <PlusIcon className="h-4 w-4" />
                  <span>New Product</span>
                </Button>
              </div>
            </Card>
          </div>

          {/* Summary Chart */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Summary</h3>
              <div className="flex items-center space-x-4">
                <Dropdown
                  options={summaryMetricOptions}
                  value={summaryMetric}
                  onChange={setSummaryMetric}
                  className="w-32"
                />
                <Dropdown
                  options={summaryPeriodOptions}
                  value={summaryPeriod}
                  onChange={setSummaryPeriod}
                  className="w-32"
                />
              </div>
            </div>
            <Chart
              type="bar"
              className="h-64"
              data={{
                labels: chartData.map((d) => d.label),
                datasets: [
                  {
                    label: summaryMetric === "sales" ? "Sales" : summaryMetric,
                    data: chartData.map((d) => d.value),
                    backgroundColor: "rgba(59,130,246,0.6)",
                    borderColor: "rgba(59,130,246,1)",
                    borderWidth: 1,
                    borderRadius: 6,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (ctx) => `${ctx.parsed.y}`,
                    },
                  },
                },
                scales: {
                  x: {
                    grid: { display: false },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => value,
                    },
                  },
                },
              }}
            />
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
