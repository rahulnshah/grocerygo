// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
};

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
    description: string;
    created_at: string;
    updated_at: string;
};

// Type for the favorites relationship
export type FavoriteList = {
    id: string;
    list_id: string;
    name: string;
    description: string;
    created_at: string;
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
};