import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Button, Card, Dropdown, Avatar, Badge, Input } from '../components/ui';
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
  PlusIcon,
  ChartPieIcon,
  ShoppingCartIcon,
  SearchIcon,
  FilterIcon,
  ShareIcon,
  TrashIcon,
  EditIcon,
  EyeIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '../components/icons';
import { signOut } from '../store/authSlice';

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  // State for dropdowns and interactions
  const [selectedShop, setSelectedShop] = useState("nannys-shop");
  const [ordersPeriod, setOrdersPeriod] = useState("this-week");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  // Mock data for orders
  const [orders, setOrders] = useState([
    {
      id: 1,
      customerName: "Janet Adebayo",
      orderDate: "12 Aug 2022 - 12:25 am",
      orderType: "Home Delivery",
      trackingId: "9348fjr73",
      orderTotal: 25000.00,
      action: "Completed",
      status: "Completed",
      email: "janet@example.com",
      phone: "+234 801 234 5678",
      address: "123 Lagos Street, Victoria Island",
      items: [
        { name: "Product A", quantity: 2, price: 12500.00 },
        { name: "Product B", quantity: 1, price: 0.00 }
      ]
    },
    {
      id: 2,
      customerName: "Samuel Johnson",
      orderDate: "12 Aug 2022 - 12:25 am",
      orderType: "Home Delivery",
      trackingId: "9348fjr74",
      orderTotal: 15000.00,
      action: "In-Progress",
      status: "In-Progress",
      email: "samuel@example.com",
      phone: "+234 802 345 6789",
      address: "456 Abuja Road, Garki",
      items: [
        { name: "Product C", quantity: 1, price: 15000.00 }
      ]
    },
    {
      id: 3,
      customerName: "Francis Doe",
      orderDate: "12 Aug 2022 - 12:25 am",
      orderType: "Pick Up",
      trackingId: "9348fjr75",
      orderTotal: 30000.00,
      action: "Pending",
      status: "Pending",
      email: "francis@example.com",
      phone: "+234 803 456 7890",
      address: "789 Port Harcourt Avenue",
      items: [
        { name: "Product D", quantity: 3, price: 10000.00 }
      ]
    },
    {
      id: 4,
      customerName: "Christian Dior",
      orderDate: "11 Aug 2022 - 3:45 pm",
      orderType: "Home Delivery",
      trackingId: "9348fjr76",
      orderTotal: 45000.00,
      action: "Completed",
      status: "Completed",
      email: "christian@example.com",
      phone: "+234 804 567 8901",
      address: "321 Kano Close, Sabon Gari",
      items: [
        { name: "Product E", quantity: 2, price: 22500.00 }
      ]
    },
    {
      id: 5,
      customerName: "Mary Johnson",
      orderDate: "11 Aug 2022 - 2:30 pm",
      orderType: "Pick Up",
      trackingId: "9348fjr77",
      orderTotal: 18000.00,
      action: "Canceled",
      status: "Canceled",
      email: "mary@example.com",
      phone: "+234 805 678 9012",
      address: "654 Ibadan Street, Bodija",
      items: [
        { name: "Product F", quantity: 1, price: 18000.00 }
      ]
    }
  ]);

  // Order summary data
  const orderSummary = {
    allOrders: orders.length,
    pending: orders.filter(o => o.status === 'Pending').length,
    completed: orders.filter(o => o.status === 'Completed').length,
    canceled: orders.filter(o => o.status === 'Canceled').length,
    returned: orders.filter(o => o.status === 'Returned').length,
    damaged: orders.filter(o => o.status === 'Damaged').length,
    abandonedCart: 20,
    customers: new Set(orders.map(o => o.customerName)).size
  };

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/signin");
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

  const statusOptions = [
    { value: "Pending", label: "Pending" },
    { value: "In-Progress", label: "In-Progress" },
    { value: "Completed", label: "Completed" },
    { value: "Canceled", label: "Canceled" },
    { value: "Returned", label: "Returned" },
    { value: "Damaged", label: "Damaged" },
  ];

  const actionOptions = [
    { value: "Pending", label: "Pending" },
    { value: "In-Progress", label: "In-Progress" },
    { value: "Completed", label: "Completed" },
    { value: "Canceled", label: "Canceled" },
    { value: "Returned", label: "Returned" },
    { value: "Damaged", label: "Damaged" },
  ];

  // AG Grid column definitions
  const columnDefs = [
    {
      headerName: '',
      field: 'select',
      checkboxSelection: true,
      headerCheckboxSelection: true,
      width: 50,
      pinned: 'left',
      suppressMenu: true,
      sortable: false,
      filter: false,
    },
    {
      headerName: 'Customer Name',
      field: 'customerName',
      width: 200,
      pinned: 'left',
    },
    {
      headerName: 'Order Date',
      field: 'orderDate',
      width: 180,
    },
    {
      headerName: 'Order Type',
      field: 'orderType',
      width: 150,
    },
    {
      headerName: 'Tracking ID',
      field: 'trackingId',
      width: 150,
    },
    {
      headerName: 'Order Total',
      field: 'orderTotal',
      width: 150,
      valueFormatter: (params) => `₦${params.value.toLocaleString()}`,
    },
    {
      headerName: 'Action',
      field: 'action',
      width: 150,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Pending', 'In-Progress', 'Completed', 'Canceled', 'Returned', 'Damaged']
      },
      editable: true,
    },
    {
      headerName: 'Status',
      field: 'status',
      width: 150,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Pending', 'In-Progress', 'Completed', 'Canceled', 'Returned', 'Damaged']
      },
      editable: true,
    },
    {
      headerName: 'Actions',
      field: 'actions',
      width: 120,
      cellRenderer: (params) => {
        const container = document.createElement('div');
        container.className = 'flex items-center space-x-2';
        
        const editBtn = document.createElement('button');
        editBtn.innerHTML = '✏️';
        editBtn.className = 'p-1 text-gray-400 hover:text-blue-600 transition-colors';
        editBtn.title = 'Edit';
        editBtn.onclick = () => handleEdit(params.data);
        
        const viewBtn = document.createElement('button');
        viewBtn.innerHTML = '👁️';
        viewBtn.className = 'p-1 text-gray-400 hover:text-green-600 transition-colors';
        viewBtn.title = 'View';
        viewBtn.onclick = () => handleView(params.data);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.className = 'p-1 text-gray-400 hover:text-red-600 transition-colors';
        deleteBtn.title = 'Delete';
        deleteBtn.onclick = () => handleDelete(params.data.id);
        
        container.appendChild(editBtn);
        container.appendChild(viewBtn);
        container.appendChild(deleteBtn);
        
        return container;
      },
      suppressMenu: true,
      sortable: false,
      filter: false,
    },
  ];

  // AG Grid default column definitions
  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    menuTabs: ['filterMenuTab', 'generalMenuTab'],
  };


  // Handle edit
  const handleEdit = (order) => {
    setEditingOrder(order);
    setShowCreateModal(true);
  };

  // Handle view
  const handleView = (order) => {
    console.log('View order:', order);
    // Implement view functionality
  };

  // Handle delete
  const handleDelete = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
    }
  };

  // Handle create new order
  const handleCreateOrder = () => {
    setEditingOrder(null);
    setShowCreateModal(true);
  };

  // Handle bulk actions
  const handleBulkAction = (action) => {
    if (selectedRows.length === 0) {
      alert('Please select orders first');
      return;
    }

    switch (action) {
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedRows.length} orders?`)) {
          setOrders(prevOrders => 
            prevOrders.filter(order => !selectedRows.includes(order.id))
          );
          setSelectedRows([]);
        }
        break;
      case 'updateStatus':
        // Implement bulk status update
        break;
      default:
        break;
    }
  };

  // Grid event handlers
  const onSelectionChanged = useCallback(() => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    const selectedIds = selectedNodes?.map(node => node.data.id) || [];
    setSelectedRows(selectedIds);
  }, []);

  const onGridReady = useCallback((params) => {
    gridRef.current = params.api;
  }, []);

  const onCellValueChanged = useCallback((event) => {
    const { data, colDef, newValue } = event;
    if (colDef.field === 'action' || colDef.field === 'status') {
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === data.id
            ? { ...order, [colDef.field]: newValue }
            : order
        )
      );
    }
  }, []);

  const gridRef = React.useRef();

  // Filter orders based on search term
  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders;
    return orders.filter(order =>
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [orders, searchTerm]);

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
          <Link
            to="/dashboard"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
              location.pathname === '/dashboard'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <GridIcon className="h-5 w-5" />
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link
            to="/orders"
            className={`flex items-center justify-between px-3 py-2 rounded-lg group ${
              location.pathname === '/orders'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <ShoppingBagIcon className="h-5 w-5" />
              <span>Orders</span>
            </div>
            <Badge variant="orange" size="sm">
              {orderSummary.allOrders}
            </Badge>
          </Link>

          <Link
            to="/customers"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
              location.pathname === '/customers'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <UsersIcon className="h-5 w-5" />
            <span>Customers</span>
          </Link>

          <Link
            to="/inventory"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
              location.pathname === '/inventory'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FolderIcon className="h-5 w-5" />
            <span>Inventory</span>
          </Link>

          <Link
            to="/conversations"
            className={`flex items-center justify-between px-3 py-2 rounded-lg group ${
              location.pathname === '/conversations'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <ChatBubbleIcon className="h-5 w-5" />
              <span>Conversations</span>
            </div>
            <Badge variant="orange" size="sm">
              18
            </Badge>
          </Link>

          <Link
            to="/settings"
            className={`flex items-center space-x-3 px-3 py-2 rounded-lg ${
              location.pathname === '/settings'
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <CogIcon className="h-5 w-5" />
            <span>Settings</span>
          </Link>
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
              <span className="text-gray-500">/</span>
              <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Dropdown
                options={shopOptions}
                value={selectedShop}
                onChange={setSelectedShop}
                className="w-40"
              />
              <Avatar src={user?.avatar} alt={user?.name || "User"} size="md" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Orders Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
            {/* All Orders */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <ShoppingBagIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">All Orders</span>
                </div>
                <Dropdown
                  options={periodOptions}
                  value={ordersPeriod}
                  onChange={setOrdersPeriod}
                  className="w-20 text-xs"
                />
              </div>
              <div className="text-2xl font-bold text-gray-900">{orderSummary.allOrders}</div>
            </Card>

            {/* Pending */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <ShoppingBagIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Pending</span>
                </div>
                <Dropdown
                  options={periodOptions}
                  value={ordersPeriod}
                  onChange={setOrdersPeriod}
                  className="w-20 text-xs"
                />
              </div>
              <div className="text-2xl font-bold text-gray-900">{orderSummary.pending}</div>
            </Card>

            {/* Completed */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <ShoppingBagIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Completed</span>
                </div>
                <Dropdown
                  options={periodOptions}
                  value={ordersPeriod}
                  onChange={setOrdersPeriod}
                  className="w-20 text-xs"
                />
              </div>
              <div className="text-2xl font-bold text-gray-900">{orderSummary.completed}</div>
            </Card>

            {/* Canceled */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <ShoppingBagIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Canceled</span>
                </div>
                <Dropdown
                  options={periodOptions}
                  value={ordersPeriod}
                  onChange={setOrdersPeriod}
                  className="w-20 text-xs"
                />
              </div>
              <div className="text-2xl font-bold text-gray-900">{orderSummary.canceled}</div>
            </Card>

            {/* Returned */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <ShoppingBagIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Returned</span>
                </div>
                <Dropdown
                  options={periodOptions}
                  value={ordersPeriod}
                  onChange={setOrdersPeriod}
                  className="w-20 text-xs"
                />
              </div>
              <div className="text-2xl font-bold text-gray-900">{orderSummary.returned}</div>
            </Card>

            {/* Damaged */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <ShoppingBagIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Damaged</span>
                </div>
                <Dropdown
                  options={periodOptions}
                  value={ordersPeriod}
                  onChange={setOrdersPeriod}
                  className="w-20 text-xs"
                />
              </div>
              <div className="text-2xl font-bold text-gray-900">{orderSummary.damaged}</div>
            </Card>

            {/* Abandoned Cart */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <ShoppingCartIcon className="h-5 w-5 text-red-600" />
                  <span className="text-sm font-medium text-red-600">Abandoned Cart</span>
                </div>
                <Dropdown
                  options={periodOptions}
                  value={ordersPeriod}
                  onChange={setOrdersPeriod}
                  className="w-20 text-xs"
                />
              </div>
              <div className="text-2xl font-bold text-gray-900">{orderSummary.abandonedCart}%</div>
            </Card>

            {/* Customers */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <UsersIcon className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Customers</span>
                </div>
                <Dropdown
                  options={periodOptions}
                  value={ordersPeriod}
                  onChange={setOrdersPeriod}
                  className="w-20 text-xs"
                />
              </div>
              <div className="text-2xl font-bold text-gray-900">{orderSummary.customers}</div>
            </Card>
          </div>

          {/* Create Order Button */}
          <div className="flex justify-end">
            <Button onClick={handleCreateOrder} className="flex items-center space-x-2">
              <PlusIcon className="h-4 w-4" />
              <span>Create a New Order</span>
            </Button>
          </div>

          {/* Customer Orders Table */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Customer Orders</h3>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    icon={SearchIcon}
                    className="w-64"
                  />
                </div>
                <Button variant="outline" className="flex items-center space-x-2">
                  <FilterIcon className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
                <Button variant="outline" className="flex items-center space-x-2">
                  <ShareIcon className="h-4 w-4" />
                  <span>Share</span>
                </Button>
                <Dropdown
                  options={[
                    { value: 'updateStatus', label: 'Update Status' },
                    { value: 'delete', label: 'Delete Selected' },
                    { value: 'export', label: 'Export' },
                  ]}
                  value=""
                  onChange={handleBulkAction}
                  className="w-32"
                  placeholder="Bulk Action"
                />
              </div>
            </div>

            {/* AG Grid */}
            <div className="ag-theme-alpine" style={{ height: '600px', width: '100%' }}>
              <AgGridReact
                ref={gridRef}
                rowData={filteredOrders}
                columnDefs={columnDefs}
                defaultColDef={defaultColDef}
                onSelectionChanged={onSelectionChanged}
                onGridReady={onGridReady}
                onCellValueChanged={onCellValueChanged}
                rowSelection="multiple"
                animateRows={true}
                pagination={true}
                paginationPageSize={10}
                suppressRowClickSelection={true}
              />
            </div>

            {/* Pagination Info */}
            <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span>Items per page:</span>
                <select className="border border-gray-300 rounded px-2 py-1">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span>1-{Math.min(10, filteredOrders.length)} of {filteredOrders.length} items</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>1 of {Math.ceil(filteredOrders.length / 10)} pages</span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ArrowLeftIcon className="h-4 w-4" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Card>
        </main>
      </div>

      {/* Create/Edit Order Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingOrder ? 'Edit Order' : 'Create New Order'}
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter customer name"
                    defaultValue={editingOrder?.customerName || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter email"
                    defaultValue={editingOrder?.email || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    placeholder="Enter phone number"
                    defaultValue={editingOrder?.phone || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Type
                  </label>
                  <Dropdown
                    options={[
                      { value: 'Home Delivery', label: 'Home Delivery' },
                      { value: 'Pick Up', label: 'Pick Up' },
                    ]}
                    value={editingOrder?.orderType || 'Home Delivery'}
                    onChange={() => {}}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Total
                  </label>
                  <Input
                    type="number"
                    placeholder="Enter order total"
                    defaultValue={editingOrder?.orderTotal || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <Dropdown
                    options={statusOptions}
                    value={editingOrder?.status || 'Pending'}
                    onChange={() => {}}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Enter delivery address"
                  defaultValue={editingOrder?.address || ''}
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingOrder ? 'Update Order' : 'Create Order'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;