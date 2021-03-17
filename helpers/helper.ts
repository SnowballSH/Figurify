export const noBorder = {border: "none", outline: "none", marginLeft: "10px"};
export const Akaya = {fontFamily: "Akaya Telivigala, cursive"};
export const Roboto = {fontFamily: "roboto"};
export const Pangolin = {fontFamily: "Pangolin, cursive"};
export const OpenSans = {fontFamily: "Open Sans, sans-serif"};

export class ItemIterator {
    values: Array<Step>;
    current: Step;
    index: number;

    constructor(values: Array<Step>) {
        this.values = values;
        this.current = this.values[0] || {list: [], why: ""};
        this.index = 0;
    }

    validate() {
        this.index = Math.min(Math.max(0, this.index), this.values.length - 1);
    }

    next() {
        this.index++;
        this.validate();
        this.current = this.values[this.index];
        return this;
    }

    back() {
        this.index--;
        this.validate();
        this.current = this.values[this.index];
        return this;
    }

    start() {
        this.index = 0;
        this.validate();
        this.current = this.values[this.index];
        return this;
    }

    end() {
        this.index = this.values.length - 1;
        this.validate();
        this.current = this.values[this.index];
        return this;
    }
}
