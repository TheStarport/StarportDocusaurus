import React from 'react';
import lb from '/payloads/limit-breaking.json';
import DataTable from './DataTable';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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
      if ('dateAdded' in original) {
        return <span>{new Date(original.dateAdded * 1000).toISOString()}</span>
      }
      return <span>Date Unknown</span>
    }
  }
];

export default () => {
  const allTables = [];
  const labels = [{
    label: "All",
    value: 'all'
  }];

  const categories = {};

  const data = [];
  lb.map(obj => {
    // Add category types
    obj.categories.map(category => {
      if (!(category in categories)) {
        categories[category] = [];
      };
    });

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

    data.push(newObj);
  });

  const tabs = Object.keys(categories).map(key => {
    const objs = data.filter(x => x.categories.includes(key));

    var table = <>
        <h2>{key}</h2>
        <DataTable columns={columns} data={objs} />
      </>;
    allTables.push(table);

    labels.push({ label: key, value: key });

    return <TabItem key={key} value={key}>{table}</TabItem>;
  });

  const all = <TabItem key="all" value="all">{allTables}
  </TabItem>;

  return <Tabs className="flex-wrap" defaultValue="all" values={labels}>{tabs.concat(all)}</Tabs>
};
