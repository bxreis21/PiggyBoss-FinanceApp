import React from 'react';
import { common_theme } from '../styles/theme.js';

type Props = {
  title: string;
  left: number;
  right: number;
};

function formatNumber(n: number) {
  return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function TitleFraction({ title, left, right }: Props) {
  const safeLeft = Number(left);
  const safeRight = Number(right);
  const leftStr = Number.isFinite(safeLeft) ? formatNumber(safeLeft) : '-';
  const rightStr = Number.isFinite(safeRight) ? formatNumber(safeRight) : '-';
  const isOk = Number.isFinite(safeLeft) && Number.isFinite(safeRight) ? safeLeft < safeRight : true;

  return (
    <div className="w-full flex items-center justify-between">
      <h4 className="m-0">{title}</h4>
      <h4 className="m-0" style={{ color: isOk ? common_theme.good_green : common_theme.bad_red }}>
        {leftStr} / {rightStr}
      </h4>
    </div>
  );
}
