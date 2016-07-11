var inventory = {
  template: '',
  last_id: 0,
  collection: [],

  outputDate: function() {
    var date = new Date().toUTCString();
    $('#order_date').text(date);
  },

  cacheTemplate: function() {
    this.template = $('#inventory_item').remove().html();
  },

  findID: function($item) {
    return +$item.find("input[type=hidden]").val();
  },

  get: function(id) {
    return this.collection.find(function(item) {
      return item.id === id;
    });
  },

  add: function() {
    this.last_id++;
    var item = {
      id: this.last_id,
      name: "",
      stock_number: "",
      quantity: 1
    };

    this.collection.push(item);
    return item;
  },

  remove: function(id) {
    this.collection = this.collection.filter(function(item) {
      return item.id !== id;
    });
  },

  update: function($item) {
    id = this.findID($item);
    item = this.get(id);
    item.name = $item.find('[name^=item_name]').val();
    item.stock_number = $item.find('[name^=item_stock_number]').val();
    item.quantity = $item.find('[name^=item_quantity]').val();
  },

  newItem: function(e) {
    e.preventDefault();
    var item = this.add();
    var $item = $(this.template.replace(/ID/g, item.id));
    $item.appendTo('#inventory');
  },

  deleteItem: function(e) {
    e.preventDefault();
    $item = this.findParent(e).remove();
    this.remove(this.findID($item));
  },

  updateItem: function(e) {
    $item = this.findParent(e);
    this.update($item);
  },

  bindEvents: function() {
    $('#add_item').on('click', $.proxy(this.newItem, this));
    $('#inventory').on('click', 'a.delete', $.proxy(this.deleteItem, this));
    $('#inventory').on('blur', ':input', $.proxy(this.updateItem, this));
  },

  findParent: function(event) {
    return $(event.currentTarget).closest('tr');
  },

  init: function() {
    this.outputDate();
    this.cacheTemplate();
    this.bindEvents();
  },

};

$(inventory.init.bind(inventory));
