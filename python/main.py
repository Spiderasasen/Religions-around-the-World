import mysql.connector
import json

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
    try:
        #connects the sql code
        db = mysql.connector.connect(
            host=creds["host"],
            user=creds["user"],
            password=creds["password"],
            database=creds["database"]
        )

        return db
    #if something does happen
    except Exception as e:
        print(e)

#loading a religon
def load_religion(file_path):
    with open(file_path, "r") as f:
        return json.load(f)

#inserting religion info
def inserting_religion(cursor, data):
    sql = """
        INSERT INTO religions (religion_name, religion_description)
        VALUES (%s, %s)
    """
    cursor.execute(sql, (data["name"], data["description"]))
    return cursor.lastrowid

#inserting a book
def insert_text(cursor, text):
    #checking if the text is there
    sql_check = "select book_key from books where text_name = %s"
    cursor.execute(sql_check, (text["name"],))
    result = cursor.fetchone()

    #if the name is there, return only the id
    if result:
        return result[0]

    #only inserting if the text is not there
    sql = """
        INSERT INTO books (text_name, text_link)
        VALUES (%s, %s)
    """
    cursor.execute(sql, (text["name"], text["link"]))
    return cursor.lastrowid

#linking religion -> book
def link_religion_to_book(cursor, religion_id, book_id):
    sql = """
        INSERT INTO text_has_religions (text_text_key, religions_religions_key)
        VALUES (%s, %s)
    """
    cursor.execute(sql, (book_id, religion_id))

#inserting the regions
def insert_region(cursor, region_name):
    sql = "INSERT INTO regions (region_name) VALUES (%s)"
    cursor.execute(sql, (region_name,))
    return cursor.lastrowid

#linking religion -> region
def link_religion_to_region(cursor, religion_id, region_id):
    sql = """
        INSERT INTO regions_has_religions (regions_regions_key, religions_religions_key)
        VALUES (%s, %s)
    """
    cursor.execute(sql, (region_id, religion_id))

#inerserting branches
def inserting_branches(cursor, branchData, religion_id):
    sql = """
        INSERT INTO branch (branch_name, branch_description, religions_religions_key)
        VALUES (%s, %s, %s)
    """
    cursor.execute(sql, (branchData["name"], branchData["description"], religion_id))
    return cursor.lastrowid

#linking branch -> book
def link_branches_to_books(cursor, branch_id, book_id, religion_id):
    sql = """
        INSERT INTO text_has_branch (text_text_key, branch_branch_key, branch_religions_religions_key)
        VALUES (%s, %s, %s)
    """
    cursor.execute(sql, (book_id, branch_id, religion_id))

#linking branch -> region
def link_branches_to_regions(cursor, region_id, branch_id, religion_id):
    sql = """
        INSERT INTO regions_has_branch (regions_regions_key, branch_branch_key, branch_religions_religions_key)
        VALUES (%s, %s, %s)
    """
    cursor.execute(sql, (region_id, branch_id, religion_id))


#main function to insert everything
def main_insert(cursor, data):
    # inserting the religion
    religion_id = inserting_religion(cursor, data)

    # inserting religion text
    texts = data["text"]

    if isinstance(texts, dict):
        texts = [texts]

    for text in texts:
        book_id = insert_text(cursor, text)
        link_religion_to_book(cursor, religion_id, book_id)

    # inserting relion regions
    print("Trying to open:", data["regions"])
    with open(data["regions"], "r") as f:
        regions = json.load(f)

    for region in regions:
        region_id = insert_region(cursor, region)
        link_religion_to_region(cursor, religion_id, region_id)

    # inserting the branches
    for branch in data["branches"]:
        branch_id = inserting_branches(cursor, branch, religion_id)

        # inserting branch text
        branch_text = branch["text"]

        if isinstance(branch_text, dict):
            branch_text = [branch_text]

        for text in branch_text:
            book_id = insert_text(cursor, text)
            link_branches_to_books(cursor, branch_id, book_id, religion_id)

        # inserting branch regions
        with open(branch["regions"], "r") as f:
            branch_regions = json.load(f)

        for region in branch_regions:
            region_id = insert_region(cursor, region)
            link_branches_to_regions(cursor, region_id, branch_id, religion_id)

        print(f"Religion:{religion_id}, Branch:{branch_id}; is done")

#main functions
def main():
    db = connection()
    cursor = db.cursor()
    print("Connected successfully!")

    #dictunary that will hold all the religons
    religionDict = {
        "Christianity": "json_files/christainty.json",
        "Judaism": "json_files/jew.json",
        "Islam": "json_files/muslim.json",
        "Hinduism": "json_files/hindu.json"
    }

    #looping through all the keys in the dict
    for religion, path in religionDict.items():
        print("Working on:", religion)
        #loading json
        data = load_religion(path)

        #inserting all the data
        main_insert(cursor, data)

    print("Everything is added!!")
    db.commit()
    cursor.close()
    db.close()


if __name__ == '__main__':
    main()