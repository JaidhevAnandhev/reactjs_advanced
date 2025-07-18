from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app.models import Course
from app import db

bp = Blueprint('timetable', __name__, url_prefix='/api/timetable')

@bp.route('/<int:student_id>', methods=['GET'])
@jwt_required()
def get_timetable(student_id):
    # Example: get all courses for a student
    courses = Course.query.join(Course.students).filter_by(id=student_id).all()
    result = [{'id': c.id, 'name': c.name, 'teacher_id': c.teacher_id} for c in courses]
    return jsonify(result=result)
