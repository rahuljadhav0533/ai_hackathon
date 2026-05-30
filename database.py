import sqlite3

conn = sqlite3.connect(
    "companies.db",
    check_same_thread=False
)

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS companies(
id INTEGER PRIMARY KEY AUTOINCREMENT,

website_name TEXT,
company_name TEXT,
address TEXT,
mobile_number TEXT,
emails TEXT,

core_service TEXT,
target_customer TEXT,

probable_pain_point TEXT,
outreach_opener TEXT
)
""")

conn.commit()
print("Database Created Successfully")