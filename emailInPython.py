import smtplib, ssl
from email.message import EmailMessage

'''
Send emails with python using the following function 
'''
    
def email_content(body,  s_address, r_address, subject_line):
    msg = EmailMessage()
    msg['Subject'] = subject_line
    msg['From'] = s_address
    msg['To'] = r_address
    msg.set_content(body)
    # Create a secure SSL context
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL('smtp.gmail.com' , 465, context = context) as server:
        server.login("**************", "*************")
        server.send_message(msg)
        
