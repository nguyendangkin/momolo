// app/actions/user-actions.ts
"use server";

import { revalidatePath } from "next/cache";

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface CreateUserDto {
    name: string;
    email: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Lấy tất cả users
export async function getUsers(): Promise<User[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Không thể tải danh sách người dùng");
    }
}

// Lấy một user theo ID
export async function getUserById(id: number): Promise<User> {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching user:", error);
        throw new Error("Không thể tải thông tin người dùng");
    }
}

// Tạo user mới
export async function createUser(
    userData: CreateUserDto
): Promise<{ success: boolean; message: string; user?: User }> {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.message || `Failed to create user: ${response.status}`
            );
        }

        const user = await response.json();
        revalidatePath("/users");
        return { success: true, message: "Tạo người dùng thành công!", user };
    } catch (error) {
        console.error("Error creating user:", error);
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Không thể tạo người dùng",
        };
    }
}

// Cập nhật user
export async function updateUser(
    id: number,
    userData: Partial<CreateUserDto>
): Promise<{ success: boolean; message: string; user?: User }> {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.message || `Failed to update user: ${response.status}`
            );
        }

        const user = await response.json();
        revalidatePath("/users");
        return {
            success: true,
            message: "Cập nhật người dùng thành công!",
            user,
        };
    } catch (error) {
        console.error("Error updating user:", error);
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Không thể cập nhật người dùng",
        };
    }
}

// Xóa user
export async function deleteUser(
    id: number
): Promise<{ success: boolean; message: string }> {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete user: ${response.status}`);
        }

        revalidatePath("/users");
        return { success: true, message: "Xóa người dùng thành công!" };
    } catch (error) {
        console.error("Error deleting user:", error);
        return {
            success: false,
            message:
                error instanceof Error
                    ? error.message
                    : "Không thể xóa người dùng",
        };
    }
}
