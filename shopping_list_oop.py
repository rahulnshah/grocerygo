import tkinter as tk
from db import Database
from tkinter import messagebox


# db = Database("database")


class ShoppingList(tk.Frame):
    """
    Shopping List- a list to include shopping items.
    """

    def __init__(self, master, database):
        super().__init__(master)
        self.db = Database(database)
        self.master = master
        self.master.title('Shopping List')
        # Width height
        self.master.geometry("750x300")

        # Init selected item var
        self.selected_item = 0.1

        self.shopping_item_text = tk.StringVar()
        self.shopping_item_label = tk.Label(self.master, text="Shopping Item", font=("bold", 14), pady=20)
        self.shopping_item_label.grid(row=0, column=0, sticky=tk.W)
        self.shopping_item_entry = tk.Entry(self.master, textvariable=self.shopping_item_text)
        self.shopping_item_entry.grid(row=0, column=1)
        self.shopping_list = tk.Listbox(self.master, height=8, width=50)
        self.shopping_list.grid(row=3, column=0, columnspan=3, rowspan=6, pady=20, padx=20)
        self.scrollbar = tk.Scrollbar(self.master)
        self.scrollbar.grid(row=3, column=3)

        # whenever I create a new object, I need to see what is currently in the database of the object
        self.populate_list()

        self.shopping_list.configure(yscrollcommand=self.scrollbar.set)
        self.scrollbar.configure(command=self.shopping_list.yview)

        # Bind select
        self.shopping_list.bind("<<ListboxSelect>>", self.select_item)
        #  Buttons

        self.add_btn = tk.Button(self.master, text="Add Shopping Item", width=16, command=self.add_item)
        self.add_btn.grid(row=1, column=0, pady=20)

        # To remove it
        self.remove_btn = tk.Button(self.master, text="Remove Shopping Item", width=18, command=self.remove_item)
        self.remove_btn.grid(row=1, column=1)

        # To change name of an item
        self.update_btn = tk.Button(self.master, text="Update Shopping Item", width=18, command=self.update_item)
        self.update_btn.grid(row=1, column=2)

        # To clear the fields
        self.clear_btn = tk.Button(self.master, text="Clear Input", width=16, command=self.clear_text)
        self.clear_btn.grid(row=1, column=3, pady=20)

    def populate_list(self):
        self.shopping_list.delete(0,
                                  tk.END)  # Delete everything in list then add new stuff from running the loop below
        for row in self.db.fetch():
            self.shopping_list.insert(tk.END, row)

    def add_item(self):
        if self.shopping_item_text.get() == "":
            messagebox.showerror('Required Fields', 'Please include all fields')
            return  # --> Does not return None, but does not execute the next following statements so that is good
        self.db.insert(
            self.shopping_item_text.get())  # inserts item into database.db, so I could call the populate_list method

        self.populate_list() # refills the shopping_list after any change the user makes to database_1
        self.clear_text()

    def remove_item(self):
        # if i have no items are selected, this message box will show
        if self.selected_item == 0.1:
            messagebox.showerror('Nothing Selected', 'Please select an shopping item.')
            return
        self.db.remove(self.selected_item[0])  # selected_item[0] is the id number of the item that you want to remove
        # after i remove or update an item I want to reset its value so that the user has no choice but to
        # select once more to remove or update an item
        self.selected_item = 0.1
        self.populate_list()
        self.clear_text()

    def update_item(self):
        if self.selected_item == 0.1:
            messagebox.showerror('Nothing Selected', 'Please select an shopping item.')
            return
        self.db.update(self.selected_item[0], self.shopping_item_text.get())
        self.populate_list()
        self.selected_item = 0.1
    def clear_text(self):
        self.shopping_item_entry.delete(0, tk.END)

    def select_item(self, event):
        try:
            index = self.shopping_list.curselection()[0]
            # the line above gets the index of the selected_item; indexes are read from 0 in python
            # print(index, self.shopping_list.curselection()[1])
            self.selected_item = self.shopping_list.get(index)
            # the line above gets the actual item from the shopping_list associated with its
            # index
            # print(selected_item)

            # clear whatever is in the entry field from index 0 to the end of it
            self.shopping_item_entry.delete(0, tk.END)
            self.shopping_item_entry.insert(tk.END, self.selected_item[1])
            # every item in the list is really a tuple, but
            # the shopping_item is at index 1 of the tuple, which gets inserted into entry box by the line above
            # print(selected_item, selected_item[1])
        except IndexError:
            messagebox.showerror('List Empty', 'Please include at least one item in the list.')
            # print(self.selected_item)

'''
What can be improved:
-write a separate method called renumber() that renumbers the items in the 
shopping list in order
-create a button in the GUI app that emails the list to its recipient 
'''

root = tk.Tk()
app = ShoppingList(root, "database_1")

# print(app.db.fetch())
app.mainloop()
