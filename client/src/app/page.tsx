// app/page.tsx
import { getUsers } from "@/actions/user-actions";
import UserForm from "@/components/UserForm";
import UserList from "@/components/UserList";

export default async function HomePage() {
    let users: any = [];
    let error = "";

    try {
        users = await getUsers();
    } catch (err) {
        error =
            err instanceof Error
                ? err.message
                : "Không thể tải danh sách người dùng";
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
                        Quản lý người dùng
                    </h1>
                    <p className="text-gray-600 text-center">
                        Thêm, sửa, xóa và xem danh sách người dùng
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form thêm user */}
                    <div className="lg:col-span-1">
                        <UserForm />
                    </div>

                    {/* Danh sách users */}
                    <div className="lg:col-span-2">
                        {error ? (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                                {error}
                            </div>
                        ) : (
                            <UserList users={users} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
