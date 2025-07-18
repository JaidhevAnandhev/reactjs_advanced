from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Student, User
from app import db

bp = Blueprint('student', __name__, url_prefix='/api/students')

@bp.route('/', methods=['GET'])
@jwt_required()
def get_students():
    page = int(request.args.get('page', 1))
    students = Student.query.paginate(page=page, per_page=5)
    result = [{'id': s.id, 'username': s.user.username} for s in students.items]
    return jsonify(result=result, total=students.total, pages=students.pages)

@bp.route('/', methods=['POST'])
@jwt_required()
def create_student():
    data = request.get_json()
    user = User(username=data['username'], password=data['password'], role='student')
    db.session.add(user)
    db.session.commit()
    student = Student(user_id=user.id)
    db.session.add(student)
    db.session.commit()
    return jsonify({'id': student.id, 'username': user.username}), 201

@bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_student(id):
    data = request.get_json()
    student = Student.query.get_or_404(id)
    student.user.username = data.get('username', student.user.username)
    db.session.commit()
    return jsonify({'id': student.id, 'username': student.user.username})

@bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_student(id):
    student = Student.query.get_or_404(id)
    db.session.delete(student)
    db.session.delete(student.user)
    db.session.commit()
    return jsonify({'msg': 'Deleted'}), 204
