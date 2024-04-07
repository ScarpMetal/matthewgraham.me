const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

Date.prototype.toLocaleTimeString = function () {
  return `${months[this.getMonth()]} ${this.getFullYear()}`;
};
