from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Notification
from app import db
from datetime import datetime

bp = Blueprint('notification', __name__, url_prefix='/api/notifications')

@bp.route('/', methods=['POST'])
@jwt_required()
def create_notification():
    data = request.get_json()
    user_id = get_jwt_identity()['id']
    notification = Notification(message=data['message'], user_id=user_id, created_at=datetime.utcnow())
    db.session.add(notification)
    db.session.commit()
    return jsonify({'msg': 'Notification created'}), 201

@bp.route('/<int:user_id>', methods=['GET'])
@jwt_required()
def get_notifications(user_id):
    notifications = Notification.query.filter_by(user_id=user_id).order_by(Notification.created_at.desc()).all()
    result = [{'id': n.id, 'message': n.message, 'created_at': n.created_at} for n in notifications]
    return jsonify(result=result)
