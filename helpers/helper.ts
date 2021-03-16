export const noBorder = {border: "none", outline: "none", marginLeft: "10px"};

export class ItemIterator {
    values: Array<Array<any>>;
    current: Array<any>;
    index: number;

    constructor(values: Array<Array<any>>) {
        this.values = values;
        this.current = this.values[0] || [];
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
