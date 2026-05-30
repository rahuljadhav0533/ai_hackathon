from flask_cors import CORS
from flask import Flask
from flask import request
from flask import jsonify

from scraper import scrape_website
from ai_service import enrich_company

import sqlite3
import json

app = Flask(__name__)
CORS(app)
@app.route("/")
def home():
    return "Backend Running"
@app.route(
    "/enrich",
    methods=["POST"]
)
def enrich():

    body = request.get_json()

    url = body["url"]

    text = scrape_website(url)

    result = enrich_company(text)

    conn = sqlite3.connect(
        "companies.db"
    )

    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO companies(
            website_name,
            company_name,
            address,
            mobile_number,
            emails,
            core_service,
            target_customer,
            probable_pain_point,
            outreach_opener
        )
        VALUES(?,?,?,?,?,?,?,?,?)
        """,
        (
            result.get("website_name"),
            result.get("company_name"),
            result.get("address"),
            result.get("mobile_number"),
            json.dumps(
                result.get("mail", [])
            ),
            result.get("core_service"),
            result.get("target_customer"),
            result.get("probable_pain_point"),
            result.get("outreach_opener")
        )
    )

    conn.commit()

    return jsonify(result)
@app.route("/results")
def results():

    conn = sqlite3.connect(
        "companies.db"
    )

    cursor = conn.cursor()

    cursor.execute(
        "SELECT * FROM companies"
    )

    rows = cursor.fetchall()

    return jsonify(rows)
@app.route("/test")
def test():
    return "Test Route Working"

if __name__ == "__main__":
    app.run(debug=True)