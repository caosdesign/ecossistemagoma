(function() {
  packages = {

    // Lazily construct the package hierarchy from class names.
    root: function(classes) {
      var map = {};

      function find(name, data) {
        var node = map[name], i;
        if (!node) {
          node = map[name] = data || {name: name, children: []};
          if (name.length) {
            node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
            node.parent.children.push(node);
            node.key = name.substring(i + 1);
          }
        }
        return node;
      }

      classes.forEach(function(d) {
        find(d.name, d);
      });

      return map[""];
    },

    // Return a list of area for the given array of nodes.
    area: function(nodes) {
      var map = {},
          area = [];

      // Compute a map from name to node.
      nodes.forEach(function(d) {
        map[d.name] = d;
      });

      // For each import, construct a link from the source to target node.
      nodes.forEach(function(d) {
        if (d.area) d.area.forEach(function(i) {
          area.push({source: map[d.name], target: map[i]});
        });
      });

      return area;
    },

    // Return a list of parceria for the given array of nodes.
    parceria: function(nodes) {
      var map = {},
          parceria = [];

      // Compute a map from name to node.
      nodes.forEach(function(d) {
        map[d.name] = d;
      });

      // For each import, construct a link from the source to target node.
      nodes.forEach(function(d) {
        if (d.parceria) d.parceria.forEach(function(i) {
          parceria.push({source: map[d.name], target: map[i]});
        });
      });

      return parceria;
    },

    junto: function(nodes){
      var map = {},
          area = [],
          parceria = [],
          junto = [];

      // Compute a map from name to node.
      nodes.forEach(function(d) {
        map[d.name] = d;
      });


      // For each import, construct a link from the source to target node.
      nodes.forEach(function(d) {
        if (d.parceria) d.parceria.forEach(function(i) {
          junto.push({source: map[d.name], target: map[i]});
        });
        if (d.area) d.area.forEach(function(i) {
          junto.push({source: map[d.name], target: map[i]});
        });
      });

      return junto;
    }

  };
})();
