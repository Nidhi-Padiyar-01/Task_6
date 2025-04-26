let totalAmount = 0;

function addItem() {
    let itemName = document.getElementById("itemName").value;
    let quantity = parseInt(document.getElementById("quantity").value);
    let price = parseInt(document.getElementById("price").value);
    
    if (itemName === "" || isNaN(quantity) || isNaN(price)) {
        alert("Please enter valid item details.");
        return;
    }

    let total = quantity * price;
    totalAmount += total;

    let table = document.getElementById("billTable");
    let row = table.insertRow();
    row.innerHTML = `<td>${itemName}</td>
                     <td>${quantity}</td>
                     <td>${price}</td>
                     <td>${total}</td>
                     <td><button onclick="removeItem(this, ${total})">Remove</button></td>`;

    document.getElementById("totalAmount").innerText = totalAmount;

    document.getElementById("itemName").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
}

function removeItem(button, itemTotal) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    totalAmount -= itemTotal;
    document.getElementById("totalAmount").innerText = totalAmount;
}

function downloadBill() {
    let customerName = document.getElementById("customerName").value;
    if (customerName.trim() === "") {
        alert("Please enter customer name.");
        return;
    }

    let billText = `Customer: ${customerName}\n----------------------------\n`;
    let rows = document.querySelectorAll("#billTable tr");

    rows.forEach(row => {
        let cols = row.querySelectorAll("td");
        billText += `${cols[0].innerText} x ${cols[1].innerText} @ ${cols[2].innerText} = ₹${cols[3].innerText}\n`;
    });

    billText += "----------------------------\n";
    billText += `Total Amount: ₹${totalAmount}\n`;

    let blob = new Blob([billText], { type: "text/plain" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Bill.txt";
    link.click();
}