export const statestext = {
    "pending": "Order placed, awaiting processing.",
    "processing": "Order is being processed.",
    "shipped": "Order has been shipped.",
    "delivered": "Order has been delivered.",
    "cancelled": "Order has been cancelled.",
    "refunded": "Order has been refunded.",
    "failed": "Order failed during processing.",
    "returned": "Order has been returned."
}


export const orderStatus = [
    { key: "", label: "All" },
    { key: "pending", label: "Pending" },

    { key: "shipped", label: "Shipped" },
    { key: "canceled", label: "Canceled" },
    { key: "processing", label: "Processing" },
    { key: "delivered", label: "Delivered" },
    { key: "returned", label: "Returned" },
    { key: "failed", label: "Failed" },
    { key: "refunded", label: "Refunded" },
    { key: "onHold", label: "On Hold" },
    { key: "awaitingPayment", label: "Awaiting Payment" },
    { key: "paymentReceived", label: "Payment Received" },
    { key: "paymentFailed", label: "Payment Failed" },


    { key: "outForDelivery", label: "Out for Delivery" },

    { key: "orderAccepted", label: "Order Accepted" },
    { key: "orderDeclined", label: "Order Declined" }

];