"""
Punit Sharma — Digital Marketing Specialist
Flask backend for the portfolio site.

Run:
    pip install -r requirements.txt
    python app.py
Then open http://127.0.0.1:5000
"""

import json
import os
import re
from datetime import datetime, timezone

from flask import (
    Flask,
    flash,
    redirect,
    render_template,
    request,
    send_from_directory,
    url_for,
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
MESSAGES_FILE = os.path.join(DATA_DIR, "messages.json")

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")

app = Flask(__name__)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret-key-change-me")


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def _ensure_data_file():
    os.makedirs(DATA_DIR, exist_ok=True)
    if not os.path.exists(MESSAGES_FILE):
        with open(MESSAGES_FILE, "w", encoding="utf-8") as f:
            json.dump([], f)


def save_message(name: str, email: str, message: str) -> None:
    _ensure_data_file()
    with open(MESSAGES_FILE, "r", encoding="utf-8") as f:
        try:
            entries = json.load(f)
        except json.JSONDecodeError:
            entries = []

    entries.append(
        {
            "name": name,
            "email": email,
            "message": message,
            "received_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        }
    )

    with open(MESSAGES_FILE, "w", encoding="utf-8") as f:
        json.dump(entries, f, indent=2, ensure_ascii=False)


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------
@app.route("/")
def home():
    return render_template("home.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/services")
def services():
    return render_template("services.html")


@app.route("/portfolio")
def portfolio():
    return render_template("portfolio.html")


@app.route("/experience")
def experience():
    return render_template("experience.html")


@app.route("/resume")
def resume():
    return render_template("resume.html")


@app.route("/resume/download")
def resume_download():
    """Force-download the resume PDF with a clean filename."""
    return send_from_directory(
        app.static_folder,
        "Punit_Sharma_Resume.pdf",
        as_attachment=True,
        download_name="Punit_Sharma_Resume.pdf",
    )


@app.route("/contact", methods=["GET", "POST"])
def contact():
    if request.method == "GET":
        return render_template("contact.html")

    name = (request.form.get("name") or "").strip()
    email = (request.form.get("email") or "").strip()
    message = (request.form.get("message") or "").strip()

    if not name or not email or not message:
        flash("Please fill in every field before sending.", "error")
        return redirect(url_for("contact"))

    if not EMAIL_RE.match(email):
        flash("That email address doesn't look right — please check it.", "error")
        return redirect(url_for("contact"))

    if len(message) > 4000:
        flash("Message is too long — please keep it under 4000 characters.", "error")
        return redirect(url_for("contact"))

    save_message(name, email, message)
    flash(f"Thanks {name.split()[0]}! Your message has been sent — I'll get back to you soon.", "success")
    return redirect(url_for("contact"))


@app.errorhandler(404)
def not_found(_e):
    return render_template("home.html"), 404


if __name__ == "__main__":
    _ensure_data_file()
    app.run(debug=True, host="127.0.0.1", port=5000)
