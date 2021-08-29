export interface Key {
	color: string;
	name?: string;
	tag: string;
};

export interface Keys {
	[key: string]: Key;
};

export interface Keyset {
	borrows?: string[],
	context?: string;
	colorTransparency?: number;
	description?: string;
	keys: Keys;
};

export interface KeysetList {
	[keyset: string]: Keyset;
};

export interface KeysetMap {
	keysets: KeysetList;
	user: string;
};
