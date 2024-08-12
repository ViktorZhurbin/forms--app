const objectKeys = <Obj extends {}>(obj: Obj) => {
	return Object.keys(obj) as (keyof Obj)[];
};

const objectEntries = <Obj extends {}>(obj: Obj) => {
	type Keys = keyof Obj;

	return Object.entries(obj) as [Keys, Obj[Keys]][];
};

export { objectKeys, objectEntries };
