(function () {
    "use strict";

    var Item = WinJS.Class.define(function(key, cssClass, group, width, height){
        this.key = key;
        this.cssClass = cssClass;
        this.group = group;
        this.width = width;
        this.height = height;
    });

    // The items contains the following information
    // { id , itemClass , itemWidth , itemHeight, deleteItem } 
    var items = new WinJS.Binding.List();

    function addItem(itemToInsert) {
        var currentKey = items._currentKey;
        var newItem = new Item((currentKey + 1).toString(),
                               itemToInsert.itemClass,
                               itemToInsert.itemGroup,
                               itemToInsert.itemWidth,
                               itemToInsert.itemHeight);
        
        return items.dataSource.insertAtEnd(null, newItem);
    }

    function deleteItem(itemKey) {
        items.dataSource.remove(itemKey);
    }

    function getItemStyles(itemGroup, itemIndex) {
        var itemToReturn = { itemWidth: '', itemHeight: '' };

        // loop through the styles. The most specific has priority
        var starStyledUsed = false;
        items.forEach(function (item, index) {
            if ((item.cssClass.toLowerCase() == ('item' + itemIndex) || item.cssClass === '*')
                && (item.group.toLowerCase() == itemGroup.toLowerCase() || item.group === '*')) {

                var isNotStarStyle = (item.cssClass != '*' || item.group != '*');
                if (!starStyledUsed || starStyledUsed && isNotStarStyle) {
                    itemToReturn.width = item.width + 'px';
                    itemToReturn.height = item.height + 'px';
                }

                starStyledUsed = !isNotStarStyle;
            }
        });

        return itemToReturn;
    }

    WinJS.Namespace.define("ItemStylesRepository", {
        dataSource: items.dataSource,
        addItem: addItem,
        deleteItem: deleteItem,
        getItemStyles: getItemStyles,
    });
})();