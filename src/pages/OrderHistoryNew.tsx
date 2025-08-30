import React, { useState, useMemo } from "react";
import { Search, Filter, Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import type { Course } from "../types/course";

interface OrderItem {
  id: string;
  invoiceNumber: string;
  date: string;
  status: "Berhasil" | "Gagal" | "Pending";
  courses: Course[];
  totalAmount: number;
}

// Mock data untuk demonstrasi array operations
const mockOrders: OrderItem[] = [
  {
    id: "1",
    invoiceNumber: "INV-2024-001",
    date: "2024-01-15",
    status: "Berhasil",
    courses: [
      {
        id: "1",
        title: "Big 4 Auditor Financial Analyst",
        instructor: {
          name: "Jenna Ortega",
          job: "Senior Accountant", 
          company: "Harisenin",
          avatar: "images/avatar/avatar1.png"
        },
        price: { current: 250000 },
        rating: 4.5,
        reviewCount: 120,
        category: "Bisnis Manajemen",
        duration: "8 jam",
        image: "images/auditor_financial_analyst.jpg",
        description: "Course description"
      }
    ],
    totalAmount: 250000
  },
  {
    id: "2", 
    invoiceNumber: "INV-2024-002",
    date: "2024-01-10",
    status: "Pending",
    courses: [
      {
        id: "2",
        title: "Digital Marketing Strategy",
        instructor: {
          name: "Emma Stone",
          job: "Marketing Director",
          company: "Harisenin", 
          avatar: "images/avatar/avatar2.png"
        },
        price: { current: 300000 },
        rating: 4.8,
        reviewCount: 89,
        category: "Pemasaran",
        duration: "6 jam",
        image: "images/auditor_financial_analyst_2.jpg",
        description: "Course description"
      }
    ],
    totalAmount: 300000
  }
];

const OrderHistory: React.FC = () => {
  // State management dengan useState
  const [orders, setOrders] = useState<OrderItem[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Semua" | "Berhasil" | "Pending" | "Gagal">("Semua");
  const [dateRange, setDateRange] = useState<"7days" | "30days" | "90days" | "all">("all");
  const [sortBy, setSortBy] = useState<"date-desc" | "date-asc" | "amount-desc" | "amount-asc">("date-desc");

  // Array operations dengan useMemo untuk filtering dan sorting
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = orders.filter(order => {
      // Filter berdasarkan search query
      const matchesSearch = 
        order.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.courses.some(course => 
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Filter berdasarkan status
      const matchesStatus = statusFilter === "Semua" || order.status === statusFilter;

      // Filter berdasarkan date range
      const orderDate = new Date(order.date);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24));

      const matchesDateRange = (() => {
        switch (dateRange) {
          case "7days":
            return daysDiff <= 7;
          case "30days":
            return daysDiff <= 30;
          case "90days":
            return daysDiff <= 90;
          case "all":
          default:
            return true;
        }
      })();

      return matchesSearch && matchesStatus && matchesDateRange;
    });

    // Sorting dengan array methods
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "amount-desc":
          return b.totalAmount - a.totalAmount;
        case "amount-asc":
          return a.totalAmount - b.totalAmount;
        default:
          return 0;
      }
    });

    return sorted;
  }, [orders, searchQuery, statusFilter, dateRange, sortBy]);

  // Statistik menggunakan array reduce
  const orderStats = useMemo(() => {
    return orders.reduce((acc, order) => {
      acc.total += 1;
      acc.totalAmount += order.totalAmount;
      
      switch (order.status) {
        case "Berhasil":
          acc.completed += 1;
          break;
        case "Pending":
          acc.pending += 1;
          break;
        case "Gagal":
          acc.failed += 1;
          break;
      }
      
      return acc;
    }, {
      total: 0,
      completed: 0,
      pending: 0,
      failed: 0,
      totalAmount: 0
    });
  }, [orders]);

  // Event handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));
  };

  const handleStatusChange = (orderId: string, newStatus: OrderItem['status']) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusIcon = (status: OrderItem['status']) => {
    switch (status) {
      case "Berhasil":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "Pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "Gagal":
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: OrderItem['status']) => {
    switch (status) {
      case "Berhasil":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Gagal":
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Riwayat Pesanan</h1>
      
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">Total Pesanan</h3>
          <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Berhasil</h3>
          <p className="text-2xl font-bold text-green-600">{orderStats.completed}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <h3 className="text-sm font-medium text-gray-500">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">{orderStats.pending}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <h3 className="text-sm font-medium text-gray-500">Total Belanja</h3>
          <p className="text-2xl font-bold text-gray-900">Rp {orderStats.totalAmount.toLocaleString()}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Cari pesanan atau kelas..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C2B]"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C2B]"
          >
            <option value="Semua">Semua Status</option>
            <option value="Berhasil">Berhasil</option>
            <option value="Pending">Pending</option>
            <option value="Gagal">Gagal</option>
          </select>

          {/* Date Range */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C2B]"
          >
            <option value="all">Semua Waktu</option>
            <option value="7days">7 Hari Terakhir</option>
            <option value="30days">30 Hari Terakhir</option>
            <option value="90days">90 Hari Terakhir</option>
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF5C2B]"
          >
            <option value="date-desc">Terbaru</option>
            <option value="date-asc">Terlama</option>
            <option value="amount-desc">Harga Tertinggi</option>
            <option value="amount-asc">Harga Terendah</option>
          </select>
        </div>
      </div>

      {/* Results Info */}
      <div className="mb-4">
        <p className="text-gray-600">
          Menampilkan {filteredAndSortedOrders.length} dari {orders.length} pesanan
          {searchQuery && <span> untuk "{searchQuery}"</span>}
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredAndSortedOrders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{order.invoiceNumber}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(order.date).toLocaleDateString('id-ID')}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)} flex items-center gap-1`}>
                  {getStatusIcon(order.status)}
                  {order.status}
                </span>
                <button
                  onClick={() => handleDeleteOrder(order.id)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Hapus
                </button>
              </div>
            </div>

            {/* Courses in this order */}
            <div className="space-y-3 mb-4">
              {order.courses.map((course) => (
                <div key={course.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{course.title}</h4>
                    <p className="text-sm text-gray-500">{course.instructor.name}</p>
                    <p className="text-sm font-medium text-[#FF5C2B]">
                      Rp {course.price.current.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <div>
                <p className="text-lg font-semibold text-gray-900">
                  Total: Rp {order.totalAmount.toLocaleString()}
                </p>
              </div>
              {order.status === "Pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusChange(order.id, "Berhasil")}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm"
                  >
                    Konfirmasi
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id, "Gagal")}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
                  >
                    Batalkan
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredAndSortedOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-2">Tidak ada pesanan yang ditemukan</p>
          <p className="text-gray-400 text-sm">Coba ubah filter atau kata kunci pencarian</p>
          <button 
            onClick={() => {
              setSearchQuery("");
              setStatusFilter("Semua");
              setDateRange("all");
            }}
            className="mt-4 px-6 py-2 bg-[#FF5C2B] text-white rounded-lg hover:bg-[#e5511f] transition-colors"
          >
            Reset Filter
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
