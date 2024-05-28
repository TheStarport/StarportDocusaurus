import React, { useState, useRef, useEffect } from 'react';
import lb from '/payloads/limit-breaking.json';
import DataTable from './DataTable';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import Checkbox from './Checkbox';

let hackyIndex = 0;

const columns = [
  {
    header: "Module Name",
    accessorKey: "moduleName",
    cell: ({ row: { original } }) => original.moduleName.split('\n').map(x => 
      <p key={hackyIndex++} style={{padding: 0}}>{x}</p>
    )
  },
  {
    header: "Offset",
    accessorKey: "offset",
    cell: ({ row: { original } }) => original.offset.split('\n').map(x => 
      <p key={hackyIndex++} style={{padding: 0}}>{x}</p>
    )
  },
  {
    header: "Patch",
    accessorKey: "patch",
    cell: ({ row: { original } }) => original.patch.split('\n').map(x => 
      <p key={hackyIndex++} style={{padding: 0}}>{x}</p>
    )
  },
  {
    header: "Author",
    accessorKey: "author"
  },
  {
    header: "Description",
    accessorKey: "description"
  },
  {
    header: "Date Added",
    accessorKey: "dateAdded",
    cell: ({ row: { original } }) => {
      let ret = <span>
          {
            original.dateAdded 
              ? new Date(original.dateAdded * 1000).toLocaleDateString() 
              : "Date Unknown"
          }
        </span>;

      if ('url' in original) {
        ret = <a href={original.url} target="_blank">{ret}</a>;
      }

      return ret;
    }
  }
];

const allData = [];
const possibleFilters = [];

const restructureData = () => {
  lb.map(obj => {
    // Add category types
    obj.categories = obj.categories.map(category => {
      return category.toLowerCase().split(',').map(x => {
        x = x.trim();
        if (!possibleFilters.includes(x))
        {
          possibleFilters.push(x); 
        }

        return x;
      });
    }).flat(Infinity);

    const newObj = obj.offset.reduce((accumulator, currentValue, index) => {
      if (index) {
        accumulator.moduleName += "\n";
        accumulator.patch += "\n";
        accumulator.offset += "\n";
      }

      if (index < obj.moduleName.length) {
        accumulator.moduleName += obj.moduleName[index];
      }

      if (index < obj.original.length) {
        accumulator.patch += obj.original[index];
      }

      accumulator.offset += currentValue;

      if ('replacement' in obj && index < obj.replacement.length) {
        accumulator.patch += " -> " + obj.replacement[index];
      }

      return accumulator;
    }, {
      ...obj,
      moduleName: "",
      patch: "",
      offset: "",
    });

    allData.push(newObj);
  });
}

export default () => {
  if (allData.length === 0) {
    restructureData();
  }

  const [state, setState] = useState({ table: allData, activeFilters: []});

  const onFilterChange = (filter, el) => {
    let newFilters = [];

    // Adding a filter
    if (el.checked) {
      newFilters = [...state.activeFilters, filter];
    } else {
      newFilters = state.activeFilters.filter(x => x !== filter);
    }

    if (newFilters.length === 0) {
      setState({ activeFilters: newFilters, table: allData });
    }
    else {
      setState({ activeFilters: newFilters, table: allData.filter(x => x.categories.some(r => newFilters.includes(r))) });
    }
  }

  return <div>
    <h2>Filters</h2>
    <div className="row" style={{ margin: 0 }}>
      {possibleFilters.map(filter => (
        <div key={filter} style={{flex: "0 0 25%"}}>
          <Checkbox label={filter} checked={state.activeFilters.includes(filter)} onChange={(el) => onFilterChange(filter, el.target)}/>
        </div>
      ))}
    </div>
    <br/>
    <DataTable columns={columns} data={state.table} />
  </div>;
};
