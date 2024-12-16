import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 bg-gray-50 p-4 overflow-y-auto">{children}</main>
    </div>
  );
}
