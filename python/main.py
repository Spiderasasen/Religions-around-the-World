import mysql.connector

#loading the credentials
def load_credentials(path="db-credentials.txt"):
    cred = {}
    with open(path, "r") as f:
        for line in f:
            key,value = line.strip().split("=")
            cred[key] = value
    return cred

#making the connections
def connection():
    creds = load_credentials()

    #enting the info
    db = mysql.connector.connect(
        host=creds["host"],
        user=creds["user"],
        password=creds["password"],
        database=creds["database"]
    )

    return db


#main functions
def main():
    db = connection()
    cursor = db.cursor()
    print("Connected successfully!")

    #showing the tables
    cursor.execute("show tables;")
    for table in cursor.fetchall():
        print(table)

    cursor.close()
    db.close()


if __name__ == '__main__':
    main()