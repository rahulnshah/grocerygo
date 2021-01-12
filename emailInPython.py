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
        # on your gmail account.  Below, first put your email address, and then your 16-letter password for python without spaces.
        smtp.login("********", "********")
        
        smtp.send_message(msg)
        
