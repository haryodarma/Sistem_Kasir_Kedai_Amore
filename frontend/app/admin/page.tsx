"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ShoppingCart,
  Package,
  RefreshCw,
  AlertCircle,
  ReceiptText,
  CookingPot,
} from "lucide-react";
import { httpRequest } from "@/services/httpRequest";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);

  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Ganti URL ini dengan endpoint API kamu
      const response = await httpRequest.get(`/summary`, {
        method: "GET",
      });
      setData(response.data.data);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat mengambil data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-slate-600">Memuat data...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Dashboard Admin
            </h1>
            <p className="text-slate-600">Ringkasan data sistem</p>
          </div>
          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-sm hover:shadow"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
              <button
                onClick={fetchDashboardData}
                className="ml-4 text-sm underline hover:no-underline"
              >
                Coba lagi
              </button>
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Transaction Card */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-linear-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium text-white/90">
                  Total Transaksi
                </CardTitle>
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <ShoppingCart className="h-6 w-6" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-5xl font-bold mb-2">
                {data?.transaction || 0}
              </div>
              <CardDescription className="text-white/80">
                Transaksi tercatat dalam sistem
              </CardDescription>
            </CardContent>
          </Card>

          {/* Product Card */}
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-linear-to-br from-purple-500 to-purple-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-medium text-white/90">
                  Total Produk
                </CardTitle>
                <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Package className="h-6 w-6" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-5xl font-bold mb-2">
                {data?.product || 0}
              </div>
              <CardDescription className="text-white/80">
                Produk tersedia di katalog
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Akses cepat ke fitur utama</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => router.push("/admin/transactions")}
                className="p-6 rounded-xl bg-linear-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all border border-blue-200 flex flex-col items-center gap-3 group"
              >
                <div className="p-3 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
                <span className="font-medium text-slate-700">Transaksi</span>
              </button>

              <button
                onClick={() => router.push("/admin/raws")}
                className="p-6 rounded-xl bg-linear-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 transition-all border border-purple-200 flex flex-col items-center gap-3 group"
              >
                <div className="p-3 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <span className="font-medium text-slate-700">Produk</span>
              </button>

              <button
                onClick={() => router.push("/admin/transactions")}
                className="p-6 rounded-xl bg-linear-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 transition-all border border-green-200 flex flex-col items-center gap-3 group"
              >
                <div className="p-3 bg-green-500 rounded-lg group-hover:scale-110 transition-transform">
                  <CookingPot className="text-white" />
                </div>
                <span className="font-medium text-slate-700">
                  Raw Materials
                </span>
              </button>

              <button
                onClick={() => router.push("/admin/logs")}
                className="p-6 rounded-xl bg-linear-to-br from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200 transition-all border border-orange-200 flex flex-col items-center gap-3 group"
              >
                <div className="p-3 bg-orange-500 rounded-lg group-hover:scale-110 transition-transform">
                  <ReceiptText className="text-white" />
                </div>
                <span className="font-medium text-slate-700">Logs</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
