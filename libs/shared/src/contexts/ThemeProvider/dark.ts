// Default
const mantineDefault = [
	"hsl(0, 0%, 79%)",
	"hsl(0, 0%, 72%)",
	"hsl(0, 0%, 51%)",
	"hsl(0, 0%, 41%)",
	"hsl(0, 0%, 26%)",
	"hsl(0, 0%, 23%)",
	"hsl(0, 0%, 18%)",
	"hsl(0, 0%, 14%)",
	"hsl(0, 0%, 12%)",
	"hsl(0, 0%, 8%)",
];

const generateDarkColors = (h: number, s: number, l: number) => {
	return [
		`hsl(${h}, ${s}%, ${l + 76}%)`,
		`hsl(${h}, ${s}%, ${l + 58}%)`,
		`hsl(${h}, ${s}%, ${l + 37}%)`,
		`hsl(${h}, ${s}%, ${l + 27}%)`,
		`hsl(${h}, ${s}%, ${l + 15}%)`,
		`hsl(${h}, ${s}%, ${l + 9}%)`,
		`hsl(${h}, ${s}%, ${l + 4}%)`,
		`hsl(${h}, ${s}%, ${l}%)`,
		`hsl(${h}, ${s}%, ${l - 2}%)`,
		`hsl(${h}, ${s}%, ${l - 6}%)`,
	] as const;
};

const kentFull = [
	"hsl(0, 0%, 97%)",
	"hsl(218, 19%, 92%)",
	"hsl(214, 11%, 88%)",
	"hsl(212, 6%, 54%)",
	"hsl(227, 8%, 35%)",
	"hsl(233, 5%, 31%)",
	"hsl(229, 12%, 26%)",
	"hsl(233, 13%, 14%)",
	"hsl(233, 13%, 10%)",
	"hsl(229, 11%, 20%)",
] as const;

const darkPresets = {
	mantineDefault,
	mantineDefaultAdjusted: generateDarkColors(0, 0, 9),
	apple1: generateDarkColors(240, 4, 9),
	kent: generateDarkColors(233, 13, 12),
	kentFull,

	// testing
	materialSurface: generateDarkColors(264, 8, 12),
	muiBg: generateDarkColors(204, 14, 7),
	apple2: generateDarkColors(240, 4, 14),
	josh: generateDarkColors(210, 5, 6),
};

export { darkPresets };
