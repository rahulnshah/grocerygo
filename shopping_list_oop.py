import tkinter as tk

from tkinter import messagebox
from emailInPython import email_content
from emailInPython import email_content




class ShoppingList(tk.Frame):
    """
    Shopping List- a list to include shopping items.
    """

    def __init__(self, master):
        super().__init__(master)  
        self.master = master
        self.master.title('Shopping List')
        # Width height
        self.master.geometry("750x300")
        # background
        self.app_bg = tk.PhotoImage(file="C:\\Users\\rahul\\OneDrive\\Documents\\Desktop\\shoppingList\\images\\notebook_paper.png")
        self.app_label = tk.Label(self.master, image=self.app_bg)
        self.app_label.place(x=0, y=0, relwidth=1, relheight=1)

        # Init selected item var
        self.selected_item = 0.1
        # shopping item
        self.shopping_item_text = tk.StringVar()
        self.shopping_item_label = tk.Label(self.master, text="Shopping Item", font=("bold", 14), pady=20)
        self.shopping_item_label.grid(row=0, column=0, sticky=tk.W)
        self.shopping_item_entry = tk.Entry(self.master, textvariable=self.shopping_item_text)
        self.shopping_item_entry.grid(row=0, column=1)
        
        # shopping list
        self.shopping_list = tk.Listbox(self.master, height=8, width=50)
        self.shopping_list.grid(row=3, column=0, columnspan=3, rowspan=6, pady=20, padx=20)
        self.scrollbar = tk.Scrollbar(self.master)
        self.scrollbar.grid(row=3, column=3)
        self.shopping_list.configure(yscrollcommand=self.scrollbar.set)
        self.scrollbar.configure(command=self.shopping_list.yview)

        # whenever I create a new object, I need to see what is currently in the database of the object, and fill in
        # the string below
        # self.populate_list()

        # Bind select
        self.shopping_list.bind("<<ListboxSelect>>", self.select_item)
        #  Buttons
        self.email_btn = tk.Button(self.master, text="Email my list", width=16, command=self.email_popup)
        self.email_btn.grid(row=1, column=4, pady=20)

        self.add_btn = tk.Button(self.master, text="Add Shopping Item", width=16, command=self.add_item)
        self.add_btn.grid(row=1, column=0, pady=20)

        self.remove_btn = tk.Button(self.master, text="Remove Shopping Item", width=18, command=self.remove_item)
        self.remove_btn.grid(row=1, column=1)

        self.update_btn = tk.Button(self.master, text="Update Shopping Item", width=18, command=self.update_item)
        self.update_btn.grid(row=1, column=2)

        self.clear_btn = tk.Button(self.master, text="Clear Input", width=16, command=self.clear_text)
        self.clear_btn.grid(row=1, column=3, pady=20)

    def add_item(self):
        if self.shopping_item_text.get() == "":
            messagebox.showerror('Required Fields', 'Please include all fields')
            return  
        self.shopping_list.insert(tk.END,self.shopping_item_text.get())
        self.clear_text()

    def remove_item(self):
        if self.selected_item == 0.1:
            messagebox.showerror('Nothing Selected', 'Please select an shopping item.')
            return
        # self.db.remove(self.selected_item[0])  # selected_item[0] is the id number of the item that you want to remove
        # after i remove or update an item I want to reset its value so that the user has no choice but to
        # select once more to remove or update an item
        self.shopping_list.delete(self.shopping_list.curselection()[0])
        self.selected_item = 0.1
        self.clear_text()

    def update_item(self):
        if self.selected_item == 0.1:
            messagebox.showerror('Nothing Selected', 'Please select an shopping item.')
            return
        # I need to remove the selected item first then add at the selected index 
        # when I delete the thing,my index 0 disappears, becace nothing is there , so i need to save the selected index 
        selected_index = self.shopping_list.curselection()[0]
        self.shopping_list.delete(self.shopping_list.curselection()[0])
        self.shopping_list.insert(selected_index,self.shopping_item_text.get())
        
        self.selected_item = 0.1

    def clear_text(self):
        self.shopping_item_entry.delete(0, tk.END)

    def select_item(self, event):
        try:
            index = self.shopping_list.curselection()[0]
            # the line above gets the index of the selected_item; indexes are read from 0 in python
            self.selected_item = self.shopping_list.get(index)
            # the line above gets the actual item from the shopping_list associated with its index

            # clear whatever is in the entry field from index 0 to the end of it
            self.shopping_item_entry.delete(0, tk.END)
            self.shopping_item_entry.insert(tk.END, self.selected_item)            
        except IndexError:
            messagebox.showerror('List Empty', 'Please include at least one item in the list.')

    def email_popup(self):
        email_str = ""
        for list_entry in self.shopping_list.get(0, tk.END):
            email_str = email_str + list_entry + "\n"
        top = tk.Toplevel(self.master)
        top.title("Email shopping list")
        s_address_text = tk.StringVar()
        r_address_text = tk.StringVar()
        s_l = tk.Label(top, text="From:")
        s_l.pack()
        e = tk.Entry(top, textvariable = s_address_text)
        e.pack()
        r = tk.Label(top, text="To:")
        r.pack()
        r_e = tk.Entry(top, textvariable = r_address_text)
        r_e.pack()
        b = tk.Button(top, text='Email It', command =lambda: email_content(email_str, s_address_text.get(), r_address_text.get(), "Grocery Shopping List")) # call the email_content function in .py file
        b.pack()
        
    def appear(self):
        self.master.mainloop()


root = tk.Tk()
shopping_list = ShoppingList(root)
shopping_list.appear()
