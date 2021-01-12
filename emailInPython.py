import smtplib
from email.message import EmailMessage

'''
Send emails with python using the following function 
'''
def email_content(body, s_address = "********", r_address = "*******", subject_line = ""):
    msg = EmailMessage()
    msg['Subject'] = subject_line
    msg['From'] = s_address
    msg['To'] = r_address
    msg.set_content(body)
    with smtplib.SMTP_SSL('smtp.gmail.com' , 465) as smtp:
        # login in gmail account from python- you have to be logged in through python for this to work- get your own password by setting up 2-Step Verfication 
        # on your gmail account.  Below, first put your email address, then the, your 16-letter password for python (no spaces)
        smtp.login("********", "********")
        
        smtp.send_message(msg)
        

# in the ShoppingList class, create a button called 'Email List', which when clicked on, calls another function that creates a popup window with two fields To: and From:
# this popup window also has a button called 'Email It' which calls another functon (a command)
# in shopping_list_oop.py that passes the a string 
# (the shopping list items seprated by '\n') along with other arguments into email_content funtion and send the list in plain text to the user's recipient
# I planned it out like this becase I want to be able to use the email_content method independently 
