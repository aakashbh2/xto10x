
export function sortByList(list: Array<any>, element: string) {
	return list.sort((a,b) => {
		if (a[element] < b[element]) {
			return -1;
		} else if ( a[element] > b[element]) {
			return 1;
		}
		return 0;
	})
}