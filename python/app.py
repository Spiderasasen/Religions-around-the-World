from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector

app = FastAPI()

#CORS setup so both react and the sql code can talk to each other
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

#loading the credentials
def load_credentials(path="db-credentials.txt"):
    cred = {}
    with open(path, "r") as f:
        for line in f:
            key,value = line.strip().split("=")
            cred[key] = value
    return cred

def get_connection():
    creds = load_credentials()
    #connects the sql code
    try:
        db = mysql.connector.connect(
            host=creds["host"],
            user=creds["user"],
            password=creds["password"],
            database=creds["database"]
        )

        return db
    except Exception as e:
        print("Error", e)
        return None

@app.get("/religions")
def get_religions():
    conn = get_connection()

    #checking if there is a problem with the connection
    if conn is None:
        return {"error": "Failed to connect to database"}

    cursor = conn.cursor(dictionary=True)
    cursor.execute("select * from religions")
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return data