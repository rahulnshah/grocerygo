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
        smtp.login("rahulnshah3012", "********")
        
        smtp.send_message(msg)
        

# in the ShoppingList class, create a button called Email List 
# create a separate function called email_list that takes in a string 
# (the list items seprated by '\n'), Sender, Reciever, this information that i enter into 
# a message box when I click on EMAIL LIST
# I planned it out like this becase I want to be able to use the email_list methos independently 
# then add it in a separate module 