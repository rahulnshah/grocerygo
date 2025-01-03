// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
// Type for an item
export type Item = {
    id: string;
    list_id: string;
    name: string;
    is_checked: boolean;
    created_at: string;
    updated_at: string;
};

// Type for a list
export type List = {
    id: string;
    name: string;
    user_id: string;
    description: string;
    created_at: string;
    updated_at: string;
};

export type ListWithCounts = List & {
    item_count: number;
};

// Type for the favorites relationship
export type FavoriteList = {
    id: string;
    name: string;
    description: string;
    created_at: string;
};

export type Favorite = {
    id: string;
    user_id: string;
    list_id: string;
    created_at: string;
};
export type SharedWithIds = {
    shared_with_id: string;
};

export type ListForm = {
    id: string;
    name: string;
    description: string;
};

export type ItemForm = {
    id: string;
    list_id: string;
    name: string;
    is_checked: boolean;
    assigned_to: string;
    assigned_to_name?: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    password?: string;
    created_at: string;
};

export type SharedList = {
    id: string;
    list_id: string;
    shared_with_id: string;
    created_at: string;
};
  