const users = {
  temporary: '',
  data: [],
  listeners: [],
  
  add(user){
    this.data.push(user);
    this.listeners.forEach(handler => handler(user));
  },

  listen(handler) {
    this.listeners.push(handler);
  },

  delete(id) {
    this.data = this.data.filter(item => item.id !== id);
  }
};

module.exports = users;
