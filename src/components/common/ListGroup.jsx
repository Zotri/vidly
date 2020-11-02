import React from "react";

const ListGroup = ({
	items,
	onSelecteItem,
	selectedItemFromGenre,
	textProperty,
	valueProperty
}) => {
	return (
		<div className='list-group'>
			{items.map((item) => (
				<li
					onClick={() => onSelecteItem(item)}
					key={item[valueProperty]}
					className={
						item === selectedItemFromGenre
							? "list-group-item active"
							: "list-group-item"
					}>
					{item[textProperty]}
				</li>
			))}
		</div>
	);
};

ListGroup.defaultProps = {
	textProperty: "name",
	valueProperty: "_id"
};

export default ListGroup;
