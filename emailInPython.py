import smtplib
from email.message import EmailMessage


def email_content(body, s_address = "rahulnshah3012@gmail.com", r_address = "rahulnshah3012@gmail.com", subject_line = ""):
    msg = EmailMessage()
    msg['Subject'] = subject_line
    msg['From'] = s_address
    msg['To'] = r_address
    msg.set_content(body)
    with smtplib.SMTP_SSL('smtp.gmail.com' , 465) as smtp:
        # login in gmail account from python- you have to be logged in to make this work
        smtp.login("rahulnshah3012", "vibmnjbevvzrbptk")
        
        smtp.send_message(msg)
        

# in the ShoppingList class, create a button called 'Email List', which when clicked on, calls another function that creates a popup window with two fields To: and From:
# this popup window also has a button called 'Email It' which calls another functon (a command)
# in shopping_list_oop.py that passes the a string 
# (the shopping list items seprated by '\n') along with other arguments into email_content funtion and send the list in plain text to the user's recipient
# I planned it out like this becase I want to be able to use the email_content method independently 
