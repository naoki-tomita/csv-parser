import { parse } from "../index";

describe("CSV", () => {
  describe("#parse", () => {
    it("テキストをCSVに変換できる", () => {
      const csv = `
        head1, head2, head3
        data11, data21, data31
        data21, data22, data32
      `;
      const expected = [
        {head1: "data11", head2: "data21", head3: "data31"},
        {head1: "data21", head2: "data22", head3: "data32"},
      ]
      expect(parse(csv)).toEqual(expected);
    });

    it("ダブルクオートは無視されて変換される。スペースもトリムされない", () => {
      const csv = `
        "head1", head2, " head3"
        data11," data21", data31
        data21, data22, "data32"
      `;
      const expected = [
        {head1: "data11", head2: " data21", " head3": "data31"},
        {head1: "data21", head2: "data22", " head3": "data32"},
      ]
      expect(parse(csv)).toEqual(expected);
    });

    it("数値は数値になるが、ダブルクオートがある場合は文字となる", () => {
      const csv = `
        head1, head2, head3
        1.1, 100, 12345
        "1.1", "100", "12345"
      `;
      const expected = [
        {head1: 1.1, head2: 100, head3: 12345},
        {head1: "1.1", head2: "100", head3: "12345"},
      ]
      expect(parse(csv)).toEqual(expected);
    });

    it("nullはnullになるが、ダブルクオートがある場合は文字となる", () => {
      const csv = `
        head1
        null
        "null"
      `;
      const expected = [
        {head1: null},
        {head1: "null"},
      ]
      expect(parse(csv)).toEqual(expected);
    });
  });
});
