import React from 'react';
import PropTypes from 'prop-types';
import THead from './TableHeader';
import TBody from './TableBody';
import TFooter from './TableFooter';
import classnames from 'classnames';

export const SortDirection = {
  up: 'up',
  down: 'down'
}

const Table = ({
  hasCheckbox = false,
  sortBy = {},
  className,
  rows,
  header,
  footer,
  onSort,
  hasIcon,
  onItemSelect,
  ...props
}) => {
  const onAllRowsSelect = (event, selected) => {
    rows.forEach((_oneRow, key) => onItemSelect(event, key, selected));
  }

  return (
    <table {...props} className={classnames('ins-simple-table', className)}>
      {header &&
        <THead
          onSelectAll={onAllRowsSelect}
          hasIcon={hasIcon}
          hasCheckbox={hasCheckbox}
          sortBy={sortBy}
          cols={header}
          onSort={onSort}
        />
      }
      {rows && <TBody hasCheckbox={hasCheckbox} rows={rows} onItemSelect={onItemSelect}/>}
      {footer && <TFooter hasCheckbox={hasCheckbox} hasIcon={hasIcon} children={footer} colspan={header.length}/>}
    </table>
  )
}

Table.propTypes = {
  hasCheckbox: PropTypes.bool,
  hasIcon: PropTypes.bool,
  sortBy: PropTypes.shape({
    index: PropTypes.number,
    direction: PropTypes.oneOf(Object.keys(SortDirection))
  }),
  className: PropTypes.string,
  rows: PropTypes.arrayOf(PropTypes.shape({cells: PropTypes.node})),
  header: PropTypes.arrayOf(PropTypes.node),
  footer: PropTypes.node,
  onSort: PropTypes.func,
  onItemSelect: PropTypes.func
}

export default Table;