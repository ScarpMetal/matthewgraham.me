// const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default class DateDisplay extends Date implements DateDisplayInterface {
  constructor(
    public month: 'Jan' | 'Feb' | 'Mar' | 'Apr' | 'May' | 'Jun' | 'Jul' | 'Aug' | 'Sep' | 'Oct' | 'Nov' | 'Dec',
    public year: `20${number}${number}`,
  ) {
    super(`1 ${month} ${year}`);
  }

  toString() {
    return `${this.month} ${this.year}`;
  }
}
