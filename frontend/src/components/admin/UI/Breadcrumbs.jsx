import React from 'react';
import { useLocation } from 'react-router-dom';

function Breadcrumbs() {
  const location = useLocation();
  const path = location.pathname.replace('/', '').split('/')[1] || location.pathname.replace('/', '').split('/')[0]

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <span className="text-gray-600">Admin</span>
        <span className="capitalize">/ {path}</span>
      </div>
      <span className="capitalize font-bold text-black/90">{path}</span>
    </div>
  );
}

export default Breadcrumbs;
