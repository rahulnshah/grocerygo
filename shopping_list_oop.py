import tkinter as tk
from db import Database
from tkinter import messagebox
from emailInPython import email_content


# db = Database("database")


class ShoppingList(tk.Frame):
    """
    Shopping List- a list to include shopping items.
    """

    def __init__(self, master, database):
        super().__init__(master)  
        # background
        self.app_bg = tk.PhotoImage(file="images/notebook_paper.png")
        self.app_label = tk.Label(self.master, image=self.app_bg)
        self.app_label.place(x=0, y=0, relwidth=1, relheight=1)

        self.db = Database(database)
        self.email_text = ""
        self.master = master
        self.master.title('Shopping List')
        # self.master.configure(background = 'Dark green')

        # Width height
        self.master.geometry("750x300")

        # Init selected item var
        self.selected_item = 0.1
        # shopping item
        self.shopping_item_text = tk.StringVar()
        self.shopping_item_label = tk.Label(self.master, text="Shopping Item", font=("bold", 14), pady=20)
        self.shopping_item_label.grid(row=0, column=0, sticky=tk.W)
        self.shopping_item_entry = tk.Entry(self.master, textvariable=self.shopping_item_text)
        self.shopping_item_entry.grid(row=0, column=1)

        # item quantity
        # self.item_quantity_text = tk.StringVar()
        # self.item_quantity_label = tk.Label(self.master, text="Item Quantity", font=("bold", 14), pady=20)
        # self.item_quantity_label.grid(row=0, column=2, sticky=tk.W)
        # self.item_quantity_entry = tk.Entry(self.master, textvariable=self.item_quantity_text)
        # self.item_quantity_entry.grid(row=0, column=3)

        self.shopping_list = tk.Listbox(self.master, height=8, width=50)
        self.shopping_list.grid(row=3, column=0, columnspan=3, rowspan=6, pady=20, padx=20)
        self.scrollbar = tk.Scrollbar(self.master)
        self.scrollbar.grid(row=3, column=3)

        # whenever I create a new object, I need to see what is currently in the database of the object, and fill in
        # the string below
        self.populate_list()

        self.shopping_list.configure(yscrollcommand=self.scrollbar.set)
        self.scrollbar.configure(command=self.shopping_list.yview)

        # Bind select
        self.shopping_list.bind("<<ListboxSelect>>", self.select_item)
        #  Buttons
        self.email_btn = tk.Button(self.master, text="Email List", width=16, command=self.email_popup)
        self.email_btn.grid(row=1, column=4, pady=20)

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
        self.email_text = ""
        for row in self.db.fetch():
            self.shopping_list.insert(tk.END, row)
            self.email_text += row[1] + "\n"

            # I cannot only insert the second element of every row tuple because I need the first element to
            # for other buttons

    def add_item(self):
        if self.shopping_item_text.get() == "":
            messagebox.showerror('Required Fields', 'Please include all fields')
            return  # --> Does not return None, but does not execute the next following statements so that is good
        self.db.insert(
            self.shopping_item_text.get())  # inserts item into database.db, so I
        # could call the populate_list method

        self.populate_list()  # refills the shopping_list after any change the user makes to database_1
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
            # self.item_quantity_entry.delete(0, tk.END)
            # self.item_quantity_entry.insert(tk.END, self.selected_item[2])

            # every item in the list is really a tuple, but
            # the shopping_item is at index 1 of the tuple, which gets inserted into entry box by the line above
            # print(selected_item, selected_item[1])
        except IndexError:
            messagebox.showerror('List Empty', 'Please include at least one item in the list.')
            # print(self.selected_item)

    def email_popup(self):
        self.top = tk.Toplevel(self.master)
        self.top.title("Email List")
        self.s_address_text = tk.StringVar()
        self.r_address_text = tk.StringVar()

        self.s_l = tk.Label(self.top, text="From:")
        self.s_l.pack()
        self.e = tk.Entry(self.top, textvariable=self.s_address_text)
        self.e.pack()
        self.r = tk.Label(self.top, text="To:")
        self.r.pack()
        self.r_e = tk.Entry(self.top, textvariable=self.r_address_text)
        self.r_e.pack()
        self.b = tk.Button(self.top, text='Email It', command=self.cleanup)
        self.b.pack()

    def cleanup(self):
        if self.s_address_text.get() == "" or self.r_address_text.get() == "":
            messagebox.showerror('Required Fields', 'Please include all fields')
            return
        email_content(self.email_text, self.s_address_text.get(), self.r_address_text.get(), "Grocery Shopping List")
        self.top.destroy()

    # make the shopping_list appear
    def mainloop_it(self):
        self.master.mainloop()


root = tk.Tk()
shopping_list = ShoppingList(root, "database_1.db")
shopping_list.mainloop_it()
