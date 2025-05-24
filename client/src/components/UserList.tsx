"use client";

import { useState } from "react";
import { deleteUser, type User } from "../actions/user-actions";
import UserForm from "./UserForm";
import ConfirmModal from "./ConfirmModal";

interface UserListProps {
    users: User[];
}

export default function UserList({ users }: UserListProps) {
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<number | null>(null);
    const [message, setMessage] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState<User | null>(null);

    const handleDeleteClick = (user: User) => {
        setUserToDelete(user);
        setShowConfirmModal(true);
    };

    const handleConfirmDelete = async () => {
        if (!userToDelete) return;

        setLoading(userToDelete.id);
        setMessage("");

        try {
            const result = await deleteUser(userToDelete.id);
            setMessage(result.message);
        } catch (error) {
            setMessage("Có lỗi xảy ra khi xóa người dùng");
        } finally {
            setLoading(null);
            setShowConfirmModal(false);
            setUserToDelete(null);
        }
    };

    const handleCancelDelete = () => {
        setShowConfirmModal(false);
        setUserToDelete(null);
    };

    const handleEditSuccess = () => {
        setEditingUser(null);
        setMessage("Cập nhật thành công!");
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
                Danh sách người dùng
            </h2>

            {message && (
                <div
                    className={`p-3 rounded-md text-sm ${
                        message.includes("thành công")
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {message}
                </div>
            )}

            {editingUser && (
                <div className="mb-6">
                    <UserForm
                        user={editingUser}
                        onSuccess={handleEditSuccess}
                        onCancel={() => setEditingUser(null)}
                    />
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Tên
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {user.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {user.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {user.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <button
                                            onClick={() => setEditingUser(user)}
                                            className="text-blue-600 hover:text-blue-900 transition-colors"
                                            disabled={loading === user.id}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteClick(user)
                                            }
                                            disabled={loading === user.id}
                                            className="text-red-600 hover:text-red-900 disabled:opacity-50 transition-colors"
                                        >
                                            {loading === user.id
                                                ? "Đang xóa..."
                                                : "Xóa"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
                    <div className="p-6 text-center text-gray-500">
                        Chưa có người dùng nào
                    </div>
                )}
            </div>

            {/* Custom Confirm Modal */}
            <ConfirmModal
                isOpen={showConfirmModal}
                title="Xác nhận xóa người dùng"
                message={`Bạn có chắc chắn muốn xóa người dùng "${userToDelete?.name}"? Hành động này không thể hoàn tác.`}
                confirmText="Xóa"
                cancelText="Hủy"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                isLoading={loading === userToDelete?.id}
            />
        </div>
    );
}
