import React from 'react';
import '../Styling/EntityDetailModal.css';
import Button from './Button';
import { Link } from 'react-router-dom';

const EntityDetailModal = ({
  entity,
  onClose,
  onDelete,
  editLinkBase = '',
  fields = [],
  titleField = '',
  editIcon,
  deleteIcon
}) => {
  if (!entity) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{entity[titleField] || 'Details'}</h2>

        <div className="modal-info">
          {fields.map(({ key, label, format }, i) => (
            <p key={i}>
              <strong>{label}:</strong>{' '}
              {format ? format(entity[key]) : entity[key] ?? '—'}
            </p>
          ))}
        </div>

        <div className="modal-actions">
          {editLinkBase && (
            <Link to={`${editLinkBase}/${entity.id}`}>
              <Button label="Edit" svgLogo={editIcon} className="edit-button" />
            </Link>
          )}
          <Button label="Delete" svgLogo={deleteIcon} onClick={() => onDelete(entity.id)} className="delete-button" />
          <Button label="Close" onClick={onClose} className="custom-button" />
        </div>
      </div>
    </div>
  );
};

export default EntityDetailModal;
