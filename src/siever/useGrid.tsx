export function useGrid(upperBound: number) {
  if (isNaN(upperBound)) return { rows: [], rowsClass: "" };
  // upperBound is at most 100
  let rowsClass = "grid-rows-1";
  const nRows = Math.ceil(upperBound / 10);
  if (nRows == 1) rowsClass = "grid-rows-1";
  if (nRows == 2) rowsClass = "grid-rows-2";
  if (nRows == 3) rowsClass = "grid-rows-3";
  if (nRows == 4) rowsClass = "grid-rows-4";
  if (nRows == 5) rowsClass = "grid-rows-5";
  if (nRows == 6) rowsClass = "grid-rows-6";
  if (nRows == 7) rowsClass = "grid-rows-7";
  if (nRows == 8) rowsClass = "grid-rows-8";
  if (nRows == 9) rowsClass = "grid-rows-9";
  if (nRows == 10) rowsClass = "grid-rows-10";

  const rows = new Array<number[]>(nRows).fill([]).map((_, i) => {
    const row: number[] = [];
    const minNum = i * 10 + 1;
    const maxNum = Math.min((i + 1) * 10, upperBound);
    for (let curNum = minNum; curNum <= maxNum; curNum++) row.push(curNum);
    return row;
  });

  return { rows, rowsClass };
}
