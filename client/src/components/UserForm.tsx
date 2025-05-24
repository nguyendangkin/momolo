// app/components/UserForm.tsx
"use client";

import { useState } from "react";
import {
    createUser,
    updateUser,
    type User,
    type CreateUserDto,
} from "../actions/user-actions";

interface UserFormProps {
    user?: User;
    onSuccess?: () => void;
    onCancel?: () => void;
}

export default function UserForm({ user, onSuccess, onCancel }: UserFormProps) {
    const [formData, setFormData] = useState<CreateUserDto>({
        name: user?.name || "",
        email: user?.email || "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const result = user
                ? await updateUser(user.id, formData)
                : await createUser(formData);

            setMessage(result.message);

            if (result.success) {
                if (!user) {
                    setFormData({ name: "", email: "" });
                }
                onSuccess?.();
            }
        } catch (error) {
            setMessage("Có lỗi xảy ra, vui lòng thử lại");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white p-6 rounded-lg shadow-md"
        >
            <h2 className="text-xl font-bold text-gray-800">
                {user ? "Cập nhật người dùng" : "Thêm người dùng mới"}
            </h2>

            <div>
                <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Tên
                </label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập tên người dùng"
                />
            </div>

            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nhập email"
                />
            </div>

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

            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Đang xử lý..." : user ? "Cập nhật" : "Thêm mới"}
                </button>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                    >
                        Hủy
                    </button>
                )}
            </div>
        </form>
    );
}
