(function () {
    "use strict";

    // The items contains the following information
    // { id , itemClass , itemWidth , itemHeight, deleteItem } 
    var items = new WinJS.Binding.List();

    function addItem(itemToInsert) {
        var currentKey = items._currentKey;
        var newItem = {
            itemClass: itemToInsert.itemClass,
            itemGroup: itemToInsert.itemGroup,
            itemWidth: itemToInsert.itemWidth,
            itemHeight: itemToInsert.itemHeight,
            deleteItem: function () {
                deleteItem((currentKey + 1).toString());
            }
        }

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
            if ((item.itemClass.toLowerCase() == ('item' + itemIndex) || item.itemClass === '*')
                && (item.itemGroup.toLowerCase() == itemGroup.toLowerCase() || item.itemGroup === '*')) {

                var isNotStarStyle = (item.itemClass != '*' || item.itemGroup != '*');
                if (!starStyledUsed || starStyledUsed && isNotStarStyle) {
                    itemToReturn.width = item.itemWidth + 'px';
                    itemToReturn.height = item.itemHeight + 'px';
                }

                starStyledUsed = !isNotStarStyle;
            }
        });

        return itemToReturn;
    }

    // add a sample item just to demonstrate how to do it
    addItem({ itemClass: 'Item0', itemGroup: '*', itemWidth: 250, itemHeight: 250 });

    WinJS.Namespace.define("ItemStylesRepository", {
        dataSource: items.dataSource,
        addItem: addItem,
        getItemStyles: getItemStyles,
    });
})();