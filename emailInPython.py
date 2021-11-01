import smtplib, ssl

def email_content(message, receiver_email):
    port = 465  # For SSL
    smtp_server = "smtp.gmail.com"
    sender_email = "my@gmail.com"  # Enter your address
    password = input("Type your password and press enter: ")
    message = "Grocery Shopping List\n" + message

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, port, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message)
