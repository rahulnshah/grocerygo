# shoppingList  (portfolio project)
## What is it?
A simple GUI application that not only allows one to add, update, and remove a shopping item from a shopping list, but also allows one to email it to its recipient.

## The steps:
1. Set up 2-Step Verfication on your Google account, because Gmail does not allow Python access to your emails. You will later need to also set an app password for Python in your Google account settings, so that you can give Python access to your Gmail and direct your emails from Python.
2. Put your email address as the first argument of ```email_content``` in ```emailInPython.py``` and Python's unique 16-character app password-excluding spaces-as its second argument.
3. Navigate to the directory where my cloned repository will be on your computer.
4. Run this command: ```python shopping_list_oop.py``` 
5. You should see this pop up:  

![](README%20materials/shoppinglist%20screen.jpg)

## TODO:
- Be able to send all the items in the ListBox translated into Gujarati.
- Add a short demo of the GUI to this README.
- Make the adding, removing, an updating of items in a database.
- Be able to loop through each record of the database to fill the items into the ListBox.
    
## Helpful resources:
- [Set up 2-Step Verfication on my Google  account](https://towardsdatascience.com/automate-sending-emails-with-gmail-in-python-449cc0c3c317) 
- [Sending emails in Python](https://realpython.com/python-send-email/)

