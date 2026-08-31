# Punit Sharma — Digital Marketing Specialist | Portfolio (Flask)

A premium, dark glassmorphism portfolio site built with **Python Flask + HTML + CSS + JavaScript**.

## Stack
- **Backend:** Flask (Python) — serves the pages, handles the contact form, and serves the resume download
- **Frontend:** HTML (Jinja2 templates) + CSS (glassmorphism / dark UI) + vanilla JS (scroll reveals, counters, marquee, cursor glow, preloader)

## Project structure
```
flask_app/
├── app.py                     # Flask app: routes, form handling, resume download
├── requirements.txt
├── data/
│   └── messages.json          # contact form submissions get appended here
├── templates/
│   ├── index.html             # main one-page site (hero, about, services, portfolio, etc.)
│   └── resume.html            # dedicated resume page
└── static/
    ├── css/style.css
    ├── js/script.js
    ├── media/                 # hero visual, overview, ad-result screenshots
    └── Punit_Sharma_Resume.pdf
```

## Run locally

```bash
cd flask_app
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Open **http://127.0.0.1:5000**

## Routes

| Route              | Method | Purpose                                             |
|---------------------|--------|------------------------------------------------------|
| `/`                 | GET    | Main portfolio page                                   |
| `/resume`           | GET    | Dedicated resume page                                  |
| `/resume/download`  | GET    | Forces a download of `Punit_Sharma_Resume.pdf`         |
| `/contact`          | POST   | Validates and saves a contact-form submission, flashes a success/error message, redirects back to `/#contact` |

## Contact form
The "Get In Touch" section on the homepage has a real server-side form (name, email, message). Submissions are validated in `app.py` and appended to `data/messages.json` with a UTC timestamp. No external email service is wired up by default — swap `save_message()` in `app.py` for an SMTP call, or a database insert, if you want it emailed or stored elsewhere.

## Deploying
Any standard Flask host works (Render, Railway, PythonAnywhere, a VPS with Gunicorn + Nginx, etc.). For production:
- Set a real `SECRET_KEY` environment variable
- Run behind Gunicorn: `gunicorn app:app`
- Turn `debug=False` in `app.py` (or don't rely on the `__main__` block at all in production)
