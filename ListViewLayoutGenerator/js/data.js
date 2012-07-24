(function () {
    "use strict";

    // Each of these sample groups must have a unique key to be displayed
    // separately.
    var sampleGroups = [
        { key: "group1", title: "Group Title: 1" },
        { key: "group2", title: "Group Title: 2" },
        { key: "group3", title: "Group Title: 3" },
        { key: "group4", title: "Group Title: 4" },
        { key: "group5", title: "Group Title: 5" },
        { key: "group6", title: "Group Title: 6" },
    ];

    // Each of these sample items should have a reference to a particular
    // group.
    var sampleItems = [
        { group: sampleGroups[0], backgroundColor: '#ff6a00', subtitle: '' },
        { group: sampleGroups[0], backgroundColor: '#ff006e', subtitle: '' },
        { group: sampleGroups[0], backgroundColor: '#ffd800', subtitle: '' },
        { group: sampleGroups[0], backgroundColor: '#0094ff', subtitle: '' },
        { group: sampleGroups[0], backgroundColor: '#b200ff', subtitle: '' },

        { group: sampleGroups[1], backgroundColor: '#16db30', subtitle: '' },
        { group: sampleGroups[1], backgroundColor: '#f00', subtitle: '' },
        { group: sampleGroups[1], backgroundColor: '#c21d12', subtitle: '' },
        { group: sampleGroups[1], backgroundColor: '#0026ff', subtitle: '' },

        { group: sampleGroups[2], backgroundColor: '#b2aac2', subtitle: '' },
        { group: sampleGroups[2], backgroundColor: '#4800ff', subtitle: '' },
        { group: sampleGroups[2], backgroundColor: '#12caff', subtitle: '' },
        { group: sampleGroups[2], backgroundColor: '#f4fe0d', subtitle: '' },
        { group: sampleGroups[2], backgroundColor: '#00ff21', subtitle: '' },
        { group: sampleGroups[2], backgroundColor: '#082941', subtitle: '' },
        { group: sampleGroups[2], backgroundColor: '#0094ff', subtitle: '' }
    ];

    // Get a reference for an item, using the group key and item title as a
    // unique reference to the item that can be easily serialized.
    function getItemReference(item) {
        return [item.group.key, item.title];
    }

    function resolveGroupReference(key) {
        for (var i = 0; i < groupedItems.groups.length; i++) {
            if (groupedItems.groups.getAt(i).key === key) {
                return groupedItems.groups.getAt(i);
            }
        }
    }

    function resolveItemReference(reference) {
        for (var i = 0; i < groupedItems.length; i++) {
            var item = groupedItems.getAt(i);
            if (item.group.key === reference[0] && item.title === reference[1]) {
                return item;
            }
        }
    }

    // This function returns a WinJS.Binding.List containing only the items
    // that belong to the provided group.
    function getItemsFromGroup(group) {
        return list.createFiltered(function (item) { return item.group.key === group.key; });
    }

    var list = new WinJS.Binding.List();
    var groupedItems = list.createGrouped(
        function groupKeySelector(item) { return item.group.key; },
        function groupDataSelector(item) { return item.group; }
    );

    // TODO: Replace the data with your real data.
    // You can add data from asynchronous sources whenever it becomes available.
    sampleItems.forEach(function (item) {
        list.push(item);
    });

    WinJS.Namespace.define("Data", {
        items: groupedItems,
        groups: groupedItems.groups,
        getItemsFromGroup: getItemsFromGroup,
        getItemReference: getItemReference,
        resolveGroupReference: resolveGroupReference,
        resolveItemReference: resolveItemReference
    });
})();
