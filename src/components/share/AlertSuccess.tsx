import React from 'react';
import PropTypes from 'prop-types';

interface AlertProps {
  errors: any[]
}

const AlertSuccess: React.FC<AlertProps> = props => {
  const errors = props.errors;
  return (
    <div className="col-md-12">
      {
        errors.map(err => (
          <div className="alert alert-danger" role="alert" key={err}>
            {err}
          </div>
        ))
      }
    </div>
  );
}

export default AlertSuccess;