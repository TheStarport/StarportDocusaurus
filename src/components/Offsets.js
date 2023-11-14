import React from 'react';
import offsets from '/payloads/crash-offsets.json';

const BuildTable = ({ module }) => (
	<>
		<h3 className="anchor anchorWithStickyNavbar_LWe7">{module[0].moduleName.toLowerCase()}</h3>
		<table>
			<thead>
                <tr>
                    <th>Module Name</th>
                    <th>Offset</th>
                    <th>Author</th>
                    <th>Date Added</th>
                    <th>Description</th>
                </tr>
			</thead>
			<tbody>
				{ module.map(x => (
					<tr key={x.offset}>
						<td>{x.moduleName.toLowerCase()}</td>
						<td>{x.offset.slice(2).replace(/^0+/, '').toLowerCase()}</td>
						<td>{x.author}</td>
						<td>{new Date(x.dateAdded * 1000).toISOString()}</td>
						<td>{x.description}</td>
					</tr>
				))}
			</tbody>
		</table>
	</>
);

export default () => {
	const categories = {};
	for (const offset of offsets) {
		const lower = offset.moduleName.toLowerCase();
		if (!categories.hasOwnProperty(lower)) {
			categories[lower] = [];
		}

		categories[lower].push(offset);
	}

	return (
		<>
			{Object.values(categories).map(x => (
				<BuildTable key={x[0].moduleName.toLowerCase()} module={x} />
			))}
		</>
	);
};
