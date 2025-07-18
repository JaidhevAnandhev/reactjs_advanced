import sqlite3
from flask import Flask, request, jsonify, g
from flask_cors import CORS # <-- Import CORS

app = Flask(__name__)
CORS(app) # <-- Enable CORS for your entire app
DATABASE = 'students.db'

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/students', methods=['GET'])
def get_students():
    cur = get_db().cursor()
    cur.execute('''CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT,
        password TEXT,
        age INTEGER,
        gender TEXT,
        course TEXT,
        year INTEGER,
        status TEXT
    )''')
    students = cur.execute('SELECT * FROM students').fetchall()
    return jsonify([
        {
            'id': s[0],
            'name': s[1],
            'email': s[2],
            'password': s[3],
            'age': s[4],
            'gender': s[5],
            'course': s[6],
            'year': s[7],
            'status': s[8]
        } for s in students
    ])

@app.route('/students', methods=['POST'])
def add_student():
    data = request.json
    cur = get_db().cursor()
    cur.execute('''INSERT INTO students (name, email, password, age, gender, course, year, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)''', (
        data.get('name'),
        data.get('email'),
        data.get('password'),
        data.get('age'),
        data.get('gender'),
        data.get('course'),
        data.get('year'),
        data.get('status')
    ))
    get_db().commit()
    return jsonify({
        'id': cur.lastrowid,
        'name': data.get('name'),
        'email': data.get('email'),
        'password': data.get('password'),
        'age': data.get('age'),
        'gender': data.get('gender'),
        'course': data.get('course'),
        'year': data.get('year'),
        'status': data.get('status')
    }), 201

@app.route('/students/<int:id>', methods=['PUT'])
def update_student(id):
    data = request.json
    cur = get_db().cursor()
    cur.execute('''UPDATE students SET name = ?, email = ?, password = ?, age = ?, gender = ?, course = ?, year = ?, status = ? WHERE id = ?''', (
        data.get('name'),
        data.get('email'),
        data.get('password'),
        data.get('age'),
        data.get('gender'),
        data.get('course'),
        data.get('year'),
        data.get('status'),
        id
    ))
    get_db().commit()
    return jsonify({
        'id': id,
        'name': data.get('name'),
        'email': data.get('email'),
        'password': data.get('password'),
        'age': data.get('age'),
        'gender': data.get('gender'),
        'course': data.get('course'),
        'year': data.get('year'),
        'status': data.get('status')
    })

@app.route('/students/<int:id>', methods=['DELETE'])
def delete_student(id):
    cur = get_db().cursor()
    cur.execute('DELETE FROM students WHERE id = ?', (id,))
    get_db().commit()
    return jsonify({'msg': 'Deleted'})

@app.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    cur = get_db().cursor()
    cur.execute('SELECT * FROM students WHERE email = ? AND password = ?', (email, password))
    user = cur.fetchone()
    if user:
        # Return a mock token and user object for frontend compatibility
        return jsonify({
            'access_token': 'mock-token-123',
            'user': {
                'id': user[0],
                'name': user[1],
                'email': user[2],
                'age': user[4],
                'gender': user[5],
                'course': user[6],
                'year': user[7],
                'status': user[8]
            }
        }), 200
    else:
        return jsonify({'msg': 'Invalid credentials'}), 401


# Always recreate the students table and insert demo user on app start for testing
with sqlite3.connect(DATABASE) as conn:
    cur = conn.cursor()
    cur.execute('DROP TABLE IF EXISTS students')
    cur.execute('''CREATE TABLE students (
        id INTEGER PRIMARY KEY,
        name TEXT,
        email TEXT,
        password TEXT,
        age INTEGER,
        gender TEXT,
        course TEXT,
        year INTEGER,
        status TEXT
    )''')
    cur.execute('''INSERT INTO students (name, email, password, age, gender, course, year, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)''',
        ('Demo User', 'demo@email.com', 'Admin123', 21, 'Male', 'Computer Science', 3, 'active'))
    conn.commit()

if __name__ == '__main__':
    app.run(debug=True)
