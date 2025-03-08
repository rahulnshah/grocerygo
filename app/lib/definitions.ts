// This file contains type definitions based on the Drizzle schema

export type User = {
    id: number;
    email: string | null;
    password: string | null;
    name: string | null;
    createdAt: Date | null;
};

export type List = {
    id: number;
    userId: number;
    name: string;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};

export type Item = {
    id: number;
    listId: number;
    name: string;
    isChecked: boolean;
    assignedTo: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};

export type SharedList = {
    id: number;
    ownerId: number;
    sharedWithId: number;
    listId: number;
    sharedAt: Date | null;
};

export type Favorite = {
    id: number;
    userId: number;
    listId: number;
    createdAt: Date | null;
};

// Composite and derived types
export type ListWithCounts = List & {
    itemCount: number;
};

export type ItemWithAssignee = Item & {
    assignedToName?: string | undefined;
};

// Form submission types
export type ListForm = {
    name: string;
    description: string | null;
};

export type ItemForm = {
    id: number;
  listId: number;
  name: string;
  isChecked: boolean;
  assignedTo: number | null;
  assignedToName: string | null;
};

// Helper types
export type SharedWithIds = {
    sharedWithId: number;
};

export type FavoriteList = Omit<List, 'userId' | 'updatedAt' | 'createdAt'> & {
    listId: number;
};
