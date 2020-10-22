import _ from "lodash";
/**
 * this function is used to paginate the data flow propperly to a given umber of items
 * @param {Array of items} items
 * @param {navigate to a given page number} pageNumber
 * @param {how many items you want to render in a page} pageSize
 */
export function paginate(items, pageNumber, pageSize) {
	//calculate the starting index of the items on pageNumber
	const startIndex = (pageNumber - 1) * pageSize;
	// use lodash to go the startIndex to take all the items for the current page
	// 1. you need to convert to lodash object in order to use it correctly, like this:=> _(items)
	// _(items).value() : reconvert lodash object to a normal js object
	return _(items).slice(startIndex).take(pageSize).value();
	// take(pageSize) only take elements from slice and add them as pageSize limits
}
