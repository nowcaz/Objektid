$(document).ready(function() {
    let itemList = [];
    let editingIndex = -1;

    $("#addItemForm").submit(function(event) {
        event.preventDefault();
        let itemName = $("#itemName").val();
        let itemPrice = parseFloat($("#itemPrice").val());
        let itemQuantity = parseInt($("#itemQuantity").val());
        let newItem = { name: itemName, price: itemPrice, quantity: itemQuantity };
        itemList.push(newItem);
        updateItemList();
        $("#addItemForm")[0].reset();
    });

    $("#deleteSelected").click(function() {
        let selectedItems = $("input[type='checkbox']:checked");
        selectedItems.each(function() {
            let index = $(this).data("index");
            itemList.splice(index, 1);
        });
        updateItemList();
    });

    $("#searchInput").keyup(function() {
        let searchTerm = $("#searchInput").val().toLowerCase();
        let searchType = $("input[name='searchType']:checked").val();
        let filteredItems = itemList.filter(function(item) {
            if (searchType === "name") {
                return item.name.toLowerCase().includes(searchTerm);
            } else if (searchType === "price") {
                return item.price.toString().includes(searchTerm);
            }
        });
        updateItemList(filteredItems);
    });

    $(".edit-item").click(function() {
        editingIndex = $(this).data("index");
        let item = itemList[editingIndex];
        $("#editItemIndex").val(editingIndex);
        $("#editItemName").val(item.name);
        $("#editItemPrice").val(item.price);
        $("#editItemQuantity").val(item.quantity);
        $("#editItemForm").show();
    });

    $("#editItemFormInner").submit(function(event) {
        event.preventDefault();
        let editedName = $("#editItemName").val();
        let editedPrice = parseFloat($("#editItemPrice").val());
        let editedQuantity = parseInt($("#editItemQuantity").val());
        itemList[editingIndex] = { name: editedName, price: editedPrice, quantity: editedQuantity };
        updateItemList();
        $("#editItemForm").hide();
    });

    function updateItemList(items = itemList) {
        $("#itemList").empty();
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let listItem = `<li class="list-group-item">
                                <button class="btn btn-primary btn-sm edit-item" data-index="${i}">Muuda</button>
                                Nimi: <span class="item-name">${item.name}</span>,
                                Hind: <span class="item-price">${item.price}</span>,
                                Kogus: <span class="item-quantity">${item.quantity}</span>
                            </li>`;
            $("#itemList").append(listItem);
        }
    }

    updateItemList();
});
