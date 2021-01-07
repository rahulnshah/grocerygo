import sqlite3


class Database:
    def __init__(self, db):
        # code below seems wierd, but all I am doing 
        # is conneting sqlite3 to my database denoted by db.
        self.conn = sqlite3.connect(db) 
        # create a cursor object to the connection above
        self.cur = self.conn.cursor()
        # create a table only if it does not exist for that particular database object 
        # I can create a table for the same Database object an assign it to a different variable, but we don't 
        # want to do that here.  This function will create the items table
        # and display our shopping items
        self.cur.execute("CREATE TABLE IF NOT EXISTS items (id integer primary key autoincrement, shopping_item text)")
        self.conn.commit() 

    '''CRUD Operations'''
    def fetch(self):
        rw_data = self.cur.execute("SELECT * FROM items")
        rows = rw_data.fetchall()
        return rows  # returns a list of tuples of all items 

    def insert(self, shopping_item):
        #  NULL  protects us from SQL injection, whatever that is
        self.cur.execute("INSERT INTO items VALUES (NULL, ?)", (shopping_item,))
        self.conn.commit()

    def remove(self, id):  # needs an id to know which part we are removing
        #  need a trailing comma for a tuple that only has one value like in (id,)
        self.cur.execute("DELETE FROM items WHERE id=?", (id,))
        self.conn.commit()

    def update(self, id, shopping_item):  # needs an id to know which one we are updating

        self.cur.execute("UPDATE items SET shopping_item = ?  WHERE id= ?",
                         ( shopping_item, id))
        self.conn.commit()
    # destructor --> called when all references to the object have been deleted
    def __del__(self):
        self.conn.close()

# A Database object
# db = Database("database")
# db.update(2,"asdsadfaf")
# db.remove(2)
# print(db.fetch())
