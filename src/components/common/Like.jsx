import React from "react";

const Like = ({ liked, onClick }) => {
	const handleLike = (x) => {
		if (!x) return "fa fa-heart-o";
		else return "fa fa-heart";
	};

	return (
		<i
			onClick={onClick}
			style={{ cursor: "pointer" }}
			className={handleLike(liked)}
			aria-hidden='true'
		/>
	);
};

export default Like;
